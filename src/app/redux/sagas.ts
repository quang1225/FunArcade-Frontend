import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  GET_USER_INFO,
  SET_USER_INFO,
  GET_USER_WALLETS,
  // SET_ERROR,
  LOGOUT,
  SET_CURRENCIES,
  SET_USER_WALLETS,
  SET_TOAST,
  SET_TOKEN,
  CONNECT_WALLET,
  SET_USER_WALLET,
  SET_NETWORK_INFO,
  GET_NETWORK_INFO,
  SET_WALLET_PROVIDER,
  SET_APP_POPUP,
} from './constants';
import {
  getUserInfoApi,
  getUserWalletsApi,
  getCurrenciesApi,
  // logout,
} from 'app/redux/apis';
import { selectToken } from './selectors';
import {
  userInfoRes,
  UserInfo,
  Currency,
  UserWallet,
  UserWalletRes,
  NetworkInfo,
} from 'app/appTypes';
import {
  APP_CHAIN_CONFIG,
  APP_TITLE,
  blockchainError,
  clearAllLS,
  getCoinbaseProvider,
  getMetamaskProvider,
  getTrustWalletProvider,
} from 'utils/constants';
import {
  SET_AUTO_BET,
  SET_AUTO_BET_LIST,
} from 'app/pages/GamePage/redux/constants';
import {
  destroyEthers,
  getAccounts,
  getNetworkInfoWeb3,
  initGlobalEthers,
} from 'utils/staticFuncWeb3';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

declare let window;

export default function* appSaga() {
  yield takeLatest(GET_USER_INFO, getUserInfoFunc);
  yield takeLatest(GET_USER_WALLETS, getUserWalletsFunc);
  yield takeLatest(LOGOUT, logoutFunc);
  yield takeLatest(CONNECT_WALLET, connectWalletFunc);
  yield takeLatest(GET_NETWORK_INFO, getNetworkInfoWeb3Func);
}

function* getUserInfoFunc() {
  try {
    const token = yield select(selectToken);
    const user: userInfoRes = (yield call(getUserInfoApi, token))?.data;

    // map user
    let userInfo = {} as UserInfo;
    userInfo.username = user?.preferred_username;
    userInfo.id = user?.sub;
    userInfo.email = user?.email;
    userInfo.name = user?.name;
    yield put({ type: SET_USER_INFO, payload: userInfo });
  } catch (e) {
    yield put({
      type: SET_TOAST,
      payload: { msg: 'Login fail', type: 'error' },
    });
  }
}

function* getUserWalletsFunc() {
  try {
    const token = yield select(selectToken);
    const userWallets: UserWalletRes[] = yield call(getUserWalletsApi, token);

    const currencies: Currency[] = (yield call(getCurrenciesApi, token))?.data;
    yield put({ type: SET_CURRENCIES, payload: currencies });

    const tokens = ['FAT', 'USDC'];

    let mappedWallets: UserWallet[] = [];

    mappedWallets = mappedWallets.concat(
      tokens.map(token => ({
        walletObj: {
          balance: 1000000,
        } as UserWalletRes,
        currencyObj: {
          shortname: token,
        } as Currency,
      })),
    );

    const tempWallet = userWallets.find(x => x.currencyId === 5);
    if (tempWallet) {
      mappedWallets.push({
        walletObj: tempWallet,
        currencyObj:
          currencies.find(y => y.id === tempWallet.currencyId) ||
          ({} as Currency),
      });
    }

    mappedWallets.sort(
      (a, b) =>
        a.currencyObj.shortname.localeCompare(b.currencyObj.shortname || '') ||
        0,
    );

    yield put({ type: SET_USER_WALLETS, payload: mappedWallets });
  } catch (e) {
    yield put({
      type: SET_TOAST,
      payload: { msg: 'Get wallets fail', type: 'error' },
    });
  }
}

function* logoutFunc() {
  try {
    // const token = yield select(selectToken);
    // const res = yield call(logout, token);
    yield put({
      type: SET_USER_INFO,
      payload: {} as UserInfo,
    });
    yield put({
      type: SET_AUTO_BET,
      payload: false,
    });
    yield put({
      type: SET_AUTO_BET_LIST,
      payload: [],
    });
    yield put({
      type: SET_TOKEN,
      payload: null,
    });
    yield put({ type: SET_USER_WALLET, payload: '' });
    yield put({ type: SET_WALLET_PROVIDER, payload: undefined });

    clearAllLS();
  } catch (e) {
    yield put({
      type: SET_TOAST,
      payload: { msg: 'Somthing went wrong !', type: 'error' },
    });
  }
}

function* connectWalletFunc(action) {
  try {
    const { walletProvider, isMobile } = action.payload;
    let provider;
    let accounts: string[] = [];

    // METAMASK
    if (walletProvider === 'metamask') {
      provider = getMetamaskProvider();
      if (provider) {
        accounts = yield call(provider.request, {
          method: 'eth_requestAccounts',
        });
      } else {
        if (isMobile) {
          return window.open(
            `https://metamask.app.link/dapp/${
              window.location.host + window.location.pathname
            }`,
            '_blank',
          );
        } else {
          return window.open('https://metamask.io/download.html', '_blank');
        }
      }
    }

    // COINBASE WALLET
    if (walletProvider === 'coinbase-wallet') {
      provider = getCoinbaseProvider();
      if (!provider) {
        const sdk = new CoinbaseWalletSDK({
          appName: APP_TITLE,
          appLogoUrl: '/favicon-32x32.png',
          darkMode: false,
        });
        provider = sdk.makeWeb3Provider(
          APP_CHAIN_CONFIG.rpcUrls[0],
          APP_CHAIN_CONFIG.chainId,
        );
      }

      accounts = yield call(provider.request, {
        method: 'eth_requestAccounts',
      });
    }

    // TRUST WALLET
    if (walletProvider === 'trust-wallet') {
      provider = getTrustWalletProvider();
      if (provider) {
        accounts = yield call(provider.request, {
          method: 'eth_requestAccounts',
        });
      } else {
        return window.open(
          `https://link.trustwallet.com/open_url?coin_id=${APP_CHAIN_CONFIG.slip44CoinId}&url=${window.location.href}`,
          '_blank',
        );
      }
    }

    if (!provider) {
      yield put({
        type: SET_TOAST,
        payload: { msg: 'Wallet Provider not found', type: 'error' },
      });
      return;
    }
    initGlobalEthers(provider);
    yield put({ type: SET_WALLET_PROVIDER, payload: provider });

    // try to get accounts by Ethers function
    if (!accounts?.[0]) {
      accounts = yield call(getAccounts);
      if (!accounts?.[0]) {
        yield put({
          type: SET_TOAST,
          payload: { msg: 'No account', type: 'error' },
        });
        return;
      }
    }

    const userWallet = accounts[0].toLowerCase();
    localStorage.setItem('web3_provider', walletProvider);
    yield put({ type: SET_USER_WALLET, payload: userWallet });

    yield put({ type: SET_APP_POPUP, payload: '' });
  } catch (error) {
    destroyEthers();
    yield put({ type: SET_WALLET_PROVIDER, payload: undefined });
    localStorage.removeItem('web3_provider');
    yield put({
      type: SET_TOAST,
      payload: blockchainError(error),
    });
  }
}

function* getNetworkInfoWeb3Func() {
  try {
    const networkInfo: NetworkInfo | undefined = yield call(getNetworkInfoWeb3);
    yield put({ type: SET_NETWORK_INFO, payload: networkInfo });
  } catch (e) {}
}
