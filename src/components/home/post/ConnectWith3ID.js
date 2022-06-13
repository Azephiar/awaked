import {
  Container,
  Button,
  Grid,
  Stack,
  Paper,
  Box,
  Typography,
  Input,
  TextareaAutosize,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import { ContextManager } from "../../context/ContextManager";
import { useContext, useEffect, useRef, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  AwaPaper,
  GradientTypography,
  PostPaper,
  AddressTypography,
} from "../../styled.js";
import { getGradientStringFromAddress } from "../../../utils/utils";
import NFTIndentifier from "./NFTIndentifier";
import ProfilePicture from "./ProfilePicture";
import { CeramicContext } from "../../context/CeramicContext";
import { FirebaseContext } from "../../context/FirebaseContext";
import { useTheme } from "@emotion/react";
import { Launch } from "@mui/icons-material";

const ConnectWith3ID = () => {
  const ceramic = useContext(CeramicContext);
  const theme = useTheme();

  const connectWith3ID = async () => {
    await ceramic.connectWith3ID();
  };

  return (
    <>
      <Grid item container direction="row">
        <GradientTypography
          sx={{ fontWeight: 800, fontSize: 40, lineHeight: 1.15 }}
          color1={theme.palette.primary.main}
          color2={theme.palette.secondary.main}
        >
          Connect with 3ID to post
        </GradientTypography>
      </Grid>

      <Grid item container direction="row" justifyContent="center">
        <Button
          disableRipple
          size="large"
          variant="hover"
          sx={{
            marginTop: "35px",
            boxShadow: "0px 0px 25px -10px #ff9aa230",
            width: "200px",
          }}
          onClick={connectWith3ID}
        >
          {ceramic.is3IDConnecting ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "CONNECT WITH 3ID"
          )}
        </Button>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        sx={{ marginTop: "10px" }}
      >
        <Link
          href="https://blog.ceramic.network/what-is-3id-connect/"
          target="_blank"
          sx={{ fontSize: 12 }}
        >
          What is 3ID?
          <Launch sx={{ marginLeft: "2px" }} fontSize="10" />
        </Link>
      </Grid>
    </>
  );
};

export default ConnectWith3ID;
