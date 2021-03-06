import { useContext, useState } from "react";
import SelectNFT from "./selectNFT/SelectNFT";
import ConnectWallet from "./connect/ConnectWallet";
import { ContextManager } from "./context/ContextManager";
import Home from "./home/Home";
import Navbar from "./navbar/Navbar";
import { CircularProgress, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { WalletContext } from "./context/WalletContext";
import { AlertContext } from "./context/AlertContext";
import { ErrorBoundary } from "react-error-boundary";
import { NFTCacheExists } from "./context/LocalStorageManager";

const MainApp = () => {
  const { nftList } = useContext(ContextManager);
  const wallet = useContext(WalletContext);
  const alert = useContext(AlertContext);
  const theme = useTheme();

  const [isContentVisible, setContentVisibility] = useState(true);

  //Fallback function for errors
  function ErrorFallback({ error, resetErrorBoundary }) {
    console.log("Fallback error", error);
    // alert.show(error.message, "error");
    return <>{error.message}</>;
  }

  const errorHandler = (error, info) => {
    console.log("Fallback error", error);
    alert.show(error.message, "error");
  };

  const toggleContentVisibility = async () => {
    setContentVisibility(!isContentVisible);
  };

  const showContent = () => {
    return <Home />;

    if (wallet?.isConnected()) {
      if (NFTCacheExists()) {
      } else {
        return <SelectNFT address={wallet?.address} nftList={nftList} />;
      }
    } else if (!wallet?.isConnected()) {
      return <ConnectWallet />;
    }
    return <CircularProgress />;
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
      <Navbar
        toggleContentVisibility={toggleContentVisibility}
        infoBarHeight={theme.components.MuiAppBar.styleOverrides.root.height * 0.375 + "px"}
      />

      {
        <Grid
          sx={{
            marginTop: theme.components.MuiAppBar.styleOverrides.root.height + "px",
          }}
          container
          direction="column"
          justifyContent="center"
          align="center"
        >
          <Grid sx={{ marginTop: "40px", width: "100%" }}>{showContent()}</Grid>
        </Grid>
      }
    </ErrorBoundary>
  );
};

export default MainApp;
