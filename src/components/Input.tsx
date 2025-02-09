import styled from "@emotion/styled";
import {
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import React from "react";

const StartInputAdornment = styled(InputAdornment)`
  p {
    font-size: 0.75rem;
    margin-bottom: -1px;
  }
`;

export type InputProps = MuiTextFieldProps & {
  startLabel?: React.ReactNode;
};

export default function Input({ startLabel, ...rest }: InputProps) {
  const startAdornment = startLabel && (
    <StartInputAdornment position="start">{startLabel}</StartInputAdornment>
  );

  return <MuiTextField slotProps={{ input: { startAdornment } }} {...rest} />;
}
