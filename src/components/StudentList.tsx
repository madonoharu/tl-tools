"use client";
import { useMemo } from "react";
import { atom, useAtom } from "jotai";
import Image from "next/image";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { MasterStudent } from "basim";

import SchoolIcon from "@/components/SchoolIcon";
import studentsJson from "@/data/students.json";

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
      return (s: MasterStudent) => s.squad_type === "Main";
    } else if (mode === "sp") {
      return (s: MasterStudent) => s.squad_type === "Support";
    } else {
      return (_: MasterStudent) => true;
    }
  }, [mode]);

  const filterFn = useMemo(() => {
    if (schoolCategory === "Misc") {
      return (s: MasterStudent) =>
        !(MAIN_SCHOOLS as readonly string[]).includes(s.school);
    } else {
      return (s: MasterStudent) => schoolCategory === s.school;
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
          .map(({ id, name }) => {
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
