import styled from "@emotion/styled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Button, InputAdornment } from "@mui/material";

import { useLongPress } from "@/hooks/useLongPress";

const StyledButton = styled(Button)`
  display: flex;
  height: 16px;
  width: 24px;
`;

const StyledInputAdornment = styled(InputAdornment)`
  flex-direction: column;
  justify-content: center;
  margin-left: 0;
`;

interface NumberInputAdornmentProps {
  className?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onFinish: () => void;
  disabled?: boolean;
}

export default function NumberInputAdornment({
  className,
  onIncrease,
  onDecrease,
  onFinish,
  disabled,
}: NumberInputAdornmentProps) {
  const increaseHandlers = useLongPress({ onPress: onIncrease, onFinish });
  const decreaseHandlers = useLongPress({ onPress: onDecrease, onFinish });

  return (
    <StyledInputAdornment className={className} position="end">
      <StyledButton
        aria-label="increase"
        disabled={disabled}
        {...increaseHandlers}
      >
        <ArrowDropUpIcon />
      </StyledButton>
      <StyledButton
        aria-label="decrease"
        disabled={disabled}
        {...decreaseHandlers}
      >
        <ArrowDropDownIcon />
      </StyledButton>
    </StyledInputAdornment>
  );
}
