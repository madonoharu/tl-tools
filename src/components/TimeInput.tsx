import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { styled } from "@mui/system";

import NumberInputAdornment from "./NumberInputAdornment";

export interface TimeInputProps {
  className?: string;
  limit: number;
  value: number;
  onChange?: (value: number) => void;
}

function TimeInput({ className, limit, value, onChange }: TimeInputProps) {
  const remainingFrameCount = limit - value;

  const sec = remainingFrameCount / 30;
  const m = Math.trunc(sec / 60);
  const s = Math.trunc(sec % 60);
  const mills = Math.round(((sec % 60) - s) * 1000);

  const setFrameCount = (v: number) => {
    onChange?.(Math.max(0, Math.min(limit, v)));
  };

  const handleMinutesUp = () => {
    setFrameCount(value - 30 * 60);
  };

  const handleMinutesDown = () => {
    setFrameCount(value + 30 * 60);
  };

  const handleSecondsUp = () => {
    setFrameCount(value - 30);
  };

  const handleSecondsDown = () => {
    setFrameCount(value + 30);
  };

  const handleMillisecondsUp = () => {
    setFrameCount(value - 1);
  };

  const handleMillisecondsDown = () => {
    setFrameCount(value + 1);
  };

  return (
    <Box className={className} display="flex" alignItems="flex-end" gap={1}>
      <Input
        value={m.toString().padStart(2, "0")}
        inputMode="decimal"
        endAdornment={
          <NumberInputAdornment
            onIncrease={handleMinutesUp}
            onDecrease={handleMinutesDown}
            onFinish={() => console.log("onFinish")}
          />
        }
      />
      <div>:</div>
      <Input
        value={s.toString().padStart(2, "0")}
        inputMode="numeric"
        endAdornment={
          <NumberInputAdornment
            onIncrease={handleSecondsUp}
            onDecrease={handleSecondsDown}
            onFinish={() => console.log("onFinish")}
          />
        }
      />
      <div>.</div>
      <Input
        value={mills.toString().padStart(3, "0")}
        inputMode="numeric"
        endAdornment={
          <NumberInputAdornment
            onIncrease={handleMillisecondsUp}
            onDecrease={handleMillisecondsDown}
            onFinish={() => console.log("onFinish")}
          />
        }
      />
    </Box>
  );
}

export default styled(TimeInput)`
  .MuiInput-root {
    padding-left: 8px;
    width: 64px;
  }

  .MuiInputAdornment-positionEnd {
    visibility: hidden;
  }

  :hover .MuiInputAdornment-positionEnd {
    visibility: visible;
  }

  .MuiInputLabel-root {
    white-space: nowrap;
  }
  .MuiOutlinedInput-root {
    padding-right: 0;
  }
`;
