import {
  Container,
  Button,
  Grid,
  Stack,
  Paper,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { ContextManager } from "../../context/ContextManager";
import { useContext, useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AddressTypography, AwaPaper, PostPaper } from "../../styled";
import {
  getGradientStringFromAddress,
  timeDifference,
} from "../../../utils/utils.js";
import ProfilePicture from "./ProfilePicture";
import NFTIndentifier from "./NFTIndentifier";

const Post = ({ post }) => {
  return (
    <>
      {/* Possible future top bar for additional information.
      <Grid item container direction="row" sx={{ backgroundColor: "blue" }}>
        top bar
      </Grid> */}

      <Grid
        item
        container
        direction="row"
        justifyContent="flex-start"
        wrap="nowrap"
      >
        <Grid
          item
          container
          direction="column"
          xs="auto"
          sx={{ marginRight: "3px" }}
        >
          <ProfilePicture
            image={post.image_url}
            address={post.contract_address}
          />
        </Grid>

        <Grid item container direction="column">
          <Grid item container direction="row" align="left">
            <NFTIndentifier
              symbol={post.symbol}
              tokenId={post.token_id}
              address={post.contract_address}
            />
            {/* Edit option:
            <Grid item>
              <MoreHorizIcon></MoreHorizIcon>
            </Grid> */}
          </Grid>

          <Grid item sx={{ marginTop: "5px", width: "100%" }}>
            <PostPaper elevation={0}>
              <Typography fontSize={15} fontWeight={500} align="left">
                {post.text}
              </Typography>
            </PostPaper>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        justifyContent="flex-end"
        direction="row"
        fontSize={10}
        sx={{ width: "100%" }}
      >
        {timeDifference(post.timestamp)}
      </Grid>
    </>
  );
};

export default Post;
