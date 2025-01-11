"use client";
import { useMemo } from "react";
import { atom, useAtom } from "jotai";
import Image from "next/image";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import SchoolIcon from "@/components/SchoolIcon";
import studentsJson, { Student } from "@/data/students.json";
import { Student as S } from "@/simulator";

const MAIN_SCHOOLS = [
  "Abydos",
  "Arius",
  "Gehenna",
  "Hyakkiyako",
  "Millennium",
  "RedWinter",
  "Shanhaijing",
  "SRT",
  "Trinity",
  "Valkyrie",
] as const;

const SCHOOL_CATEGORIES = [...MAIN_SCHOOLS, "Misc"] as const;

const students = Object.values(studentsJson);

const schoolCategoryAtom = atom("Gehenna");

interface StudentListProps {
  mode?: string;
  onSelect?: (id: number) => void;
}

export default function StudentList({ mode, onSelect }: StudentListProps) {
  const [schoolCategory, setSchoolCategory] = useAtom(schoolCategoryAtom);

  const modeFilterFn = useMemo(() => {
    if (mode === "st") {
      return (s: Student) => s.SquadType === "Main";
    } else if (mode === "sp") {
      return (s: Student) => s.SquadType === "Support";
    } else {
      return (_: Student) => true;
    }
  }, [mode]);

  const filterFn = useMemo(() => {
    if (schoolCategory === "Misc") {
      return (s: Student) =>
        !(MAIN_SCHOOLS as readonly string[]).includes(s.School);
    } else {
      return (s: Student) => schoolCategory === s.School;
    }
  }, [schoolCategory]);

  return (
    <div>
      <div>
        {SCHOOL_CATEGORIES.map((v) => {
          const selected = schoolCategory === v;
          return (
            <Button
              key={v}
              variant="contained"
              color="primary"
              disabled={selected}
              onClick={() => {
                setSchoolCategory(v);
              }}
            >
              <SchoolIcon school={v} />
            </Button>
          );
        })}
      </div>

      <Paper
        sx={{
          p: 1,
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {students
          .filter(modeFilterFn)
          .filter(filterFn)
          .map((student) => {
            const id = student.Id;
            const name = student.Name;

            new S({ id }).attackPower();

            return (
              <Button
                key={id}
                variant="outlined"
                onClick={() => {
                  onSelect?.(id);
                }}
              >
                <Image
                  priority={true}
                  width={100}
                  height={113}
                  alt={`${name}`}
                  src={`/images/collection/${id}.webp`}
                />
              </Button>
            );
          })}
      </Paper>
    </div>
  );
}
