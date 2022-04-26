import produce from 'immer';
import {
  SET_TOKEN,
  SET_USER_INFO,
  SET_WALLET_BALANCE,
  SET_ERROR,
  SET_USER_WALLETS,
  SET_CURRENCIES,
  SET_CURRENT_WALLET,
  SET_TOAST,
  SET_USER_HISTORY,
  SET_NETWORK_INFO,
  SET_USER_WALLET,
  SET_APP_LOADING,
  SET_APP_POPUP,
  SET_WALLET_PROVIDER,
} from './constants';
import {
  AppState,
  AppAction,
  UserInfo,
  GlobalError,
  Toast,
  Currency,
  UserWalletRes,
} from 'app/appTypes';

export const initialState: AppState = {
  token: '',
  appPopup: '',
  appLoading: false,
  walletProvider: undefined,
  currentWallet: {
    walletObj: {} as UserWalletRes,
    currencyObj: {} as Currency,
  },
  userInfo: {} as UserInfo,
  userWallets: [],
  currencies: [],
  error: {} as GlobalError,
  toastAlert: {} as Toast,
  userHistory: [],
  userWallet: '',
  networkInfo: undefined,
};

const AppReducer = (state: AppState = initialState, action: AppAction) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_TOAST:
        draft.toastAlert = action.payload;
        break;
      case SET_TOKEN:
        draft.token = action.payload;
        break;
      case SET_APP_POPUP:
        draft.appPopup = action.payload;
        break;
      case SET_APP_LOADING:
        draft.appLoading = action.payload;
        break;
      case SET_WALLET_PROVIDER:
        draft.walletProvider = action.payload;
        break;
      case SET_CURRENT_WALLET:
        draft.currentWallet = action.payload;
        break;
      case SET_USER_INFO:
        draft.userInfo = action.payload;
        break;
      case SET_USER_WALLETS:
        draft.userWallets = action.payload;
        break;
      case SET_CURRENCIES:
        draft.currencies = action.payload;
        break;
      case SET_USER_HISTORY:
        draft.userHistory = action.payload;
        break;
      case SET_WALLET_BALANCE:
        let tempUpdatedWallet = draft.userWallets.find(
          x => x.walletObj.id === action.payload.walletId,
        );
        if (tempUpdatedWallet) {
          tempUpdatedWallet.walletObj.balance = action.payload.balance;
        }

        break;
      case SET_ERROR:
        draft.error = action.payload;
        break;
      case SET_USER_WALLET:
        draft.userWallet = action.payload;
        break;
      case SET_NETWORK_INFO:
        draft.networkInfo = action.payload;
        break;
    }
  });

export default AppReducer;
