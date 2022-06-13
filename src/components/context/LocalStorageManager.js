export const saveUserDidToLocalStorage = (userDid) => {
  setItem("UserDid", userDid);
};

export const getUserDidFromLocalStorage = () => {
  return getItem("UserDid");
};

export const saveNFTDidToLocalStorage = (nftDid) => {
  setItem("NFTDid", nftDid);
};

export const getNFTDidFromLocalStorage = () => {
  return getItem("NFTDid");
};

export const saveNFTDataToLocalStorage = (nftData) => {
  setItem("NFTData", nftData);
};

export const getNFTDataFromLocalStorage = () => {
  return getItem("NFTData");
};

export const deleteNFTLocalCache = () => {
  deleteItem("NFTData");
  deleteItem("NFTDid");
  deleteItem("UserDid");
  deleteItem("WEB3_CONNECT_CACHED_PROVIDER");

  localStorage.clear();
};

export const NFTCacheExists = () => {
  let nftDid = getNFTDidFromLocalStorage();
  let nftData = getNFTDataFromLocalStorage();
  return nftDid && nftData;
};

export const userDIDCacheExists = () => {
  let userDid = getUserDidFromLocalStorage();
  return !!userDid;
};

const setItem = (key, value) => {
  if (!localStorage) return undefined;

  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  if (!localStorage) return undefined;

  return JSON.parse(localStorage.getItem(key));
};

const deleteItem = (key) => {
  if (!localStorage) return undefined;

  localStorage.removeItem(key);
};
