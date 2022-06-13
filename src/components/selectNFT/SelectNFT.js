import { Box, Typography, Button, Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";

import { GradientTypography } from "../styled";
import { useContext } from "react";

import { useTheme } from "@emotion/react";
import { ContextManager } from "../context/ContextManager";
import { WalletContext } from "../context/WalletContext";
const SelectNFT = () => {
  const { nftList, setNFTDIDOf, isLoadingNftList } = useContext(ContextManager);
  const wallet = useContext(WalletContext);

  const theme = useTheme();

  const NftListSkeletonLoading = () => {
    let skeletonArray = [];
    for (let i = 0; i < 10; i++) {
      skeletonArray.push(
        <Grid key={i} item xs={6} sm={4} md={2} xl={1}>
          <Skeleton
            variant="rectangular"
            width="175px"
            height="220px"
            sx={{
              borderRadius: "5px",
              backgroundColor: theme.palette.background.loading,
            }}
          />
        </Grid>
      );
    }
    return skeletonArray;
  };

  const renderNftList = () => {
    if (!nftList) return <></>;

    if (isLoadingNftList) {
      return (
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 2, xl: 3 }}
          sx={{ marginTop: "60px" }}
        >
          <NftListSkeletonLoading />
        </Grid>
      );
    } else if (nftList.length > 0) {
      return (
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 2, xl: 3 }}
          sx={{
            marginTop: "60px",
            marginBottom: "30px",
          }}
        >
          {nftList.map((nft, key) => {
            return (
              <Grid key={key} item xs={6} sm={4} md={2} xl={1}>
                <Card>
                  <CardActionArea onClick={(e) => setNFTDIDOf(nft)}>
                    <CardMedia
                      component="img"
                      height="220px"
                      sx={{
                        borderRadius: "5px",
                      }}
                      image={nft.image_url}
                    ></CardMedia>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      );
    } else {
      return (
        <>
          <Typography align="center" fontSize={13}>
            {"You currently don't own any NFT on " +
              wallet.address.substring(0, 8).toUpperCase() +
              ". Keep in mind awaked supports ERC721 only."}
          </Typography>
          <Button
            disableRipple
            size="large"
            sx={{
              marginTop: "25px",
              boxShadow: "0px 0px 25px -10px #ff9aa230",
              width: "140px",
            }}
            onClick={() => wallet.deleteCache()}
          >
            LOGOUT
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <Box sx={{ marginRight: "7%", marginLeft: "7%" }}>
        <GradientTypography
          align="center"
          sx={{
            fontWeight: 900,
            fontSize: 45,
            lineHeight: 1.15,
            marginBottom: "40px",
          }}
          color1={theme.palette.primary.main}
          color2={theme.palette.secondary.main}
        >
          Select an NFT to awake
        </GradientTypography>
        {renderNftList()}
      </Box>
    </>
  );
};

export default SelectNFT;
