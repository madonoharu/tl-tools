import { atom, useAtom } from "jotai";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { Student, StudentState } from "@/simulator";

import NumberInput from "./NumberInput";
import EquipmentSelect from "./EquipmentSelect";

const studentStateAtom = atom<StudentState>({
  id: 10000,
});

export default function StudentEditor() {
  const [studentState, setStudentState] = useAtom(studentStateAtom);

  const student = new Student(studentState);

  return (
    <div>
      <div>
        <Image
          priority={true}
          width={100}
          height={113}
          alt={`${student.raw.Name}`}
          src={`/images/collection/${student.id}.webp`}
        />
      </div>

      <Stack gap={1}>
        <Box display="flex" gap={1}>
          <NumberInput
            label="Lv"
            min={1}
            max={90}
            value={student.level}
            onChange={(v) => setStudentState({ ...studentState, level: v })}
          />
          <NumberInput
            label="Stars"
            min={1}
            max={5}
            value={student.stars}
            onChange={(v) => setStudentState({ ...studentState, stars: v })}
          />
          <NumberInput
            label="WeaponStars"
            min={1}
            max={5}
            value={student.weaponStars}
            onChange={(v) =>
              setStudentState({ ...studentState, weaponStars: v })
            }
          />
        </Box>

        <Box display="flex" gap={1}>
          {student.raw.Equipment.map((category, i) => {
            const key = `equipment${(i + 1) as 1 | 2 | 3}` as const;
            const id = student[key]?.id;

            return (
              <EquipmentSelect
                key={key}
                category={category}
                id={id}
                onChange={(e) => {
                  setStudentState({
                    ...studentState,
                    [key]: { id: e?.id || 0 },
                  });
                }}
              />
            );
          })}
        </Box>
        <StatLabel label="最大HP" value={student.maxHp()} />
        <StatLabel label="攻撃力" value={student.attackPower()} />
        <StatLabel label="防御力" value={student.defensePower()} />
        <StatLabel label="治癒力" value={student.healPower()} />
      </Stack>
    </div>
  );
}

function StatLabel({ label, value }: { label: string; value: number }) {
  return (
    <Box display="flex" gap={1}>
      <span>{label}</span>
      <span>{value}</span>
    </Box>
  );
}
