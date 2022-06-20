import { Button, Grid, Input, CircularProgress } from "@mui/material";
import { ContextManager } from "../../context/ContextManager";
import { useContext, useRef, useState } from "react";
import NFTIndentifier from "./NFTIndentifier";
import ProfilePicture from "./ProfilePicture";
import { CeramicContext } from "../../context/CeramicContext";
import { WalletContext } from "../../context/WalletContext";
import { FirebaseContext } from "../../context/FirebaseContext";

const NewPost = () => {
  const inputRef = useRef();
  const { nftData, nftDID } = useContext(ContextManager);
  const ceramic = useContext(CeramicContext);
  const wallet = useContext(WalletContext);
  const firebase = useContext(FirebaseContext);

  const [isPosting, setIsPosting] = useState(false);

  const newPost = async () => {
    setIsPosting(true);
    console.log("posting");
    const timestamp = new Date().toISOString();
    try {
      const { postListStreamID, postStreamID } = await ceramic.newPost(inputRef.current.value, timestamp, nftDID);

      await firebase.newPost(postListStreamID, postStreamID, nftDID, timestamp);
      inputRef.current.value = "";
      setIsPosting(false);
    } catch {
      (e) => {
        throw e;
      };
    }
  };

  return (
    <>
      {/* Possible future top bar for additional information.
    <Grid item container direction="row" sx={{ backgroundColor: "blue" }}>
      top bar
    </Grid> */}

      <Grid item container direction="row" justifyContent="flex-start" wrap="nowrap">
        <Grid item container direction="column" xs="auto" sx={{ marginRight: "3px" }}>
          <ProfilePicture image={nftData.image_url} address={nftData.asset_contract.address} />
        </Grid>

        <Grid item container direction="column">
          <Grid item container direction="row" align="left">
            <NFTIndentifier symbol={nftData.asset_contract.symbol} tokenId={nftData.token_id} address={nftData.asset_contract.address} />
          </Grid>

          <Grid item sx={{ marginTop: "5px", width: "100%" }}>
            <Input
              inputRef={inputRef}
              multiline={true}
              minRows={3}
              disableUnderline={true}
              placeholder={"Hey, I'm #" + nftData.asset_contract.symbol + " #" + nftData.token_id + "..."}
              fontSize={15}
              fontWeight={500}
              sx={{
                backgroundColor: "#121212",
                color: "#F1F1F1",
                width: "100%",
                borderRadius: "8px",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "6px",
                paddingBottom: "6px",
              }}
            >
              hello
            </Input>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container justifyContent="right" direction="row" fontSize={10} sx={{ marginTop: "11px" }}>
        <Button
          fontWeight={800}
          disabled={isPosting}
          variant="hover"
          sx={{ paddingTop: "0px", paddingBottom: "0px", width: "140px" }}
          onClick={() => newPost()}
        >
          {isPosting ? <CircularProgress size={20} sx={{ color: "white" }} /> : "POST"}
        </Button>
      </Grid>
    </>
  );
};

export default NewPost;
