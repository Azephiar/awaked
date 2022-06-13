import PropTypes from "prop-types";
import Head from "next/head";

import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { Background } from "../src/components/styled";
import { useContext } from "react";
import { BackgroundPostList } from "../src/components/styled";
import { useState, useEffect } from "react";
import { ContextManagerProvider } from "../src/components/context/ContextManager";
import { WalletContextProvider } from "../src/components/context/WalletContext";
import { FirebaseContextProvider } from "../src/components/context/FirebaseContext";
import { ContextManager } from "../src/components/context/ContextManager";
import { CeramicContextProvider } from "../src/components/context/CeramicContext";
import { AlertContextProvider } from "../src/components/context/AlertContext";
import { useRouter } from "next/router";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export function reportWebVitals(metric) {
  // console.log("metric", metric);
}

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { nftList } = useContext(ContextManager);

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />

          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <AlertContextProvider>
          <WalletContextProvider>
            <CeramicContextProvider>
              <FirebaseContextProvider>
                <ContextManagerProvider>
                  <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline enableColorScheme />
                    <Component {...pageProps} />
                    {nftList ? <BackgroundPostList /> : <Background />}
                  </ThemeProvider>
                </ContextManagerProvider>
              </FirebaseContextProvider>
            </CeramicContextProvider>
          </WalletContextProvider>
        </AlertContextProvider>
      </CacheProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
