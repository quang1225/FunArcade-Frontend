import { ethers } from 'ethers';
import ChainListJson from './json/ChainListJson';
// import nftJson from 'utils/json/NFTCollection.json';
// import marketJson from 'utils/json/NFTMarketplace.json';

export let globalEthers: ethers.providers.Web3Provider | undefined;
export let nftContract: ethers.Contract | undefined;
export let marketContract: ethers.Contract | undefined;

// export const nftAbi = nftJson.abi;
// export const marketAbi = marketJson.abi;

export const initGlobalEthers = provider => {
  globalEthers = new ethers.providers.Web3Provider(provider, 'any');
};

export const destroyEthers = () => {
  globalEthers = undefined;
};

export const loadContract = async (abi, address: string) => {
  if (!abi || !address) return;

  const instantContracts = new ethers.Contract(
    address,
    abi,
    globalEthers?.getSigner(),
  );
  return instantContracts;
};

export const getAccounts = async () =>
  globalEthers?.listAccounts ? globalEthers.listAccounts() : [];

export const toWei = (price: number) => {
  let priceStr = price + '';
  priceStr = priceStr.includes('e')
    ? price.toFixed(+priceStr.split('-')[1])
    : priceStr;
  return ethers.utils.parseUnits(priceStr, 'ether');
};

export const toAscii = (data: string) => {
  return ethers.utils.toUtf8String(data);
};

// export const initDefaultContract = async () => {
//   nftContract = await loadDefaultNFTContract();
//   marketContract = await loadDefaultMarketContract();
// };

// export const requireApproveRole = async (
//   marketContract,
//   nftAbi,
//   userWallet: string,
//   nftAddress: string,
// ) => {
//   // Load abi ERC721Full
//   const instance = await loadContract(nftAbi, nftAddress);

//   if (
//     await instance?.isApprovedForAll(userWallet, marketContract.options.address)
//   ) {
//     return true;
//   }

//   return await instance?.setApprovalForAll(
//     marketContract.options.address,
//     true,
//   );
// };

// export const requireApproveToken = async (
//   tokenId: number,
//   nftAddress: string,
// ) => {
//   const marketAddress = marketContract?.address;

//   // Need to load dynamic nft contract cause it can be import from another platform
//   const nftInstance: ethers.Contract | undefined = await loadCollectionContract(
//     nftAddress,
//   );
//   const address = await nftInstance?.getApproved(tokenId);
//   if (address === marketAddress) {
//     return true;
//   }

//   const transition = await nftInstance?.approve(marketAddress, tokenId);
//   if (!transition?.hash) return false;

//   const rs = await transition.wait();
//   return rs;
// };

// const loadDefaultNFTContract = async () => {
//   const instantContracts = await loadContract(
//     nftAbi,
//     process.env.REACT_APP_NFT_CONTRACT_ADDRESS as string,
//   );
//   return instantContracts;
// };
// const loadDefaultMarketContract = async () => {
//   const instantContracts = await loadContract(
//     marketAbi,
//     process.env.REACT_APP_MARKET_CONTRACT_ADDRESS as string,
//   );
//   return instantContracts;
// };

export const jsonNetwork = (chainId: number | undefined) =>
  chainId ? ChainListJson.find(x => x.chainId === chainId) : undefined;

export const getNetworkInfoWeb3 = async () => {
  const networkData = await globalEthers?.getNetwork();
  const networkInfo = jsonNetwork(networkData?.chainId);
  return networkInfo;
};

// export const getAccInfoWeb3 = async (userWallet: string) => {
//   const accInfo = {} as AccInfo;
//   if (userWallet) {
//     accInfo.balance = globalEthers
//       ? Number(await globalEthers?.getBalance(userWallet))
//       : 0;
//     accInfo.balanceStr = (accInfo.balance / 1000000000000000000).toFixed(4);
//   }
//   return accInfo;
// };

export const hexToAscii = (hex: string) => {
  let str = '';
  for (let i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
};
