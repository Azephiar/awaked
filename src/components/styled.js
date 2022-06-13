import { styled } from "@mui/material/styles";
import {
  getGradientString,
  getGradientStringFromAddress,
} from "../utils/utils";
import {
  Paper,
  Button,
  Typography,
  Grid,
  Box,
  Drawer,
  AppBar,
} from "@mui/material";
import { Constants } from "../utils/constants";

export const PostPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  minHeight: "80px",
  boxShadow: "0px",
  paddingRight: "7px",
  paddingLeft: "7px",
  backgroundColor: "rgba(0,0,0,0)",
}));

export const AwaPaper = styled(Paper)(({ address }) => ({
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingTop: "2px",
  paddingBottom: "2px",
  boxShadow: 0,
  borderRadius: "5px",
  backgroundColor: "#111111",
}));

export const MainButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#fff",
    color: "#3c52b2",
  },
}));

export const Background = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  pointerEvents: "none",
  width: "200vw",
  height: "200vh",
  background:
    "radial-gradient(50% 50% at 50% 50%,#b5ead710 0,rgba(255,255,255,0) 100%)",
  transform: "translate(-50vw,-100vh)",
  zIndex: "-1",
}));

export const BackgroundPostList = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  pointerEvents: "none",
  width: "200vw",
  height: "200vh",
  background:
    "radial-gradient(50% 50% at 50% 50%,#b5ead703 0,rgba(255,255,255,0) 100%)",
  transform: "translate(-50vw,-100vh)",
  zIndex: "-1",
}));

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const CustomMenuButton = styled(Button)(({ theme }) => ({
  mr: 2,
  backgroundColor: "rgba(10, 10, 10, 0.2)",
  width: "66px",
  height: "53px",
  marginLeft: "auto",
  borderRadius: "8px",
  color: "white",
}));

export const ExternalPaper = styled(Paper)(({ theme }) => ({
  paddingBottom: "25px",
  borderRadius: "8px",
  boxShadow: "none",
}));

export const GradientButton = styled(Button)(({ theme }) => ({
  backgroundImage: Constants.GRADIENT,
  backgroundSize: "150% auto",
  padding: "10px 15px 10px 15px",
  color: theme.palette.text.primary,
  borderRadius: "8px",
  height: "43px",
  fontWeight: "700",
}));

export const GradientTypography = styled(Typography)(
  ({ color1, color2, backgroundsize }) => ({
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
    backgroundImage: getGradientString(color1, color2, "90deg"),
    backgroundSize: backgroundsize ? backgroundsize : "150% auto",
  })
);

export const AddressTypography = styled(Typography)(({ address }) => ({
  WebkitTextFillColor: "transparent",
  WebkitBackgroundClip: "text",
  backgroundImage: getGradientStringFromAddress(address),
  backgroundSize: "100% auto",
}));

export const InternalPaper = styled(Paper)(({ theme }) => ({
  width: "90%",
  margin: "auto",
  borderRadius: "8px",
  boxShadow: "none",
  marginTop: "13px",
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "25px",
  borderRadius: "8px",
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: 35,
  textAlign: "center",
  fontWeight: 900,
  marginTop: "-45px",
  width: "80%",
  borderRadius: "8px",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#111111",
  lineHeight: "inherit",
  fontStyle: "italic",
}));

export const Loader = styled(Box)(({ theme, width, height }) => ({
  borderRadius: "3px",
  animation: "flashBackground 1200ms infinite",
  width: typeof width !== "undefined" ? width : "100px",
  height: typeof height !== "undefined" ? height : "18px",
  backgroundColor: "#151515",

  "@keyframes flashBackground": {
    "0%": { opacity: 0.5 },
    "50%": { opacity: 1 },
    "100%": { opacity: 0.5 },
  },
}));

export const AnimatedTypography = styled(Typography)(({ animate }) => ({
  animation: animate && "moveBackground 1200ms infinite",
  color: "pink",

  "@keyframes moveBackground": {
    "0%": { opacity: 0.5 },
    "50%": { opacity: 1 },
    "100%": { opacity: 0.5 },
  },
}));

export const TextAnimation = styled(GradientTypography)(
  ({ theme, width, height }) => ({
    fontSize: 12,
    fontWeight: 700,
    paddingTop: "5px",
    paddingBottom: "5px",
    textAlign: "center",

    "&::before": {
      content: '"RENOUNCING OWNERSHIP IS JUST A MARKETING TERM"',
      animation: "topToBottom 20s infinite 0s",
    },

    "@keyframes topToBottom": {
      "0%": {
        content: '"RENOUNCING OWNERSHIP IS JUST A MARKETING TERM"',
      },
      "25%": {
        content: '"BURNING TOKENS AT LAUNCH IS USELESS"',
      },
      "50%": {
        content: '"90% OF AUDITS ARE MADE BY INCOMPETENTS"',
      },
      "75%": {
        content: '"WANNA KNOW MORE ABOUT SCAMS? ASK US"',
      },
    },
  })
);
