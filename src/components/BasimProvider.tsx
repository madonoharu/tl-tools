"use client";
import { Basim } from "basim";

import { BasimContext } from "@/hooks/useBasim";
import students from "@/data/students.json";
import equipments from "@/data/equipments.json";

interface BasimProviderProps {
  children?: React.ReactNode;
}

export default function BasimProvider({ children }: BasimProviderProps) {
  const basim = new Basim({ students, equipments });

  return (
    <BasimContext.Provider value={basim}>{children}</BasimContext.Provider>
  );
}
