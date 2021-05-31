import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

let dark = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*": {
          "scrollbar-width": "thin",
        },
        "*::-webkit-scrollbar": {
          width: "12px",
        },
        "::-webkit-scrollbar": {
          height: "16px",
          overflow: "visible",
          width: "16px",
        },
        "::-webkit-scrollbar-button": {
          height: 0,
          width: 0,
        },
        "body::-webkit-scrollbar-corner": {
          backgroundClip: "padding-box",
          backgroundColor: " #202124",
          border: "solid #5f6368",
          borderWidth: "3px 0 0 3px",
          webkitBoxShadow: "inset 1px 1px 0 rgb(0 0 0 / 14%)",
          boxShadow: " inset 1px 1px 0 rgb(0 0 0 / 14%)",
        },
        "::-webkit-scrollbar-corner": {
          background: "transparent",
        },
        "body::-webkit-scrollbar-thumb": {
          borderWidth: "1px 1px 1px 2px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255,255,255,.3)",
          backgroundClip: "padding-box",
          border: "solid transparent",
          borderWidth: "1px 1px 1px 6px",
          minHeight: 28,
          padding: "100px 0 0",
          boxShadow: "inset 1px 1px 0 rgb(0 0 0 / 10%), inset 0 -1px 0 rgb(0 0 0 / 7%)",
        },
        "::-webkit-scrollbar-track": {
          backgroundClip: "padding-box",
          border: "solid transparent",
          borderWidth: " 0 0 0 4px",
        },
        "body::-webkit-scrollbar-track-piece": {
          borderWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        color: "#9aa0a6",
        padding: 8,
      },
    },
    MuiButton: {
      root: {
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: "rgba(154,160,166,0.039)",
        },
      },
    },
  },
  shape: {
    borderRadius: "8px",
  },
  palette: {
    type: "dark",
    background: {
      dark: "#28292c",
      default: "#202124",
      paper: "#202124",
    },
    primary: {
      main: "#8ab4f8",
      light: "#7f90af",
      dark: "#42516c",
      contrastText: "#000",
    },
    secondary: {
      main: "#00d27a",
      contrastText: "#000",
    },
    error: {
      main: "#CF6679",
    },
    text: {
      primary: "#e8eaed",
      disabled: "rgba(255, 255, 255, 38)",
    },
  },
});
dark = responsiveFontSizes(dark);

let light = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*": {
          "scrollbar-width": "thin",
        },
        "*::-webkit-scrollbar": {
          width: "12px",
        },
        "::-webkit-scrollbar": {
          height: "16px",
          overflow: "visible",
          width: "16px",
        },
        "::-webkit-scrollbar-button": {
          height: 0,
          width: 0,
        },
        "body::-webkit-scrollbar-corner": {
          backgroundClip: "padding-box",
          backgroundColor: " #202124",
          border: "solid #5f6368",
          borderWidth: "3px 0 0 3px",
          webkitBoxShadow: "inset 1px 1px 0 rgb(0 0 0 / 14%)",
          boxShadow: " inset 1px 1px 0 rgb(0 0 0 / 14%)",
        },
        "::-webkit-scrollbar-corner": {
          background: "transparent",
        },
        "body::-webkit-scrollbar-thumb": {
          borderWidth: "1px 1px 1px 2px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255,255,255,.3)",
          backgroundClip: "padding-box",
          border: "solid transparent",
          borderWidth: "1px 1px 1px 6px",
          minHeight: 28,
          padding: "100px 0 0",
          boxShadow: "inset 1px 1px 0 rgb(0 0 0 / 10%), inset 0 -1px 0 rgb(0 0 0 / 7%)",
        },
        "::-webkit-scrollbar-track": {
          backgroundClip: "padding-box",
          border: "solid transparent",
          borderWidth: " 0 0 0 4px",
        },
        "body::-webkit-scrollbar-track-piece": {
          borderWidth: 0,
        },
      },
    },
  },
  palette: {
    type: "light",
    grey: {
      500: "#5e6e82",
      800: "",
    },
    background: {
      dark: "#F4F6F8",
      default: "#edf2f9",
      paper: "#fff",
    },
    primary: {
      main: "#2c7be5",
      light: "#27bcfd",
      contrastText: "#fff",
    },
    secondary: {
      main: "#00d27a",
      contrastText: "#fff",
    },

    error: {
      main: red[500],
    },
    text: {
      primary: "#344050",
      secondary: "#5e6e82",
      disabled: "#9da9bb",
    },
  },
});
light = responsiveFontSizes(light);

export { dark, light };
