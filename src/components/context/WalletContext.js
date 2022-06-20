import { useState, useEffect, useContext, createContext } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { EthereumAuthProvider } from "@3id/connect";
import { Configuration } from "../../utils/constants";
import { AlertContext } from "./AlertContext";

const providerOptions = {
  injected: {
    package: null,
    network: Configuration.network,
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: Configuration.infura_id, // required
    },
    network: Configuration.network,
  },
};

const web3ModalConfig = {
  network: Configuration.network, // optional
  cacheProvider: true, // optional
  providerOptions, // required
  theme: {
    background: "rgb(39, 49, 56)",
    main: "rgb(199, 199, 199)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(195, 195, 195, 0.14)",
    hover: "rgb(16, 26, 32)",
  },
};

export const WalletContext = createContext({
  connect: async () => {},
  isConnected: () => false,
  deleteCache: async () => {},
  web3Modal: {},
  isConnecting: false,
  address: "",
  addresses: [],
  web3ModalInstance: {},
  authProvider: {},
});

export const WalletContextProvider = (props) => {
  const [web3Modal, setWeb3Modal] = useState();
  const [web3ModalInstance, setWeb3ModalInstance] = useState();
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();
  const [addresses, setAddresses] = useState([]);

  const [authProvider, setAuthProvider] = useState();
  const [isConnecting, setIsConnecting] = useState(false);

  const alert = useContext(AlertContext);

  useEffect(() => {
    let _web3Modal = new Web3Modal(web3ModalConfig);
    setWeb3Modal(_web3Modal);
  }, []);

  useEffect(() => {
    if (web3Modal?.cachedProvider && web3Modal?.cachedProvider != "walletconnect") {
      connect().catch((e) => {
        setIsConnecting(false);
        alert.show(e.message, "error");
      });
    }
  }, [web3Modal]);

  useEffect(() => {
    if (!web3ModalInstance) {
      return;
    }
    web3ModalInstance?.on("accountsChanged", (accounts) => {
      deleteCache();
    });

    web3ModalInstance?.on("chainChanged", (chainId) => {
      //console.log(chainId);
    });

    web3ModalInstance?.on("connect", (info) => {
      //console.log(info);
    });

    web3ModalInstance?.on("disconnect", (error) => {
      //console.log("disconnect", error);
    });
  }, [web3ModalInstance]);

  const isConnected = () => {
    return web3ModalInstance && authProvider;
  };

  //Wallet connection
  const connect = async () => {
    setIsConnecting(true);
    const _web3ModalInstance = await web3Modal.connect().catch((e) => {
      setIsConnecting(false);
      throw e;
    });
    const _provider = new ethers.providers.Web3Provider(_web3ModalInstance);
    const _signer = _provider.getSigner();
    const _address = await _signer.getAddress();
    const _addresses = await _web3ModalInstance.enable();
    const _authProvider = new EthereumAuthProvider(_web3ModalInstance, _addresses[0]);

    setAuthProvider(_authProvider);
    setWeb3ModalInstance(_web3ModalInstance);
    setProvider(_provider);
    setSigner(_signer);
    setAddress(_address);
    setAddresses(_addresses);
    setIsConnecting(false);
  };

  const deleteCache = async () => {
    await web3Modal?.clearCachedProvider();
    setWeb3ModalInstance();
    setAuthProvider();
  };

  const value = {
    connect,
    isConnected,
    address,
    addresses,
    web3ModalInstance,
    authProvider,
    web3Modal,
    isConnecting,
    deleteCache,
  };

  return <WalletContext.Provider value={value}>{props.children}</WalletContext.Provider>;
};
