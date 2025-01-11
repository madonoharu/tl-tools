"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  palette: { mode: "dark" },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
    MuiDialog: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
    MuiButton: {
      defaultProps: {
        color: "inherit",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          minWidth: 0,
          fontWeight: 400,
        },
      },
    },
  },
});

export default theme;
