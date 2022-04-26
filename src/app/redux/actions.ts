import {
  SET_TOKEN,
  SET_CURRENT_WALLET,
  SET_USER_INFO,
  SET_WALLET_BALANCE,
  SET_ERROR,
  GET_USER_INFO,
  GET_USER_WALLETS,
  SET_USER_WALLETS,
  SET_CURRENCIES,
  LOGOUT,
  SET_TOAST,
  SET_USER_HISTORY,
  CONNECT_WALLET,
  SET_NETWORK_INFO,
  SET_USER_WALLET,
  GET_NETWORK_INFO,
  SET_APP_LOADING,
  SET_APP_POPUP,
  SET_WALLET_PROVIDER,
} from './constants';
import {
  UserInfo,
  GlobalError,
  UserWallet,
  Currency,
  Toast,
  UserHistory,
  SetWalletBalance,
  NetworkInfo,
} from '../appTypes';
import { action } from 'typesafe-actions';

export const setToast = (value: Toast) => action(SET_TOAST, value);
export const setToken = (value: string | null) => action(SET_TOKEN, value);
export const setAppLoading = (value: boolean) => action(SET_APP_LOADING, value);
export const setAppPopup = (value: string) => action(SET_APP_POPUP, value);
export const setWalletProvider = (value: any) =>
  action(SET_WALLET_PROVIDER, value);

export const setCurrentWallet = (value: UserWallet) =>
  action(SET_CURRENT_WALLET, value);

export const setUserInfo = (value: UserInfo) => action(SET_USER_INFO, value);
export const getUserInfo = () => action(GET_USER_INFO);

export const setUserHistory = (value: UserHistory[]) =>
  action(SET_USER_HISTORY, value);

export const setWalletBalance = (value: SetWalletBalance) =>
  action(SET_WALLET_BALANCE, value);

export const setError = (value: GlobalError) => action(SET_ERROR, value);

export const getUserWallets = () => action(GET_USER_WALLETS);
export const setUserWallets = (value: UserWallet[]) =>
  action(SET_USER_WALLETS, value);

export const setCurrencies = (value: Currency[]) =>
  action(SET_CURRENCIES, value);

export const logout = () => action(LOGOUT);

export const connectWallet = (walletProvider: string, isMobile: boolean) =>
  action(CONNECT_WALLET, { walletProvider, isMobile });

export const setUserWallet = (value: string) => action(SET_USER_WALLET, value);

export const getNetworkInfo = () => action(GET_NETWORK_INFO);
export const setNetworkInfo = (value: NetworkInfo | undefined) =>
  action(SET_NETWORK_INFO, value);
