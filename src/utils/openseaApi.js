import axios from "axios";
import { getNftDataFromNftDid } from "./utils";
import { Configuration } from "./constants";
const headers = {
  Accept: "application/json",
  // "X-API-KEY": "9f1513b28e2b4b49b839322bd3a1864a",
};
export const fetchNftsOf = async (address) => {
  let url = "https://api.opensea.io/api/v1/assets";
  if (Configuration.network == "rinkeby") {
    url = "https://rinkeby-api.opensea.io/api/v1/assets";
  }
  const options = {
    method: "GET",
    url: url,
    params: {
      owner: address,
      order_by: "pk",
      order_direction: "desc",
      limit: "20",
      offset: "0",
    },
    headers: headers,
  };

  let response = await axios.request(options);

  let nftArray = response.data.assets.filter(
    (nft) =>
      nft.owner.address.toString().toUpperCase() ===
        address.toString().toUpperCase() &&
      nft.asset_contract.schema_name === "ERC721" &&
      nft.asset_contract.address !==
        "0x77fcb14e95e0142b777b3d7f883d755e130b929e" &&
      nft.asset_contract.address !==
        "0x969b81ff628b0d2ba759d9f671e1549e8b599950"
  );

  nftArray.forEach((nft) => {
    if (
      nft.asset_contract.address == "0xc78e3b835cba2313b95420d8157972c22ff1750f"
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

  return nftArray;
};

export const getNftAssetsFromOpensea = async (dids) => {
  let tokenIds = "";
  let contractAddresses = "";

  let url = "https://api.opensea.io/api/v1/assets?";

  if (Configuration.network == "rinkeby") {
    url = "https://rinkeby-api.opensea.io/api/v1/assets?";
  }

  for (var i in dids) {
    let did = dids[i];
    let { _, address, tokenId } = getNftDataFromNftDid(did);

    tokenIds += "token_ids=" + tokenId + "&";
    contractAddresses += "asset_contract_addresses=" + address;

    if (i < dids.length - 1) {
      contractAddresses += "&";
    }
  }

  const options = {
    method: "GET",
    url: url + tokenIds + contractAddresses,
    params: {
      order_by: "pk",
      order_direction: "desc",
      limit: "20",
      offset: "0",
    },
    headers: headers,
  };

  let response = await axios.request(options);

  let nftArray = response.data.assets;
  return nftArray;
};
