import { BigNumber, ethers } from "ethers";
import { Constants } from "./constants";

export const timeDifference = (timestamp) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = new Date() - new Date(timestamp);

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + "s ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + "m ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "h ago";
  } else {
    return Math.round(elapsed / msPerDay) + "d ago";
  }
};

export const getNftDataFromNftDid = (nftDID) => {
  let splitDID = nftDID.split(":");
  let chain = splitDID[3].split("_")[0];
  let address = splitDID[4].split("_")[0];
  let tokenId = splitDID[4].split("_")[1];

  return { chain, address, tokenId };
};

//Removes scientic notation
//Copy-pasted from stackoverflow, I have 0 clue on how/why this works.
export const toPlainString = (num) => {
  return ("" + +num).replace(
    /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function (a, b, c, d, e) {
      return e < 0
        ? b + "0." + Array(1 - e - c.length).join(0) + c + d
        : b + c + d + Array(e - d.length + 1).join(0);
    }
  );
};

BigNumber.prototype.toETH = function (decimals) {
  decimals = typeof decimals === "undefined" ? 2 : decimals;
  let res = ethers.utils.formatEther(this.toString());
  res = Math.floor(res * 10 ** decimals) / 10 ** decimals;
  return toPlainString(res);
};
export const getGradientString = (color1, color2, degrees) => {
  degrees = degrees ? degrees : "45deg";
  if (color1 && color2) {
    return (
      "linear-gradient(" + degrees + ", " + color1 + " 0%, " + color2 + " 150%)"
    );
  }

  return Constants.GRADIENT;
};

export const getColorsFromAddress = (address) => {
  let colorA = "#b5ead7";
  let colorB = "#ff9aa2";

  if (address) {
    let base = address.substring(0, 8).toUpperCase();
    colorA = "#" + base.substring(2);
    colorB = invertColor(colorA);
  }
  return { colorA, colorB };
};

export const getGradientStringFromAddress = (address, opacity) => {
  let { colorA, colorB } = getColorsFromAddress(address);
  opacity = opacity ? opacity : "07";
  colorA += opacity;
  colorB += opacity;

  return getGradientString(colorA, colorB);
};

export const invertColor = (hex) => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
};

const padZero = (str, len) => {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
};
