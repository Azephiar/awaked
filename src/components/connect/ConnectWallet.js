import {
  Button,
  Box,
  CircularProgress,
  Alert,
  Typography,
  Divider,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { GradientTypography } from "../styled";
import { getGradientString } from "../../utils/utils";
import { WalletContext } from "../context/WalletContext";
import { AlertContext } from "../context/AlertContext";
const ConnectWallet = ({ connect }) => {
  const wallet = useContext(WalletContext);
  const alert = useContext(AlertContext);
  const theme = useTheme();

  const connectWithWeb3 = async () => {
    await wallet.connect().catch((e) => {
      alert.show(e.message, "error");
    });
  };

  return (
    <Box
      sx={{
        marginRight: "4%",
        marginLeft: "4%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Box
        sx={{
          // height:
          //   "calc(100vh - " +
          //   theme.components.MuiAppBar.styleOverrides.root.height +
          //   "px)",
          display: "flex",
          flexDirection: "column",
          paddingTop: "120px",
        }}
      >
        <GradientTypography
          sx={{ fontWeight: 800, fontSize: 40, lineHeight: 1.15 }}
          color1={theme.palette.primary.main}
          color2={theme.palette.secondary.main}
        >
          Awake your
        </GradientTypography>
        <GradientTypography
          sx={{ fontWeight: 900, fontSize: 110, lineHeight: 0.9 }}
          color1={theme.palette.primary.main}
          color2={theme.palette.secondary.main}
        >
          NFTs
        </GradientTypography>
        <GradientTypography
          sx={{
            fontWeight: 500,
            fontSize: 18,
            lineHeight: 1.15,
            marginTop: "40px",
            marginRight: "15%",
            marginLeft: "15%",
          }}
          color1={theme.palette.primary.main}
          color2={theme.palette.secondary.main}
        >
          Give them a digital life.
        </GradientTypography>

        <Button
          disableRipple
          size="large"
          sx={{
            marginTop: "55px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0px 0px 25px -10px #ff9aa230",
            width: "140px",
          }}
          onClick={() => connectWithWeb3()}
        >
          {wallet.isConnecting ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "CONNECT"
          )}
        </Button>
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <GradientTypography
          sx={{ fontWeight: 800, fontSize: 35, lineHeight: 1.15 }}
          color1={theme.palette.primary.main}
          color2={theme.palette.secondary.main}
        >
          What's awaked?
        </GradientTypography>
        <Typography fontWeight={500} fontSize={15} sx={{ marginTop: "15px" }}>
          It's an NFT-only decentralized social network built using ceramic IDX
          protocol and decentralized identifiers (DIDs).
        </Typography>
        <Typography fontWeight={500} fontSize={15} sx={{ marginTop: "15px" }}>
          The combination of these technologies allows NFTs to control
          decentralized documents. If an NFT gets sold, the rights to write and
          update the documents gets also transfered.
        </Typography>
      </Box> */}
    </Box>
  );
};

export default ConnectWallet;
