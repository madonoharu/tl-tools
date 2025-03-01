"use client";
import { useAtom } from "jotai";
import Image from "next/image";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { CompKey } from "@/utils";
import { compStateAtom } from "@/store";
import { useModal } from "@/hooks/useModal";

import StudentList from "./StudentList";
import StudentEditor from "./StudentEditor";
import { CloseButton, EditButton } from "./IconButtons";

interface StudentAreaProps {
  compKey: CompKey;
}

export default function StudentArea({ compKey }: StudentAreaProps) {
  const [compState, setCompState] = useAtom(compStateAtom);
  const color = compKey.startsWith("st") ? "primary" : "secondary";
  const Modal = useModal();
  const StudentEditorModal = useModal();

  const state = compState[compKey];

  const handleRemove = () => {
    setCompState({ ...compState, [compKey]: undefined });
  };

  const handleStudentSelect = (v: number) => {
    Modal.hide();
    setCompState({ ...compState, [compKey]: { id: v } });
  };

  return (
    <Paper
      sx={(theme) => ({
        backgroundColor: theme.palette[color].light,
        height: 120,
        width: 108,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      {state ? (
        <Box position="relative" height={113}>
          <Image
            priority={true}
            width={100}
            height={113}
            alt={`${state.id}`}
            src={`/images/collection/${state.id}.webp`}
          />
          <Box position="absolute" display="flex" top={-2} right={-2}>
            <EditButton onClick={StudentEditorModal.show} />
            <CloseButton onClick={handleRemove} />
          </Box>
        </Box>
      ) : (
        <Button onClick={Modal.show} sx={{ height: 120 }} fullWidth>
          +
        </Button>
      )}
      <Modal full>
        <StudentList
          onSelect={handleStudentSelect}
          mode={compKey.slice(0, 2)}
        />
      </Modal>
      <StudentEditorModal full>
        <StudentEditor />
      </StudentEditorModal>
    </Paper>
  );
}
