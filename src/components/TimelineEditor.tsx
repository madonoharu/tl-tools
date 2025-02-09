"use client";
import { useAtom, PrimitiveAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { nanoid } from "nanoid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { TimelineItem, timelineStateAtom, compStateAtom } from "@/store";
import { COMP_KEYS, CompKey, frameCountToTime } from "@/utils";
import { Comp } from "@/simulator";

import Select from "./Select";
import { useState } from "react";

const itemsAtom = focusAtom(timelineStateAtom, (optic) => optic.prop("items"));
const itemAtomsAtom = splitAtom(itemsAtom, (state) => state.id);

const LIMIT = 30 * 60 * 4;

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

function TimelineEditorItem({ itemAtom }: TimelineEditorItemProps) {
  const [state, setState] = useAtom(itemAtom);
  const [compState, _setCompState] = useAtom(compStateAtom);

  const [compKey, setCompKey] = useState<CompKey>("st1");
  const [skillKey, setSkillKey] = useState("Ex");

  const comp = new Comp(compState);

  const effects = comp[compKey]?.raw.Skills[skillKey as "Normal"];

  const handleIncr = () => {
    setState({
      ...state,
      frameCount: state.frameCount + 1,
    });
  };

  const handleDecr = () => {
    setState({
      ...state,
      frameCount: state.frameCount - 1,
    });
  };

  return (
    <div>
      <Box order={state.frameCount} display="flex" alignItems="center">
        <Button onClick={handleDecr} size="small">
          <ArrowLeftIcon />
        </Button>
        <div>{frameCountToTime(LIMIT, state.frameCount)}</div>
        <Button onClick={handleIncr} size="small">
          <ArrowRightIcon />
        </Button>
      </Box>

      <div>
        <Select<CompKey>
          options={COMP_KEYS}
          value={compKey}
          onChange={setCompKey}
          getOptionLabel={(key) => comp[key]?.raw.Name ?? ""}
        />
        <Select options={SKILL_KEYS} value={skillKey} onChange={setSkillKey} />
      </div>

      <div>{JSON.stringify(effects)}</div>
    </div>
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
      <Box display="flex" flexDirection="column">
        {itemAtoms.map((itemAtom) => (
          <TimelineEditorItem key={itemAtom.toString()} itemAtom={itemAtom} />
        ))}
      </Box>

      <Button onClick={handleInsert}>TLを追加</Button>
    </div>
  );
}
