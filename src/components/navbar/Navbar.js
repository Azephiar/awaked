import { useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import NavbarMenu from "./NavbarMenu";
import { CustomAppBar, CustomMenuButton } from "../styled";
import { useTheme } from "@emotion/react";
import React from "react";
import { useScrollTrigger } from "@mui/material";
import { getGradientString } from "../../utils/utils";
const NavBar = (props) => {
  const [isNavBarMenuOpen, setIsNavBarMenuOpen] = useState(false);
  const theme = useTheme();

  function OnScroll({ children }) {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 5 : 0,
      sx: {
        backgroundImage: trigger && getGradientString("#b5ead710", "#ff9aa210"),
        backgroundColor: trigger ? "black" : "transparent",
      },
    });
  }

  const closeNavBarMenu = () => {
    setIsNavBarMenuOpen(false);
  };

  const toggleNavBarMenu = () => {
    setIsNavBarMenuOpen(!isNavBarMenuOpen);
    props.toggleContentVisibility();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <OnScroll {...props}>
          <CustomAppBar position="fixed">
            <Toolbar>
              <Box component="img" sx={{ height: "52px", width: "52px" }} src="./logo256.png" />

              <CustomMenuButton size="large" edge="start" variant="hover" aria-label="menu" onClick={toggleNavBarMenu} disableRipple={true}>
                {isNavBarMenuOpen ? <Close fontSize="large" /> : <Menu fontSize="large" />}
              </CustomMenuButton>
            </Toolbar>
          </CustomAppBar>
        </OnScroll>
      </Box>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "black",
          zIndex: 1,
        }}
      >
        <Typography
          fontSize={9}
          fontWeight={700}
          align="center"
          sx={{
            paddingTop: "2px",
            paddingBottom: "2px",
            color: "white",
          }}
        >
          ⚠️ THIS MVP IS RUNNING ON NOT-SO-STABLE CERAMIC CLAY & ETH ROPSTEN TESTNETS
        </Typography>
      </Box>
      <NavbarMenu open={isNavBarMenuOpen} onClose={closeNavBarMenu}></NavbarMenu>
    </>
  );
};

export default NavBar;
