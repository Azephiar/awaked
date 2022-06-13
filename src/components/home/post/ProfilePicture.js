import { Box } from "@mui/material";
import { getGradientStringFromAddress } from "../../../utils/utils";
const ProfilePicture = ({ image, address }) => {
  return (
    <>
      <Box
        sx={{
          width: "56px",
          height: "56px",
          borderRadius: "5px",
          backgroundImage: getGradientStringFromAddress(address),
        }}
      >
        <Box
          component="img"
          src={image}
          sx={{
            width: "48px",
            height: "48px",
            borderRadius: "5px",
            marginTop: "4px",
          }}
        />
      </Box>
    </>
  );
};

export default ProfilePicture;
