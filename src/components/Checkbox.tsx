import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";
import React from "react";

interface CheckboxProps
  extends Pick<MuiCheckboxProps, "size" | "color" | "disabled"> {
  className?: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  label?: FormControlLabelProps["label"];
}

export default function Checkbox({
  className,
  checked,
  onChange,
  label,
  size,
  color,
  disabled,
}: CheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  };

  return (
    <FormControlLabel
      className={className}
      label={label}
      control={
        <MuiCheckbox
          size={size}
          color={color}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
        />
      }
    />
  );
}
