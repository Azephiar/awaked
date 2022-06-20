import React from "react";
import { Divider } from "@mui/material";
const GridDivider = () => {
  return (
    <Divider
      direction="row"
      sx={{
        marginTop: "15px",
        marginBottom: "15px",
        backgroundColor: "transparent",
        width: "100%",
      }}
    />
  );
};

export default GridDivider;
