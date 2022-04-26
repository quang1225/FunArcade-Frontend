import { ToastContent } from 'react-toastify';
import { ActionType } from 'typesafe-actions';
import { CrashHistoryExtraData } from './games/CrashGame/types';
import { WheelHistoryExtraData } from './games/WheelGame/types';
import * as actions from './redux/actions';

export interface AppState {
  token: string | null;
  appPopup: string;
  appLoading: boolean;
  walletProvider: any;
  currentWallet: UserWallet;
  userInfo: UserInfo;
  userWallets: UserWallet[];
  currencies: Currency[];
  error: GlobalError;
  toastAlert: Toast;
  userHistory: UserHistory[];
  userWallet: string;
  networkInfo: NetworkInfo | undefined;
}

export interface UserHistory {
  gameNumber: string;
  walletId: string;
  time: string;
  crash: number;
  listResult: number[];
  betAmount: number;
  userChoice: number;
  cashOut: number;
  cashOutAt: number | undefined;
  serverSeed: string;
  isJackpot: boolean;
  jackpotWinAmount: number;
  jackpotTotalAmount: number;
  extraGameData: WheelHistoryExtraData | CrashHistoryExtraData;
}

export interface Toast {
  msg: ToastContent;
  type: 'error' | 'success' | 'info' | 'warn' | 'default' | 'dark';
  theme?: 'light' | 'dark' | 'colored';
}

export interface UserInfo {
  username: string;
  id: string;
  email: string;
  name: string;
}
export interface GlobalError {
  message: string;
}
export type AppAction = ActionType<typeof actions>;
export interface userInfoRes {
  sub: string;
  preferred_username: string;
  name: string;
  email: string;
  email_verified: boolean;
}
export interface TokenData {
  id_token: string;
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  scope: string;
}
export interface GameProps {
  slug: string;
  name: string;
  url: string;
  icon: any;
  isSingle: boolean;
  cardImage: any;
  howToPlay: () => JSX.Element;
  howToPlayShort: () => JSX.Element;
  component: any;
  rightMenu: () => JSX.Element;
  historyHead: () => JSX.Element;
  historyBody: () => JSX.Element;
  overviewPF: () => JSX.Element;
  resultBox: (props: any) => JSX.Element;
  noControls?: boolean;
  hideExpandMenuMobile?: boolean;
  fullCanvasMobile?: boolean;
  gameRatio: number;
  isTest?: boolean;
  noBetButton?: boolean;
}

export interface ResultBoxProps {
  calResult: number;
}

export interface Currency {
  id: number;
  name: string;
  shortname: string;
  sign: string;
  exchangeRate: number;
  createdAt: string;
  updatedAt: string;
}
export interface UserWalletRes {
  id: string;
  userId: string;
  merchantId: string;
  currencyId: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}
export interface UserWallet {
  walletObj: UserWalletRes;
  currencyObj: Currency;
}

export interface SetWalletBalance {
  walletId: string | undefined;
  balance: number;
}

export interface NetworkInfo {
  name: string;
  chain: string;
  network: string;
  icon?: string;
  rpc: string[];
  faucets: string[];
  nativeCurrency: NativeCurrency;
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44?: number;
  ens?: Ens;
  explorers?: Explorer[];
  parent?: Parent;
}

interface Parent {
  chain: string;
  type: string;
}

interface Explorer {
  name: string;
  url: string;
  standard: string;
  icon?: string;
}

interface Ens {
  registry: string;
}

interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}
