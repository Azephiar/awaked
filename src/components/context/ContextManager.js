import { useState, useEffect, useContext, createContext } from "react";
import { createNftDidUrl } from "nft-did-resolver";
import { fetchNftsOf } from "../../utils/openseaApi";
import { getNFTDidFromLocalStorage, saveNFTDidToLocalStorage, getNFTDataFromLocalStorage, saveNFTDataToLocalStorage } from "./LocalStorageManager";
import { WalletContext } from "./WalletContext";
import { FirebaseContext } from "./FirebaseContext";
import { CeramicContext } from "./CeramicContext";

export const ContextManager = createContext({
  deactivateConnector: async (connector) => {},
  setNFTDIDOf: async () => {},
  createNewPost: async (text) => {},
  isLoadingNftList: false,
  nftList: [],
  nftData: {},
  nftDID: {},
});

export const ContextManagerProvider = (props) => {
  const wallet = useContext(WalletContext);
  const firebase = useContext(FirebaseContext);
  const ceramic = useContext(CeramicContext);

  //Select NFT page data
  const [address, setAddress] = useState();
  const [nftList, setNftList] = useState();
  const [nftDID, setNftDID] = useState();
  const [nftData, setNftData] = useState();
  const [isLoadingNftList, setIsLoadingNftList] = useState(false);

  useEffect(() => {
    const getNftDidCache = async () => {
      const _nftDid = await getNFTDidFromLocalStorage();
      const _nftData = await getNFTDataFromLocalStorage();

      if (_nftDid) {
        setNftDID(_nftDid);
      }

      if (_nftData) {
        setNftData(_nftData);
      }
    };
    getNftDidCache();
  }, []);

  //Handles connected address NFT list
  useEffect(() => {
    const setupNftList = async () => {
      setIsLoadingNftList(true);
      const nftList = await fetchNftsOf(wallet.address);
      setNftList(nftList);
      setIsLoadingNftList(false);
    };

    if (!wallet?.address) {
      return;
    }

    setupNftList();
  }, [wallet.address]);

  useEffect(() => {
    if (!firebase?.postList) {
      return;
    }
  }, [firebase.postList]);

  //Set the NFT did
  const setNFTDIDOf = async (nft) => {
    let nftDid = createNftDidUrl({
      chainId: "eip155:4",
      namespace: "erc721",
      contract: nft.asset_contract.address,
      tokenId: nft.token_id,
    });

    //Fix lengths if too long
    if (nft.asset_contract.symbol.length > 10) {
      nft.asset_contract.symbol = nft.asset_contract.symbol.substring(10) + "...";
    }

    if (nft.token_id.length > 5) {
      nft.token_id = nft.token_id.substring(5) + "...";
    }

    setNftDID(nftDid);
    setNftData(nft);
    saveNFTDidToLocalStorage(nftDid);
    saveNFTDataToLocalStorage(nft);
  };

  const value = {
    address,
    nftList,
    nftDID,
    nftData,
    isLoadingNftList,
    setNFTDIDOf,
  };

  return <ContextManager.Provider value={value}>{props.children}</ContextManager.Provider>;
};
