import React from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";

interface StyledIconButtonProps {
  iconButtonSize?: "tiny" | "small" | "medium";
}

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "iconButtonSize",
})<StyledIconButtonProps>(
  ({ iconButtonSize }) =>
    iconButtonSize === "tiny" && {
      padding: 3,
      lineHeight: 0,
    }
);

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
      <StyledIconButton
        size={size === "tiny" ? "small" : size}
        iconButtonSize={size}
        {...iconButtonProps}
      >
        <WrappedIcon sx={{ display: "block", fontSize: "inherit" }} />
        {label}
      </StyledIconButton>
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
