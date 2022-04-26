import { NetworkInfo, Toast } from 'app/appTypes';
import { GameLimitsRes } from 'app/pages/GamePage/types';
import { globalEthers } from './staticFuncWeb3';

declare let window;

export const IS_DEV =
  process.env.REACT_APP_ENV === 'local' ||
  process.env.REACT_APP_ENV === 'dev' ||
  process.env.REACT_APP_ENV === 'staging';

export const IS_PROD = process.env.REACT_APP_ENV === 'prod';

export const MAINET_CHAIN_CONFIG = {
  chainId: 137,
  chainName: 'Polygon Mainnet',
  symbol: 'MATIC',
  rpcUrls: ['https://polygon-rpc.com'],
  blockExplorerUrls: ['https://polygonscan.com'],
  slip44CoinId: 966,
};

export const TESTNET_CHAIN_CONFIG = {
  chainId: 80001,
  chainName: 'Polygon Testnet',
  symbol: 'MATIC',
  rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  slip44CoinId: 966,
};

export const APP_CHAIN_CONFIG = IS_PROD
  ? MAINET_CHAIN_CONFIG
  : TESTNET_CHAIN_CONFIG;

export const LIST_LANGUAGE = [
  { value: 'en', name: 'EN: English' },
  { value: 'es', name: 'ES: Spanish' },
  { value: 'zh', name: 'ZH: Chinese' },
];

export const checkDefaultLang = (lang: string) => {
  if (!lang) return 'en';

  const exist = LIST_LANGUAGE.find(x => x.value === lang);
  return exist ? lang : 'en';
};

export const APP_TITLE = 'Funarcade';

export const HEADER_HEIGHT = 60;
export const PADDING_GAMEPAGE = 16;
export const TRANSITION_TIME = 0.3;

export const MOBILE_QUERY = `(max-width: 768px)`;

export const HIDE_AUTOBET_LS_NAME = 'hide_autobet_confirm';

export const WITH_CREDENTIALS_SOCKET = process.env.REACT_APP_ENV === 'prod';
export const SOCKET_TIMEOUT = 10000;

export const CALLBACK_ROUTE = '/callback';
const ROUTES_HIDE_HEADER = [CALLBACK_ROUTE, '/chat'];

// check pathname exact '/aaa' or all remaining path '/bbb/*'
const isInRoute = (pathName: string, routes: string[]) =>
  Boolean(
    routes.find(x => {
      if (x.endsWith('*')) return new RegExp(x).test(pathName);
      else return x === pathName;
    }),
  );

export const isHideHeader = (pathName: string) =>
  isInRoute(pathName, ROUTES_HIDE_HEADER);

export const clearAllLS = () => {
  if (window) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('prev_pathname');
    localStorage.removeItem('web3_provider');
  }
};

export const formatAmount = (value: number | string | undefined) => {
  const num = Number(value);
  return typeof num === 'number'
    ? num % 1 !== 0
      ? num.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : num.toLocaleString()
    : '';
};

export const AUTHEN_SCOPE = 'openid offline_access profile email wallet';
export const CLIENT_ID = 'local-client';
export const LOGIN_URL = `${process.env.REACT_APP_IDENTITY_ENDPOINT}/authorize?client_id=${CLIENT_ID}&client_secret=secret&grant_type=authorization_code&scope=${AUTHEN_SCOPE}&redirect_uri=${process.env.REACT_APP_CALLBACK_ENDPOINT}&response_type=code&prompt=login`;

export const clickLoginCommon = () => {
  localStorage.setItem('prev_pathname', window.location.pathname);
  window.location.href = LOGIN_URL;
};

export const emitCustomEvent = (name, data) => {
  const event = new CustomEvent(name, {
    detail: data,
  });
  window.dispatchEvent(event);
};

export const animatedNumberOptions = {
  duration: 2000,
  decimals: 2,
  direct: true,
};

export const getUniqueListByKey = (arr: any[], key: string) => {
  return arr.filter((v, i, a) => a.findIndex(t => t[key] === v[key]) === i);
};

