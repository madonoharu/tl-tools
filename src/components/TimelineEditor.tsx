"use client";
import { useState } from "react";
import { useAtom, PrimitiveAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { nanoid } from "nanoid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TimelineItem, timelineStateAtom, compStateAtom } from "@/store";
import { CompKey } from "@/utils";
import { Comp } from "@/simulator";

import Select from "./Select";
import TimeInput from "./TimeInput";

const itemsAtom = focusAtom(timelineStateAtom, (optic) => optic.prop("items"));
const itemAtomsAtom = splitAtom(itemsAtom, (state) => state.id);

const SKILL_KEYS = [
  "Normal",
  "Ex",
  "Public",
  "GearPublic",
  "Passive",
  "WeaponPassive",
] as const;

interface TimelineEditorItemProps {
  itemAtom: PrimitiveAtom<TimelineItem>;
}

type TimelineMode = undefined | CompKey;

const LIMIT = 30 * 60 * 4;

function TimelineEditorItem({ itemAtom }: TimelineEditorItemProps) {
  const [state, setState] = useAtom(itemAtom);
  const [compState, _setCompState] = useAtom(compStateAtom);

  const [mode, setMode] = useState<TimelineMode>();
  const [skillKey, setSkillKey] = useState("Ex");

  const comp = new Comp(compState);
  const options: TimelineMode[] = [undefined, ...comp.keys()];

  return (
    <Box display="flex" gap={1}>
      <TimeInput
        limit={LIMIT}
        value={state.frameCount}
        onChange={(frameCount) =>
          setState({
            ...state,
            frameCount,
          })
        }
      />

      <Select<TimelineMode>
        sx={{ minWidth: 160 }}
        options={options}
        value={mode}
        onChange={setMode}
        getOptionLabel={(mode) => (mode ? comp[mode]?.raw.Name : "-")}
      />

      {mode && (
        <Select options={SKILL_KEYS} value={skillKey} onChange={setSkillKey} />
      )}
    </Box>
  );
}

export default function TimelineEditor() {
  const [itemAtoms, dispatch] = useAtom(itemAtomsAtom);

  const handleInsert = () => {
    dispatch({
      type: "insert",
      value: { id: nanoid(), frameCount: 60 + itemAtoms.length },
    });
  };

  return (
    <div>
      <Stack gap={1}>
        {itemAtoms.map((itemAtom) => (
          <TimelineEditorItem key={itemAtom.toString()} itemAtom={itemAtom} />
        ))}
      </Stack>

      <Button onClick={handleInsert}>TLを追加</Button>
    </div>
  );
}
