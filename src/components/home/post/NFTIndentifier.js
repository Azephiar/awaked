import { Grid, Typography } from "@mui/material";
import { AwaPaper, AddressTypography } from "../../styled";

const NFTIndentifier = ({ symbol, tokenId, address }) => {
  return (
    <>
      <Grid item container direction="row">
        <Grid item sx={{ marginRight: "3px" }}>
          <AwaPaper>
            <Typography fontWeight={700}>{symbol}</Typography>
          </AwaPaper>
        </Grid>
        <Grid item sx={{ marginLeft: "3px", marginRight: "3px" }}>
          <AwaPaper>
            <Typography fontWeight={700}>{"#" + tokenId}</Typography>
          </AwaPaper>
        </Grid>
      </Grid>
    </>
  );
};

export default NFTIndentifier;
