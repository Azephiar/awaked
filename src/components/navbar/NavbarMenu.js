import { Drawer, List, ListItemText, ListItem, ListItemButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { deleteNFTLocalCache } from "../context/LocalStorageManager";
import { WalletContext } from "../context/WalletContext";
import { useContext } from "react";
import { Configuration } from "../../utils/constants";
const NavBarMenu = ({ open, onClose }) => {
  const theme = useTheme();
  const wallet = useContext(WalletContext);

  const logout = async () => {
    deleteNFTLocalCache();
    await wallet.deleteCache();
    onClose();
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        elevation={0}
        hideBackdrop={true}
        PaperProps={{
          sx: {
            width: { xs: "100%", md: "375px" },
            backgroundImage: "radial-gradient(50% 50% at 50% 50%,#b5ead703 0,rgba(255,255,255,0) 100%)",
            transform: "translate(-50vw,-100vh)",
            boxShadow: 0,
          },
        }}
      >
        <List sx={{ marginTop: "80px" }}>
          {/* <ListItemButton
            key="DOCS"
            sx={{ paddingRight: "25px", paddingLeft: "25px" }}
          >
            <ListItemText
              primary="DOCS"
              primaryTypographyProps={{ fontSize: 22, fontWeight: 800 }}
            />
          </ListItemButton> */}

          <ListItem
            button
            component="a"
            href={Configuration.discord_url}
            target="_blank"
            key="DISCORD"
            sx={{ paddingRight: "25px", paddingLeft: "25px" }}
          >
            <ListItemText primary="DISCORD" primaryTypographyProps={{ fontSize: 22, fontWeight: 800 }} />
          </ListItem>

          <ListItem
            button
            component="a"
            href={Configuration.twitter_url}
            target="_blank"
            key="TWITTER"
            sx={{ paddingRight: "25px", paddingLeft: "25px" }}
          >
            <ListItemText primary="TWITTER" primaryTypographyProps={{ fontSize: 22, fontWeight: 800 }} />
          </ListItem>

          <ListItemButton key="LOGOUT" onClick={() => logout()} sx={{ paddingRight: "25px", paddingLeft: "25px" }}>
            <ListItemText primary="LOGOUT" primaryTypographyProps={{ fontSize: 22, fontWeight: 800 }} />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default NavBarMenu;