export const isIOSCheck = () => {
  return (
    (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    !window.MSStream
  );
};

export const isNotEmpty = (obj: object) =>
  obj && Object.values(obj).some(x => x?.[0]);

export const getMapLimits = (setting: GameLimitsRes) =>
  Object.keys(setting || {}).reduce((obj, key) => {
    obj[key] = {};
    obj[key].maxBet = +setting[key].maxbet;
    return obj;
  }, {});

export const openInNewTab = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const openInNewWindow = (url: string, width = 400, height = 400) => {
  window.open(
    url,
    'popupWindow',
    `width=${width}, height=${height}, left=100, top=100, resizable=1, scrollbars=1, toolbar=0, menubar=0, location0, directories=0, status=1`,
  );
};

export const dateStrFormat = (date: Date | string | undefined) => {
  if (!date) return '';
  const d = new Date(date);

  let year = '' + d.getFullYear(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();

  if (year.length < 4) {
    for (let i = year.length; i < 4; i++) {
      year = '0' + year;
    }
  } else if (year.length > 4) {
    year = year.slice(0, 4);
  }

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
};

export const timeStrFormat = (date: Date | string | undefined) => {
  if (!date) return '';
  const d = new Date(date);

  let hours = '' + d.getHours(),
    minutes = '' + d.getMinutes(),
    seconds = '' + d.getSeconds();

  if (minutes.length < 2) minutes = '0' + minutes;
  if (seconds.length < 2) seconds = '0' + seconds;

  return [hours, minutes, seconds].join(':');
};

export const ISOtoLocalDatetimeStr = (isoDate: string | undefined) => {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  return `${dateStrFormat(date)} - ${timeStrFormat(date)}`;
};

export const searchTextFilter = (text: string, str: string) =>
  text.toLowerCase().search(str.toLowerCase()) >= 0;

export const preventMinus = e => {
  if (e.code === 'Minus') {
    e.preventDefault();
  }
};

export const dateInputFormat = (d: Date) => {
  let year = '' + d.getFullYear(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();

  if (year.length < 4) {
    for (let i = year.length; i < 4; i++) {
      year = '0' + year;
    }
  } else if (year.length > 4) {
    year = year.slice(0, 4);
  }

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const getSelectedWalletLS = () =>
  Number(localStorage.getItem('selected_wallet')) || 0;

export const spaceEvery2Char = (str: string) => {
  return str.match(/.{1,2}/g)?.join(' ') || str;
};

export const blockchainError = error => {
  let toast: Toast;
  switch (error?.code) {
    case 4001:
      toast = {
        msg: `Rejected`,
        type: 'warn',
      };
      break;
    case -32002:
      toast = {
        msg: `Another request is pending`,
        type: 'warn',
      };
      break;
    case 'INSUFFICIENT_FUNDS':
      toast = {
        msg: `Balance is not enough`,
        type: 'warn',
      };
      break;
    default:
      toast = {
        msg: error?.message || 'Somthing went wrong',
        type: 'error',
      };
  }
  return toast;
};

export const validNetwork = (network: NetworkInfo | undefined) =>
  Number(network?.chainId) === APP_CHAIN_CONFIG.chainId;

interface SwitchChainProps {
  chainId: number;
  chainName: string;
  symbol: string;
  rpcUrls: string[];
  blockExplorerUrls: string[];
}
export const switchChain = ({
  chainId,
  chainName,
  symbol,
  rpcUrls,
  blockExplorerUrls,
}: SwitchChainProps) => {
  globalEthers?.provider?.request?.({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: '0x' + chainId.toString(16),
        chainName,
        nativeCurrency: {
          symbol,
          decimals: 18,
        },
        rpcUrls,
        blockExplorerUrls,
      },
    ],
  });
};

export const switchExistedChain = async (chainId: number) => {
  globalEthers?.provider?.request?.({
    method: 'wallet_switchEthereumChain',
    params: [
      {
        chainId: '0x' + chainId.toString(16),
      },
    ],
  });
};

export const switchToAppNetwork = () => {
  switchChain(APP_CHAIN_CONFIG);
};

export const getMetamaskProvider = () =>
  window.ethereum?.providers?.find(x => x?.isMetaMask) ||
  (window.ethereum?.isMetaMask ? window.ethereum : null);
export const getTrustWalletProvider = () =>
  window.ethereum?.providers?.find(x => x?.isTrust) ||
  (window.ethereum?.isTrust ? window.ethereum : null);
export const getCoinbaseProvider = () =>
  window.ethereum?.providers?.find(x => x?.isCoinbaseWallet) ||
  (window.ethereum?.isCoinbaseWallet ? window.ethereum : null);
