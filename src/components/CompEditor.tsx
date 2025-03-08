"use client";
import { useAtom } from "jotai";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { COMP_KEYS, CompKey, range } from "@/utils";
import { compEditorStateAtom } from "@/store";
import { useBasim } from "@/hooks/useBasim";

import StudentArea from "./StudentArea";
import Checkbox from "./Checkbox";
import { useCollection } from "@/hooks";
import StudentDetails from "./StudentDetails";

export default function CompEditor() {
  const basim = useBasim();
  const [compEditorState, _setCompEditorState] = useAtom(compEditorStateAtom);
  const [collection, _setCollection] = useCollection();

  const getStudentState = (key: CompKey) => {
    const id = compEditorState[key];
    if (!id) {
      return undefined;
    }

    return collection.students[id] || { id };
  };

  const comp = basim.create_comp({
    st1: getStudentState("st1"),
    st2: getStudentState("st2"),
    st3: getStudentState("st3"),
    st4: getStudentState("st4"),
    sp1: getStudentState("sp1"),
    sp2: getStudentState("sp2"),
    buffs: compEditorState.buffs,
  });

  const info = comp.get_skill_info();

  return (
    <div>
      <Paper sx={{ display: "flex", gap: 1, m: 1 }}>
        {COMP_KEYS.map((key) => (
          <StudentArea key={key} compKey={key} />
        ))}
        <Stack>
          {info
            .filter((skill) => skill.buffs.length > 0)
            .map((skill) => {
              const key = `${skill.name} ${skill.skill_type}`;
              return <Checkbox key={key} label={key} />;
            })}
        </Stack>
      </Paper>

      {range(comp.students_len()).map((i) => {
        const student = comp.get_student(i);
        return (
          <Paper key={`${student.id()}-${i}`} sx={{ m: 1 }}>
            {student.name()}
            <StudentDetails student={student} />
          </Paper>
        );
      })}
    </div>
  );
}
