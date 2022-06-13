import { useEffect, useContext, useState } from "react";
import { Box, Toolbar, AppBar, Button, Typography, Link } from "@mui/material";
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
            {/* <!-- FUNDRAISING BOX -->
            <Box
              sx={{
                width: "100%",
                position: "sticky",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link
                fontSize={15}
                fontWeight={800}
                align="center"
                sx={{
                  paddingTop: "2px",
                  paddingBottom: "2px",
                  color: "white",
                }}
              >
                WE ARE FUNDRAISING 🎉
              </Link>
            </Box> */}

            <Toolbar>
              <Box
                component="img"
                sx={{ height: "52px", width: "52px" }}
                src="./logo256.png"
              />

              <CustomMenuButton
                size="large"
                edge="start"
                variant="hover"
                aria-label="menu"
                onClick={toggleNavBarMenu}
                disableRipple={true}
              >
                {isNavBarMenuOpen ? (
                  <Close fontSize="large" />
                ) : (
                  <Menu fontSize="large" />
                )}
              </CustomMenuButton>
            </Toolbar>
          </CustomAppBar>
        </OnScroll>
      </Box>
      <NavbarMenu
        open={isNavBarMenuOpen}
        onClose={closeNavBarMenu}
      ></NavbarMenu>
    </>
  );
};

export default NavBar;
