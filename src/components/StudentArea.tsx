"use client";
import { useAtom } from "jotai";
import Image from "next/image";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { CompKey } from "@/utils";
import { compEditorStateAtom } from "@/store";
import { useModal } from "@/hooks/useModal";

import StudentList from "./StudentList";
import StudentEditor from "./StudentEditor";
import { CloseButton, EditButton } from "./IconButtons";

interface StudentAreaProps {
  compKey: CompKey;
}

export default function StudentArea({ compKey }: StudentAreaProps) {
  const [compEditorState, setCompEditorState] = useAtom(compEditorStateAtom);
  const color = compKey.startsWith("st") ? "primary" : "secondary";
  const Modal = useModal();
  const StudentEditorModal = useModal();

  const currentId = compEditorState[compKey];

  const handleRemove = () => {
    setCompEditorState({ ...compEditorState, [compKey]: undefined });
  };

  const handleStudentSelect = (id: number) => {
    Modal.hide();
    setCompEditorState({ ...compEditorState, [compKey]: id });
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
      {currentId ? (
        <Box position="relative" height={113}>
          <Image
            priority={true}
            width={100}
            height={113}
            alt={`${currentId}`}
            src={`/images/collection/${currentId}.webp`}
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
        <StudentEditor id={currentId || 0} />
      </StudentEditorModal>
    </Paper>
  );
}
