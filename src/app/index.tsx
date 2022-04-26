import HomePage from './pages/HomePage/Loadable';
import NotFoundPage from './pages/NotFoundPage/Loadable';
import GameListPage from './pages/GameListPage/Loadable';
import UserPage from './pages/UserPage/Loadable';
import CallbackRoute from './components/CallbackRoute/Loadable';
import Header from './components/Header/Loadable';
import ChatPage from './pages/GamePage/ChatPage/Loadable';

import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import appReducer from 'app/redux/reducer';
import appSaga from 'app/redux/sagas';
import { useInjectReducer, useInjectSaga } from '../utils/redux-injectors';
import { APP_TITLE, CALLBACK_ROUTE, MOBILE_QUERY } from 'utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAppLoading,
  selectToastAlert,
  selectWalletProvider,
} from 'app/redux/selectors';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  connectWallet,
  getNetworkInfo,
  setToast,
  setUserWallet,
} from './redux/actions';
import { Backdrop, CircularProgress, useMediaQuery } from '@mui/material';
import { jsonNetwork } from 'utils/staticFuncWeb3';

const key = 'app';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  height: 100vh;
  flex-direction: column;

  .main-content {
    flex: 1 1 auto;
    position: relative;
    overflow-y: auto;
  }
`;

export function App() {
  useInjectReducer({ key, reducer: appReducer });
  useInjectSaga({ key, saga: appSaga });

  const dispatch = useDispatch();
  const toastAlert = useSelector(selectToastAlert);
  const appLoading = useSelector(selectAppLoading);
  const walletProvider = useSelector(selectWalletProvider);
  const { i18n } = useTranslation();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts?.[0]) {
      dispatch(setToast({ msg: 'Account connected', type: 'success' }));
      const currentWallet = accounts[0];
      dispatch(setUserWallet(currentWallet));
    } else {
      // No connect yet or Disconnect
      dispatch(setToast({ msg: 'Disconnected', type: 'success' }));
      // dispatch(logoutUser());
    }
  };

  const handleChainChanged = (chainId: number) => {
    const networkInfo = jsonNetwork(Number(chainId));
    dispatch(
      setToast({
        msg: (
          <>
            Switched to <strong>{networkInfo?.name}</strong> network
          </>
        ),
        type: 'success',
      }),
    );
    dispatch(getNetworkInfo());
  };

  useEffect(() => {
    if (toastAlert && toast[toastAlert.type]) {
      toast[toastAlert.type](toastAlert.msg, {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: toastAlert.theme || 'colored',
      });
    }
  }, [toastAlert]);

  // init App
  useEffect(() => {
    const web3Provider = localStorage.getItem('web3_provider');
    // re-connect if User logged
    if (web3Provider) {
      dispatch(connectWallet(web3Provider, isMobile));
    }
  }, []);

  // Wallet Provider functions
  useEffect(() => {
    if (walletProvider) {
      dispatch(getNetworkInfo());

      // detect Wallet events
      if (walletProvider.on) {
        walletProvider.on('accountsChanged', handleAccountsChanged);
        walletProvider.on('chainChanged', handleChainChanged);
      }
    }

    return () => {
      walletProvider?.removeAllListeners?.();
    };
  }, [walletProvider]);

  return (
    <AppWrapper>
      <Helmet
        titleTemplate={`%s - ${APP_TITLE}`}
        defaultTitle={APP_TITLE}
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content={`A ${APP_TITLE} application`} />
      </Helmet>

      <Header />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={CALLBACK_ROUTE} element={<CallbackRoute />} />
          <Route path="user/*" element={<UserPage />} />
          <Route path="chat/*" element={<ChatPage />} />
          <Route path=":gameTypePath/*" element={<GameListPage />} />
          <Route path="" element={<NotFoundPage />} />
        </Routes>
      </div>

      <ToastContainer />

      <Backdrop open={appLoading} style={{ zIndex: 10000 }}>
        <CircularProgress style={{ color: 'white' }} />
      </Backdrop>

      <GlobalStyle />
    </AppWrapper>
  );
}
