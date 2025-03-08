import { useAtom } from "jotai";
import { useImmerAtom } from "jotai-immer";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { EquipmentState, StudentState } from "basim";

import { collectionAtomsAtom } from "@/store";
import { range } from "@/utils";
import { useBasim } from "@/hooks/useBasim";

import NumberInput from "./NumberInput";
import EquipmentSelect from "./EquipmentSelect";
import StarsSelect from "./StarsSelect";

interface StudentEditorProps {
  id: number;
}

export default function StudentEditor({ id }: StudentEditorProps) {
  const basim = useBasim();
  const [collectionAtoms, _dispatch] = useAtom(collectionAtomsAtom);
  const collectionAtom = collectionAtoms[0];
  const [collection, setCollection] = useImmerAtom(collectionAtom);

  const state = collection.students[id] || { id };
  const student = basim.create_student2(state);

  if (!student) {
    return null;
  }

  const setState = (next: StudentState) => {
    setCollection((draft) => {
      draft.students[id] = next;
    });
  };

  return (
    <Box m={1}>
      <div>
        <Image
          priority={true}
          width={100}
          height={113}
          alt={`${student.name()}`}
          src={`/images/collection/${id}.webp`}
        />
      </div>

      <Stack gap={1}>
        <Box display="flex" gap={1}>
          <NumberInput
            sx={{ width: 80 }}
            label="Lv"
            min={1}
            max={90}
            value={student.level()}
            onChange={(v) => setState({ ...state, level: v })}
          />
          <StarsSelect
            stars={student.stars()}
            weaponStars={student.weapon_stars()}
            onChange={(stars, weapon_stars) => {
              setState({
                ...state,
                stars,
                weapon_stars,
              });
            }}
          />

          <NumberInput
            sx={{ width: 80 }}
            label="愛用品"
            min={0}
            max={2}
            value={student.gear_level()}
            onChange={(gear_level) => setState({ ...state, gear_level })}
          />
        </Box>

        <Box display="flex" gap={1}>
          {range(3).map((index) => {
            const key = `equipment${index}` as const;
            const id = student.get_equipment_id(index);
            const category = student.get_equipment_category(index);

            return (
              <EquipmentSelect
                key={key}
                category={category}
                id={id}
                onChange={(e) => {
                  const next: EquipmentState = { id: e?.id || 0 };
                  setState({
                    ...state,
                    [key]: next,
                  });
                }}
              />
            );
          })}
        </Box>
      </Stack>
    </Box>
  );
}
