import styled from "@emotion/styled";
import { InputProps as MuiInputProps } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { round } from "@/utils";

import Input, { InputProps } from "./Input";
import NumberInputAdornment from "./NumberInputAdornment";

function evaluate(str: string): number | null {
  if (str === "") {
    return null;
  }
  try {
    const num = Number(toHalf(str));
    return Number.isFinite(num) ? num : null;
  } catch (_) {
    return null;
  }
}

function toHalf(str: string): string {
  return str.replace(/[\uff10-\uff19]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0)
  );
}

function format(str: string): string {
  return str.replace(/[^0-9\uff10-\uff19. ()*/+-]/g, "");
}

function stepValue(value: number, step: number): number {
  const precision = Math.ceil(-Math.log10(Math.abs(step)));
  return round(value + step, precision);
}

function clamp(value: number, min?: number, max?: number): number {
  let r = value;

  if (typeof min === "number") {
    r = Math.max(r, min);
  }
  if (typeof max === "number") {
    r = Math.min(r, max);
  }

  return r;
}

export interface NumberInputProps
  extends Omit<InputProps, "type" | "inputProps" | "onChange" | "onInput"> {
  value: number | null;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  className,
  value,
  onChange,
  min,
  max,
  step = 1,
  variant,
  ...textFieldProps
}) => {
  const disabled = textFieldProps.disabled || false;
  const [inner, setInner] = useState(`${value ?? ""}`);
  const innerRef = useRef(inner);
  innerRef.current = inner;

  const handleBlur = useCallback(() => {
    setInner((str) => {
      if (str === "") {
        return `${value ?? ""}`;
      } else {
        return toHalf(str);
      }
    });
  }, [value]);

  useEffect(() => {
    if (evaluate(innerRef.current) !== value) {
      setInner(`${value ?? ""}`);
    }
  }, [value]);

  const mergedInputProps: MuiInputProps = useMemo(() => {
    const update = (value: string) => {
      const num = evaluate(value);
      if (onChange && num !== null) {
        onChange(clamp(num, min, max));
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = format(event.currentTarget.value);
      setInner(value);
      update(value);
    };

    const increase = () => {
      setInner((current) => {
        const currentNum = evaluate(current) || 0;
        const nextNum = stepValue(currentNum, step);
        return clamp(nextNum, min, max).toString();
      });
    };

    const decrease = () => {
      setInner((current) => {
        const currentNum = evaluate(current) || 0;
        const nextNum = stepValue(currentNum, -step);
        return clamp(nextNum, min, max).toString();
      });
    };

    const handleFinish = () => {
      update(innerRef.current);
    };

    const onCompositionEnd = () => {
      setInner(toHalf);
    };

    const endAdornment = (
      <NumberInputAdornment
        onIncrease={increase}
        onDecrease={decrease}
        onFinish={handleFinish}
        disabled={disabled}
      />
    );

    return {
      onChange: handleChange,
      onCompositionEnd,
      endAdornment,
      inputMode: "numeric",
    };
  }, [min, max, step, disabled, onChange]);

  return (
    <Input
      className={className}
      value={inner}
      onBlur={handleBlur}
      slotProps={{
        input: mergedInputProps,
      }}
      variant={variant}
      {...textFieldProps}
    />
  );
};

export default styled(NumberInput)`
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
