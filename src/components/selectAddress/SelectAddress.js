import { Box, Typography, Button } from "@mui/material";
import { GradientTypography } from "../styled";
import { useContext } from "react";
import { useTheme } from "@emotion/react";
import { ContextManager } from "../context/ContextManager";
import { WalletContext } from "../context/WalletContext";

const SelectAddress = () => {
  const { nftList, setNFTDIDOf } = useContext(ContextManager);
  const wallet = useContext(WalletContext);

  const theme = useTheme();
  return (
    <>
      <Box sx={{ marginRight: "7%", marginLeft: "7%" }}>
        <GradientTypography
          align="center"
          sx={{
            fontWeight: 900,
            fontSize: 40,
            lineHeight: 1.15,
            marginBottom: "40px",
          }}
          color1={theme.palette.primary.main}
          color2={theme.palette.secondary.main}
        >
          Change address
        </GradientTypography>
        <Typography align="center" fontSize={13}>
          You currently don't own any NFT.
        </Typography>
        {wallet.addresses.map((address) => address)}
      </Box>
    </>
  );
};

export default SelectAddress;
