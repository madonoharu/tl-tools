import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import React from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";

export interface WithIconButtonProps
  extends Omit<IconButtonProps, "size" | "title"> {
  label?: string;
  title?: TooltipProps["title"];
  size?: "tiny" | "small" | "medium";
  tooltipProps?: Omit<TooltipProps, "title">;
}

export const withIconButton = (WrappedIcon: React.FC<SvgIconProps>) => {
  const WithIconButton: React.FC<WithIconButtonProps> = ({
    title,
    label,
    tooltipProps,
    size = "tiny",
    ...iconButtonProps
  }) => {
    const WrappedButton = (
      <IconButton
        size={size === "tiny" || size === "small" ? "small" : undefined}
        sx={
          size === "tiny"
            ? {
                padding: "3px",
                lineHeight: 0,
              }
            : null
        }
        {...iconButtonProps}
      >
        <WrappedIcon sx={{ display: "block", fontSize: "inherit" }} />
        {label}
      </IconButton>
    );

    if (title && !iconButtonProps.disabled) {
      return (
        <Tooltip title={title} {...tooltipProps}>
          {WrappedButton}
        </Tooltip>
      );
    }

    return WrappedButton;
  };

  WithIconButton.displayName = `WithIconButton(${
    WrappedIcon.displayName || WrappedIcon.name
  })`;

  return WithIconButton;
};
