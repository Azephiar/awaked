import { useState, useEffect, useContext, createContext } from "react";

import { CeramicClient } from "@ceramicnetwork/http-client";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import { DID } from "dids";
import { getResolver as getKeyResolver } from "key-did-resolver";
import { getResolver as get3IDResolver } from "@ceramicnetwork/3id-did-resolver";

import { ThreeIdConnect } from "@3id/connect";

import { TileDocument } from "@ceramicnetwork/stream-tile";

import postAliases from "../../../models/post-model.json";
import postListAliases from "../../../models/posts-list-model.json";
import { TileLoader } from "@glazed/tile-loader";
import { getNftDataFromNftDid } from "../../utils/utils";
import { getNftAssetsFromOpensea } from "../../utils/openseaApi";
import {
  saveUserDidToLocalStorage,
  getUserDidFromLocalStorage,
  userDIDCacheExists,
} from "./LocalStorageManager";

import { WalletContext } from "./WalletContext";

export const CeramicContext = createContext({
  ceramic: {},
  model: {},
  store: {},
  is3IDConnected: () => false,
  is3IDConnecting: false,
  connectWith3ID: async (web3ModalInstance) => {},
  getAwakedPostListFromFirebasePostList: async (firebasePostList) => {},
  newPost: async () => {},
});

export const CeramicContextProvider = (props) => {
  const [authenticatedDID, setAuthenticatedDID] = useState();
  const [is3IDConnecting, setIs3IDConnecting] = useState(false);
  const wallet = useContext(WalletContext);

  const ceramic = new CeramicClient(process.env.NEXT_PUBLIC_CERAMIC_API_URL);
  const model = new DataModel({ ceramic, model: postListAliases });
  const store = new DIDDataStore({ ceramic, model });
  const loader = new TileLoader({ ceramic });

  useEffect(() => {
    const connectIfUserHasConnectedBefore = async () => {
      if (userDIDCacheExists()) {
        connectWith3ID();
      }
    };

    connectIfUserHasConnectedBefore();
  }, [wallet?.authProvider]);

  //3ID connection
  async function connectWith3ID() {
    if (!wallet?.authProvider) return;

    setIs3IDConnecting(true);
    const threeID = new ThreeIdConnect();

    await threeID.connect(wallet.authProvider);

    const did = new DID({
      provider: threeID.getDidProvider(),
      resolver: {
        ...get3IDResolver(ceramic),
        ...getKeyResolver(),
      },
    });

    await did.authenticate();
    saveUserDidToLocalStorage(true);
    setAuthenticatedDID(did);
    setIs3IDConnecting(false);
  }

  const is3IDConnected = () => {
    return authenticatedDID !== undefined;
  };

  const getPostList = async (nftDID) => {
    return await store.get("myPostsList", nftDID);
  };

  const newPost = async (text, timestamp, nftDID) => {
    await ceramic.setDID(authenticatedDID);
    const postStream = await TileDocument.create(
      ceramic,
      { text: text, timestamp: timestamp },
      {
        controllers: [nftDID],
        schema: postAliases.schemas.AwakedPost,
      }
    );

    //Get tile document streamID
    const postStreamID = postStream.id;

    //Get the current 'myPostList' document controlled by nftDID
    let currentPostsList = await getPostList(nftDID);

    let newPostArray = [];

    if (currentPostsList && currentPostsList.posts instanceof Array) {
      newPostArray = currentPostsList.posts;
    }

    //Create a new array with posts list
    newPostArray.push({ id: postStreamID.toUrl() });

    //Save the new lists of posts
    const postListStreamID = await store.set(
      "myPostsList",
      { posts: newPostArray },
      { controller: nftDID }
    );

    return { postListStreamID, postStreamID };
  };

  //1) Use a firebase post list (firebasePostList)
  //2) Fetch from IDX all of the documents in the firebase.postList and sanitize the data
  //3) Fetch NFT data (image, address, symbol, etc) from opensea
  //4) Merge the ceramic data about the posts with the opensea data about NFTs

  //TODO: create Post class to manage posts around the app
  const getAwakedPostListFromFirebasePostList = async (firebasePostList) => {
    //(2) Fetch from IDX all the documents in the firebase.postList and sanitize the data
    let loaders = [];

    firebasePostList.forEach((post) =>
      loaders.push(loader.load(post.postStreamUrl))
    );

    const postList = await Promise.all(loaders);
    console.log("postList", postList);

    let dids = [];
    let posts = [];

    postList.forEach((postTileDocument) => {
      let did = postTileDocument.controllers[0];

      dids.push(did);

      let { chain, address, tokenId } = getNftDataFromNftDid(did);

      posts.push({
        text: postTileDocument.content.text,
        controller: postTileDocument.controllers[0],
        timestamp: postTileDocument.content.timestamp,
        contract_address: address,
        token_id: tokenId,
        chain: chain,
      });
    });

    //3) Fetch NFT data (image, address, symbol, etc) from opensea
    let assets = await getNftAssetsFromOpensea(dids);

    assets.forEach((nft) => {
      if (
        nft.asset_contract.address ==
        "0xc78e3b835cba2313b95420d8157972c22ff1750f"
      ) {
        if (nft.token_id == "0") {
          nft.image_url =
            "https://gateway.pinata.cloud/ipfs/QmSwGHG5VG8EPwZMuhLLt83WQYD6rC7sarK5iKW6wByhs9/1.png";
        }

        if (nft.token_id == "1") {
          nft.image_url =
            "https://gateway.pinata.cloud/ipfs/QmSwGHG5VG8EPwZMuhLLt83WQYD6rC7sarK5iKW6wByhs9/2.png";
        }

        if (nft.token_id == "2") {
          nft.image_url =
            "https://gateway.pinata.cloud/ipfs/QmSwGHG5VG8EPwZMuhLLt83WQYD6rC7sarK5iKW6wByhs9/3.png";
        }

        if (nft.token_id == "3") {
          nft.image_url =
            "https://gateway.pinata.cloud/ipfs/QmSwGHG5VG8EPwZMuhLLt83WQYD6rC7sarK5iKW6wByhs9/4.png";
        }

        if (nft.token_id == "4") {
          nft.image_url =
            "https://gateway.pinata.cloud/ipfs/QmSwGHG5VG8EPwZMuhLLt83WQYD6rC7sarK5iKW6wByhs9/5.png";
        }
      }
    });

    //4) Merge the ceramic data about the posts with the opensea data about NFTs
    let mergedPosts = [];
    posts.forEach((post) => {
      assets.forEach((asset) => {
        if (
          post.token_id == asset.token_id &&
          post.contract_address == asset.asset_contract.address
        ) {
          post.image_url = asset.image_url;
          post.symbol = asset.asset_contract.symbol;
          mergedPosts.push(post);
        }
      });
    });

    return mergedPosts;
  };

  const value = {
    ceramic,
    store,
    model,
    is3IDConnected,
    is3IDConnecting,
    connectWith3ID,
    getAwakedPostListFromFirebasePostList,
    newPost,
  };

  return (
    <CeramicContext.Provider value={value}>
      {props.children}
    </CeramicContext.Provider>
  );
};
