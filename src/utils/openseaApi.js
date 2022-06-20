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
    (nft) => nft.owner.address.toString().toUpperCase() === address.toString().toUpperCase() && nft.asset_contract.schema_name === "ERC721"
  );

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
