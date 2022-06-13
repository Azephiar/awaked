import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { getGradientString } from "../src/utils/utils";

const font = "'Rubik', sans-serif";

export const themeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#b5ead7",
    },
    secondary: {
      main: "#ff9aa2",
    },
    background: {
      default: "#080808",
      paper: "#080808",
      loading: "#121212",
    },

    error: {
      main: "#f44335",
    },
    warning: {
      main: "#ff9801",
    },
    info: {
      main: "rgba(154,154,154,0.08)",
    },
    success: {
      main: "#4caf51",
    },

    divider: "rgba(154,154,154,0.08)",

    text: {
      primary: "#939393",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "gba(255, 255, 255, 0.5)",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    button: {
      fontWeight: 600,
    },
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 900,
      fontSize: 20,
    },
    main: {
      fontWeight: 900,
      fontSize: 60,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "fixed",
      },
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          height: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        root: {
          width: "90%",
          margin: "auto",
          borderRadius: "8px",
          boxShadow: 0,
          marginTop: "13px",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          background: "rgba(10,10,10,0.6)",
          color: "#FAFAFA",
          backgroundImage:
            "linear-gradient(22deg, #ff9aa210 0%, #b5ead709 100%)",
          backgroundSize: "150%",
          border: 0,
          borderRadius: "8px",
          height: 48,
        },
      },
      variants: [
        {
          props: { variant: "hover" },
          style: {
            "&:hover": {
              boxShadow: "0px 0px 25px -10px #ff9aa290",
              backgroundImage:
                "linear-gradient(22deg, #ff9aa270 0%, #b5ead769 100%)",
            },
          },
        },
      ],
    },

    MuiAlert: {
      variants: [
        {
          props: { variant: "awa" },
          style: {
            backgroundColor: "#b5ead709",
          },
        },
      ],
    },

    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
};

let theme = createTheme(themeOptions);

theme = responsiveFontSizes(theme);

export default theme;
