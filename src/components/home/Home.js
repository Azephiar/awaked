import { Grid, Box, CircularProgress } from "@mui/material";
import { useContext, useEffect, useRef, useCallback } from "react";
import Post from "./post/Post";
import NewPost from "./post/NewPost";
import ConnectWith3ID from "./post/ConnectWith3ID";
import { PostLoading, UserLoading } from "./post/PostLoading";
import GridDivider from "../custom/GridDivider";
import { GradientTypography } from "../styled";
import { CeramicContext } from "../context/CeramicContext";
import { FirebaseContext } from "../context/FirebaseContext";
import { useTheme } from "@emotion/react";

const Home = () => {
  const ceramic = useContext(CeramicContext);
  const firebase = useContext(FirebaseContext);
  const theme = useTheme();
  const observer = useRef(); // (*)

  //Start listener which also fecthes first batch of posts.
  useEffect(() => {
    firebase.startPostListener();
    window.scrollTo(0, 0);
  }, []);

  //Callback to keep a reference on the last grid of the layout which is used to trigger posts loading.
  //Don't really understand it works but it does. At some point I'll dig into it.
  const lastPostRef = useCallback(
    (node) => {
      if (firebase.isLoadingPosts) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          firebase.getMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [firebase.isLoadingPosts]
  );

  const UserSkeletonLoading = (key) => {
    return <UserLoading />;
  };

  const PostSkeletonLoading = () => {
    let skeletonArray = [];
    for (let i = 0; i < 10; i++) {
      skeletonArray.push(
        <Grid key={i} item container direction="column" sx={{ marginBottom: "20px" }}>
          <PostLoading />
        </Grid>
      );
    }
    return skeletonArray;
  };

  const showHeader = () => {
    if (ceramic.is3IDConnected()) {
      return <NewPost />;
    }

    return <ConnectWith3ID />;
  };

  return (
    <Grid container item justifyContent="center" sx={{ width: { xs: "94%", md: "35%" } }}>
      <Grid item container direction="column" justifyContent="center">
        {showHeader()}
      </Grid>

      <Grid
        item
        sx={{
          borderTop: 1,
          borderBottom: 1,
          marginTop: "35px",
          marginBottom: "25px",
          borderColor: theme.palette.divider,
          width: "100%",
        }}
      >
        <GradientTypography fontSize={17} fontWeight={800} align="right" sx={{ marginTop: "12px", marginBottom: "12px" }}>
          LATEST POSTS ▼
        </GradientTypography>
      </Grid>

      <Grid item container direction="row">
        {firebase.isLoadingPosts && firebase.awakedPostList.length == 0 ? (
          <PostSkeletonLoading />
        ) : (
          firebase.awakedPostList.map((post, i) => {
            return (
              <Grid key={i} item container direction="column">
                <Post post={post} />
                <GridDivider />
              </Grid>
            );
          })
        )}
      </Grid>

      <Grid item container justifyContent="center" alignContent="center" sx={{ width: "100%" }}>
        {firebase.awakedPostList.length > 0 && <Box ref={lastPostRef}></Box>}
        {firebase.awakedPostList.length > 0 && firebase.hasMorePosts && (
          <CircularProgress sx={{ marginBottom: "75px", marginTop: "10px" }} size={25} />
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
