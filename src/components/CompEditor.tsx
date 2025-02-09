"use client";
import { useAtom } from "jotai";
import Paper from "@mui/material/Paper";

import { COMP_KEYS } from "@/utils";
import { compStateAtom } from "@/store";
import { Comp } from "@/simulator";

import StudentArea from "./StudentArea";

export default function CompEditor() {
  const [compState, _setCompState] = useAtom(compStateAtom);

  const _comp = new Comp(compState);

  return (
    <div>
      <Paper sx={{ display: "flex", gap: 1, m: 1 }}>
        {COMP_KEYS.map((key) => (
          <StudentArea key={key} compKey={key} />
        ))}
      </Paper>
    </div>
  );
}
