"use client";
import { useAtom, PrimitiveAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { nanoid } from "nanoid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { TimelineItem, timelineStateAtom } from "@/store";
import { frameCountToTime } from "@/utils";

const itemsAtom = focusAtom(timelineStateAtom, (optic) => optic.prop("items"));
const itemAtomsAtom = splitAtom(itemsAtom, (state) => state.id);

const LIMIT = 30 * 60 * 4;

interface TimelineEditorItemProps {
  itemAtom: PrimitiveAtom<TimelineItem>;
}

function TimelineEditorItem({ itemAtom }: TimelineEditorItemProps) {
  const [state, setState] = useAtom(itemAtom);

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
    <Box order={state.frameCount}>
      <Button onClick={handleDecr}>sub</Button>
      <span>{frameCountToTime(LIMIT, state.frameCount)}</span>
      <Button onClick={handleIncr}>add</Button>
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
      <Box display="flex" flexDirection="column">
        {itemAtoms.map((itemAtom) => (
          <TimelineEditorItem key={itemAtom.toString()} itemAtom={itemAtom} />
        ))}
      </Box>

      <Button onClick={handleInsert}>TLを追加</Button>
    </div>
  );
}
