import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export type ModalProps = Partial<MuiDialogProps> & {
  full?: boolean;
  fullHeight?: boolean;
};

function Modal({ full, fullHeight: _, ...rest }: ModalProps) {
  return (
    <MuiDialog
      open={false}
      transitionDuration={100}
      fullWidth={full}
      {...rest}
    />
  );
}

export default styled(Modal)(({ full, fullHeight }) => ({
  ".MuiDialog-paper": {
    padding: 8,
    height: (full || fullHeight) && "calc(100vh - 64px)",
  },
}));
