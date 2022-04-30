import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LanguageSelect from 'app/components/LanguageSelect';
import NotificationList from 'app/components/NotificationList';
import RightArrow from 'app/components/icons/RightArrow';
import Close from 'app/components/icons/CloseIcon';
import CommonButton from 'app/components/common/CommonButton';
import CommonLink from 'app/components/common/CommonLink';
import CommonDialog from 'app/components/common/CommonDialog';
import CommonHr from 'app/components/common/CommonHr';
import CashierIcon from 'app/components/icons/CashierIcon';
import Logout from 'app/components/icons/Logout';
import DownArrow from 'app/components/icons/DownArrow';
import Popover from '@mui/material/Popover';
import Drawer from '@mui/material/Drawer';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import MultiplayerIcon from 'app/images/icons/multiplayer.svg';
import SinglePlayerIcon from 'app/images/icons/single-player.svg';
import ProvablyFairIcon from 'app/images/icons/provably-fair.svg';
import HomeIcon from 'app/images/icons/home-icon.svg';
import SearchIcon from 'app/images/icons/search-icon.svg';
import BellIcon from 'app/images/icons/bell-icon.svg';
import NoAvatar from 'app/images/no-avatar.png';
import {
  APP_CHAIN_CONFIG,
  APP_TITLE,
  AUTHEN_SCOPE,
  CALLBACK_ROUTE,
  clickLoginCommon,
  CLIENT_ID,
  getCoinbaseProvider,
  getMetamaskProvider,
  HEADER_HEIGHT,
  isHideHeader,
  MOBILE_QUERY,
  switchToAppNetwork,
  TRANSITION_TIME,
  validNetwork,
} from 'app/components/../../utils/constants';
import { MULTI_GAME_LIST, SINGLE_GAME_LIST } from 'utils/gameConfig';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
// import PKCE from 'js-pkce';
import {
  setToken,
  getUserInfo,
  setToast,
  logout,
  setAppPopup,
} from 'app/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  // selectUserInfo,
  selectToken,
  selectNetworkInfo,
  selectUserWallet,
  selectAppPopup,
  selectWalletProvider,
} from 'app/redux/selectors';
import globalAxios from 'app/components/../../utils/globalAxios';
import { AxiosRequestConfig } from 'axios';
import { TokenData } from 'app/appTypes';
import { Tooltip, useMediaQuery } from '@mui/material';
import WalletSelect from '../WalletSelect';
import TransactionIcon from '../icons/TransactionIcon';
import SettingIcon from '../icons/SettingIcon';
import YellowCoinIcon from '../icons/YellowCoinIcon';
import { USER_PATH } from 'app/pages/UserPage/UserLayout';
import CashierBtn from '../icons/CashierBtn';
import Cashier from '../Cashier';
import LoginSignup from '../LoginSignup';
import EllipsisText from '../EllipsisText';
// import CloseIcon from 'app/components/icons/CloseIcon';

// const clientId = 'local-client';
// const tokenUri = `${process.env.REACT_APP_IDENTITY_ENDPOINT}/token`;
// const authUri = `${process.env.REACT_APP_IDENTITY_ENDPOINT}/authorize`;
// const pkce = new PKCE({
//   client_id: clientId,
//   redirect_uri: process.env.REACT_APP_ROOT_DOMAIN,
//   authorization_endpoint: authUri,
//   token_endpoint: tokenUri,
//   requested_scopes: 'openid profile email address roles',
// });
// const loginUri = pkce.authorizeUrl();

const HeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  height: ${HEADER_HEIGHT}px;
  background-color: var(--global--background-color);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  padding: 0 24px;
  flex-direction: row;
  flex: 0 0 auto;

  .left-side {
    display: flex;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      font-size: 20px;
      cursor: pointer;

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: #ffaf38;
        border-radius: 50%;
        font-size: 30px;
        padding-top: 5px;
        margin-right: 8px;
      }

      .text,
      .highlight,
      .icon {
        font-family: 'Black Han Sans', sans-serif !important;
      }

      .highlight {
        color: #ffaf38;
      }
    }
    .logo-mobile {
      display: none;
    }

    nav {
      display: flex;

      ul {
        display: inline-flex;
        align-items: center;
        padding-left: 48px;

        li {
          display: flex;
          .icon_wrap {
            display: flex;
            cursor: pointer;
            margin-right: 35px;
            padding: 8px;
            align-items: center;
            border-radius: 48px;
            transition: background-color ${TRANSITION_TIME}s;

            &:hover,
            &.active {
              background-color: var(--global--button-color);
            }
          }
        }
      }
    }
  }

  .right_side {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;

    .cashier_btn {
      cursor: pointer;
      margin-right: 16px;
      transition: filter ${TRANSITION_TIME}s;

      &:hover {
        filter: brightness(85%);
      }
    }

    .signup-btn {
      margin-left: 24px;
    }

    .search-icon svg {
      margin-right: 14px;
      margin-left: 22px;
    }

    .bell-icon svg {
      margin-right: 7px;

      &:hover {
        fill: var(--global--background-color-3);
      }
    }

    .header-avatar {
      object-fit: cover;
      border-radius: 24px;
      margin-left: 16px;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    height: ${HEADER_HEIGHT}px;

    .left-side {
      margin-right: 12px;

      .logo {
        .text {
          display: none;
        }
      }

      nav {
        display: none;
      }
    }

    .right_side {
      .search-icon {
        display: none;
      }
      .bell-icon {
        display: none;
      }
      .language-select {
        display: none !important;
      }

      .header-avatar {
        margin-left: 16px;
      }

      .signup-btn {
        width: 112px;
      }

      .login-btn {
        width: unset;
        background-color: transparent !important;
        box-shadow: none;
        margin-right: -16px;
      }
    }
  }
`;

const NetworkAlertWrap = styled.div`
  align-items: center;
  background: var(--global--main-color-2);
  display: flex;
  justify-content: center;
  padding: 8px 20px;
  font-size: 14px;
  position: absolute;
  background-color: orange;
  width: 100%;
  right: 0;
  top: ${HEADER_HEIGHT}px;
  z-index: 2;

  .network-name {
    text-transform: uppercase;
  }

  .click_switch {
    cursor: pointer;
    font-weight: bold;
    text-decoration: underline;
    transition: color ${TRANSITION_TIME}s;

    :hover {
      color: lightgreen;
    }
  }

  a {
    color: inherit;
    text-decoration: underline;
  }

  .close-btn {
    cursor: pointer;
    margin-left: 16px;
  }
`;

const NotiMenuWrap = styled(Popover)`
  .MuiPaper-root {
    background-color: var(--global--background-color-2);
    color: white;
    border-radius: 24px;
    margin-top: 4px;

    .noti-container {
      width: 324px;
      padding: 16px;
      font-size: 14px;

      .title {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
`;

const GameListNav = styled(Popover)`
  .MuiPopover-paper {
    background-color: var(--global--background-color-4);
    padding: 8px;
    color: white;
    margin-top: 4px;
    min-width: 212px;

    ul {
      font-weight: bold;
      margin: 0;
      padding: 0;

      li {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
        width: 100%;

        img {
          margin-right: 8px;
        }

        &:hover {
          background-color: var(--global--background-color-3);
        }
      }
    }

    .see-all {
      display: flex;
      justify-content: center;
      cursor: pointer;
      margin-top: 10px;

      svg {
        margin-left: 6px;
      }

      :hover {
        color: var(--global--background-color-3);

        svg path {
          stroke: var(--global--background-color-3);
        }
      }
    }
  }
`;

const UserMenu = styled.div`
  width: 372px;
  height: 100%;
  background-color: var(--global--background-color-4);
  color: white;
  border-radius: 24px 0px 0px 24px;
  padding: 24px;
  font-size: 18px;
  font-weight: bold;

  .header {
    position: relative;

    .user {
      font-size: 20px;
      padding-top: 12px;
      cursor: pointer;
      display: inline-block;

      img {
        margin-right: 12px;
        border-radius: 50%;
        object-fit: cover;
      }

      &:hover {
        color: var(--global--background-color-3);
      }

      .user_address {
        width: 220px;
      }
    }

    .close-btn {
      position: absolute;
      top: -14px;
      right: -14px;
      cursor: pointer;

      &:hover {
        svg path {
          stroke: var(--global--background-color-3);
        }
      }
    }
  }

  ul {
    margin: 0px -24px;

    li {
      cursor: pointer;
      width: 348px;
      padding: 12px 24px;
      border-radius: 0 24px 24px 0;

      svg {
        margin-right: 8px;
      }

      &:hover {
        background-color: var(--global--background-color-4);
        color: var(--global--background-color-3);

        /* svg path[fill] {
          fill: var(--global--background-color-3);
        }

        svg path[stroke] {
          stroke: var(--global--background-color-3);
        } */
      }
    }
  }

  .logout_btn {
    cursor: pointer;

    svg {
      margin-right: 8px;
    }

    &:hover {
      color: var(--global--background-color-3);

      svg path[fill] {
        fill: var(--global--background-color-3);
      }

      svg path[stroke] {
        stroke: var(--global--background-color-3);
      }
    }
  }
`;

const MobileMenu = styled.div`
  width: 372px;
  height: 100%;
  background-color: var(--global--background-color-4);
  color: white;
  border-radius: 0 24px 24px 0;
  font-size: 16px;

  .header {
    position: relative;
    background-color: var(--global--background-color);
    border-radius: 0 24px 0 0;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
    margin-bottom: 26px;
    display: flex;
    align-items: center;
    padding: 24px;

    .title {
      font-weight: 600;
      font-size: 24px;
    }

    .close-btn {
      position: absolute;
      top: 12px;
      right: 14px;
      cursor: pointer;

      &:hover {
        svg path {
          stroke: var(--global--background-color-3);
        }
      }
    }
  }

  ul.menu {
    padding: 0 16px;
    li.menu-mobile-item {
      padding: 12px 0;
      width: 100%;

      &:not(:last-child) {
        border-bottom: 2px solid var(--global--background-color);
      }
      img {
        margin-right: 12px;
      }
    }

    .MuiAccordion-root {
      color: white;
      background-color: transparent;
      box-shadow: none;

      .MuiAccordionSummary-root {
        padding: 0;
        min-height: unset;
        .MuiAccordionSummary-content {
          margin: 0;
        }
        .MuiAccordionSummary-expandIcon {
          padding: 0 12px;
        }
      }

      .MuiAccordionDetails-root {
        padding: 12px 0px 0px;
      }
    }

    .list-game {
      font-weight: bold;
      margin: 0;

      li {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
        width: 100%;

        img {
          margin-right: 8px;
        }

        :hover {
          background-color: var(--global--background-color-4);
        }
      }
    }
  }

  .notification {
    padding: 0 24px;

    ul {
      padding: 0;
    }
  }
`;

let reAuthTimeout;

const Header = () => {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const userInfo = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const networkInfo = useSelector(selectNetworkInfo);
  const walletProvider = useSelector(selectWalletProvider);
  const userWallet = useSelector(selectUserWallet);
  const appPopup = useSelector(selectAppPopup);

  const [elNoti, setElNoti] = useState<null | HTMLElement>(null);
  const [elNavMenu, setElNavMenu] = useState<null | HTMLElement>(null);
  const [typeNavMenu, setTypeNavMenu] = useState('');
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState('');
  const [titleMobileMenu, setTitleMobileMenu] = useState(messages.menu);
  const [networkAlert, setNetworkAlert] = useState(false);

  const switchNetworkSupported =
    getMetamaskProvider() || (!isMobile && getCoinbaseProvider());

  const userMenuList = [
    {
      name: t(...messages.cashier()),
      url: `${USER_PATH}/cashier`,
      icon: CashierIcon,
    },
    {
      name: t(...messages.transactions()),
      url: `${USER_PATH}/transaction`,
      icon: TransactionIcon,
    },
    {
      name: t(...messages.gameHistory()),
      url: `${USER_PATH}/game-history`,
      icon: YellowCoinIcon,
    },
    {
      name: t(...messages.settings()),
      url: `${USER_PATH}/settings`,
      icon: SettingIcon,
    },
  ];

  const loggedIn = userWallet || token;

  const isMultiNav = typeNavMenu === 'multi';
  const isSingleNav = typeNavMenu === 'single';
  const navLink = isMultiNav ? '/multiplayer' : '/single-player';
  const navGameList = isMultiNav
    ? MULTI_GAME_LIST
    : isSingleNav
    ? SINGLE_GAME_LIST
    : [];

  const openNotification = (e: React.MouseEvent<HTMLElement>) => {
    setElNoti(e.currentTarget);
  };

  const closeNotification = () => {
    setElNoti(null);
  };

  const showCashierPopup = () => dispatch(setAppPopup('cashier'));
  // const showLoginPopup = () => dispatch(setAppPopup('login');
  const showSignupPopup = () => dispatch(setAppPopup('signup'));
  const hidePopup = () => dispatch(setAppPopup(''));

  const openNavMenu = (e: React.MouseEvent<HTMLLIElement>, type: string) => {
    setTypeNavMenu(type);
    setElNavMenu(e.currentTarget);
  };

  const closeNavMenu = () => {
    setElNavMenu(null);
  };

  const onExitedNavMenu = () => {
    setTypeNavMenu('');
  };

  const clickNavLink = () => {
    closeNavMenu();
  };

  const clickUserMenu = () => {
    closeProfileMenu();
  };

  const clickLogin = () => {
    clickLoginCommon();
  };

  const clickLogo = () => {
    isMobile ? setOpenMobileMenu('menu') : navigate('/');
  };

  const doLogout = () => {
    dispatch(logout());
    closeProfileMenu();
  };

  const clickLogout = () => {
    doLogout();
    // localStorage.setItem('prev_pathname', location.pathname);
    // const idToken = localStorage.getItem('id_token');
    // window.location.href = `${process.env.REACT_APP_IDENTITY_ENDPOINT}/endsession?id_token_hint=${idToken}&post_logout_redirect_uri=${process.env.REACT_APP_CALLBACK_ENDPOINT}`;
  };

  const getCountdown = (exp: number | string | null) => {
    return exp ? +exp * 1000 - new Date().getTime() : 0;
  };

  const setTokenData = (tokenData: TokenData) => {
    if (!tokenData) {
      doLogout();
      return;
    }

    const jwtInfo: any = jwt_decode(tokenData.access_token);

    localStorage.setItem('access_token', tokenData.access_token);
    localStorage.setItem('refresh_token', tokenData.refresh_token);
    localStorage.setItem('id_token', tokenData.id_token);
    dispatch(setToken(tokenData.access_token));

    const countdown = getCountdown(jwtInfo.exp);
    reAuthTimeout = countdownAuth(countdown);
  };

  const countdownAuth = (countdown: number) => {
    if (countdown <= 0) {
      doLogout();
      return;
    }

    console.log(`reAuth in ${countdown} seconds`);

    return setTimeout(async () => {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        doLogout();
        return;
      }

      const tokenData: TokenData = await getTokenData(
        refreshToken,
        'refresh_token',
      );
      setTokenData(tokenData);
    }, countdown);
  };

  const getTokenData = async (
    value: string | null,
    type: 'code' | 'refresh_token',
  ) => {
    const qs = require('qs');
    const data = qs.stringify({
      client_id: CLIENT_ID,
      client_secret: '',
      grant_type: type === 'code' ? 'authorization_code' : 'refresh_token',
      [type]: value,
      scope: AUTHEN_SCOPE,
      redirect_uri: process.env.REACT_APP_CALLBACK_ENDPOINT,
    });
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${process.env.REACT_APP_IDENTITY_ENDPOINT}/token`,
      data: data,
    };

    return await globalAxios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        dispatch(setToast({ msg: 'Login fail', type: 'error' }));
      });
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo());
    }
  }, [token]);

  // valid Network Info when Web3 ready
  useEffect(() => {
    if (networkInfo) {
      const valid = validNetwork(networkInfo);
      setNetworkAlert(!valid);
    }
  }, [networkInfo]);

  useEffect(() => {
    (async function () {
      const tokenLS = localStorage.getItem('access_token');
      if (location.pathname === CALLBACK_ROUTE) {
        // login
        if (location.search.includes('?code=')) {
          const urlParams = new URLSearchParams(location.search);
          const code = urlParams.get('code') + '';

          const tokenData: TokenData = await getTokenData(code, 'code');
          reAuthTimeout = setTokenData(tokenData);

          // pkce.exchangeForAccessToken(currentLocation.href).then(res => {
          //   history.replace(currentLocation.pathname);
          // });
        } else {
          doLogout();
        }

        const prevLocation = localStorage.getItem('prev_pathname');
        navigate(prevLocation || '');
      } else if (tokenLS) {
        // user logged
        dispatch(setToken(tokenLS));
        const jwtInfo: any = jwt_decode(tokenLS);
        const countdown = getCountdown(jwtInfo.exp);
        reAuthTimeout = countdownAuth(countdown);

        return () => {
          clearTimeout(reAuthTimeout);
        };
      }
    })();
  }, []);

  useEffect(() => {
    const title =
      openMobileMenu === 'noti'
        ? messages.notification
        : openMobileMenu === 'search'
        ? messages.search
        : messages.menu;
    setTitleMobileMenu(title);
  }, [openMobileMenu]);

  const closeProfileMenu = () => {
    setOpenProfileMenu(false);
  };

  const closeMobileMenu = () => {
    setOpenMobileMenu('');
  };

  const showProfileMenu = () => {
    setOpenProfileMenu(true);
  };

  if (isHideHeader(location.pathname)) {
    return <></>;
  }

  return (
    <>
      <HeaderWrap>
        <div className="left-side">
          <div className="logo" onClick={clickLogo}>
            <div className="icon">F</div>
            <div className="text">
              Fun<span className="highlight">arcade</span>
            </div>
          </div>
          <nav>
            <ul>
              <li onClick={e => openNavMenu(e, 'multi')}>
                <Tooltip title={t(...messages.multiplayer()) + ''}>
                  <div
                    className={`icon_wrap ${
                      typeNavMenu === 'multi' ? 'active' : ''
                    }`}
                  >
                    <img
                      alt="Multiplayer Icon"
                      width="24"
                      height="24"
                      src={MultiplayerIcon}
                    />
                  </div>
                </Tooltip>
              </li>
              <li onClick={e => openNavMenu(e, 'single')}>
                <Tooltip title={t(...messages.singlePlayer()) + ''}>
                  <div
                    className={`icon_wrap ${
                      typeNavMenu === 'single' ? 'active' : ''
                    }`}
                  >
                    <img
                      alt="Single Player Icon"
                      width="24"
                      height="24"
                      src={SinglePlayerIcon}
                    />
                  </div>
                </Tooltip>
              </li>
              <li onClick={() => navigate('/user/provably-fair')}>
                <Tooltip title={t(...messages.provablyFair()) + ''}>
                  <div className="icon_wrap">
                    <img
                      alt="Provably Fair Icon"
                      width="24"
                      height="24"
                      src={ProvablyFairIcon}
                    />
                  </div>
                </Tooltip>
              </li>
              <li>
                <Tooltip title={t(...messages.search()) + ''}>
                  <div className="icon_wrap">
                    <img
                      alt="Search Icon"
                      width="24"
                      height="24"
                      src={SearchIcon}
                    />
                  </div>
                </Tooltip>
              </li>
              {loggedIn && (
                <li onClick={openNotification}>
                  <Tooltip title={t(...messages.notification()) + ''}>
                    <div className="icon_wrap">
                      <img
                        alt="Bell Icon"
                        width="24"
                        height="24"
                        src={BellIcon}
                      />
                    </div>
                  </Tooltip>
                </li>
              )}
              <LanguageSelect />
            </ul>

            <GameListNav
              open={Boolean(elNavMenu)}
              anchorEl={elNavMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              TransitionProps={{
                onExited: onExitedNavMenu,
              }}
              onClose={closeNavMenu}
              disableRestoreFocus
            >
              <ul>
                {navGameList.map(game => (
                  <CommonLink key={game.url} to={game.url}>
                    <li
                      className="global_transition"
                      key={game.url}
                      onClick={clickNavLink}
                    >
                      <img
                        src={game.icon}
                        alt={game.name}
                        width="24"
                        height="24"
                      />
                      <span>{game.name}</span>
                    </li>
                  </CommonLink>
                ))}
              </ul>
              <div className="see-all">
                <CommonLink to={navLink} onClick={closeNavMenu}>
                  {t(...messages.seeAll())} <RightArrow />
                </CommonLink>
              </div>
            </GameListNav>
          </nav>
        </div>
        <div className="right_side">
          {!isMobile && loggedIn && (
            <div className="cashier_btn" onClick={showCashierPopup}>
              <CashierBtn />
            </div>
          )}

          {loggedIn && <WalletSelect />}

          {!loggedIn && (
            <>
              <CommonButton
                className="login-btn"
                text={t(...messages.loginViaWallet())}
                background="var(--global--background-color-4)"
                onClick={showSignupPopup}
              />
              <CommonButton
                className="signup-btn"
                text={t(...messages.login())}
                width="160"
                onClick={clickLogin}
              />
            </>
          )}

          {loggedIn && (
            <img
              className="header-avatar"
              alt="Avatar"
              src={NoAvatar}
              width="40"
              height="40"
              onClick={showProfileMenu}
            />
          )}
        </div>

        {loggedIn && (
          <>
            <NotiMenuWrap
              elevation={0}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              anchorEl={elNoti}
              open={Boolean(elNoti)}
              onClose={closeNotification}
            >
              <div className="noti-container">
                <div className="title">{t(...messages.notification())}</div>
                <NotificationList />
              </div>
            </NotiMenuWrap>

            <Drawer
              anchor="right"
              open={openProfileMenu}
              onClose={closeProfileMenu}
              PaperProps={{
                elevation: 0,
                style: { backgroundColor: 'transparent' },
              }}
            >
              <UserMenu>
                <div className="header">
                  <div className="user">
                    <CommonLink to={`${USER_PATH}`} onClick={closeProfileMenu}>
                      <img
                        alt="User Avatar"
                        src={NoAvatar}
                        width="40"
                        height="40"
                      />
                      <EllipsisText
                        text={userWallet}
                        lineNumber={1}
                        className="user_address"
                      />
                    </CommonLink>
                  </div>
                  <div className="close-btn" onClick={closeProfileMenu}>
                    <Close />
                  </div>
                </div>
                <CommonHr marginTop="16" marginBottom="16" />
                <ul>
                  {userMenuList.map(item => (
                    <li key={item.url} onClick={clickUserMenu}>
                      <CommonLink to={item.url}>
                        <item.icon />
                        <span>{item.name}</span>
                      </CommonLink>
                    </li>
                  ))}
                </ul>
                <CommonHr marginTop="16" marginBottom="16" />
                <div
                  className="logout_btn global_transition"
                  onClick={clickLogout}
                >
                  <Logout />
                  <span>{t(...messages.logout())}</span>
                </div>
              </UserMenu>
            </Drawer>
          </>
        )}

        <CommonDialog
          onClose={hidePopup}
          open={Boolean(appPopup)}
          headerTitle={
            appPopup === 'cashier' ? t(...messages.cashier()) : 'FunArcade'
          }
          width={appPopup === 'cashier' ? 450 : 388}
        >
          {appPopup === 'cashier' && <Cashier />}
          {appPopup === 'signup' && <LoginSignup />}
        </CommonDialog>
      </HeaderWrap>

      {walletProvider && networkAlert && switchNetworkSupported && (
        <NetworkAlertWrap>
          <div className="text">
            Your wallet's network does not match {APP_TITLE}'s. Please{' '}
            <span className="click_switch" onClick={switchToAppNetwork}>
              click here
            </span>{' '}
            switch to <strong>{APP_CHAIN_CONFIG.chainName}</strong> network
          </div>
          {/* <span className="close-btn" onClick={() => setNetworkAlert(false)}>
            <CloseIcon />
          </span> */}
        </NetworkAlertWrap>
      )}

      {isMobile && (
        <Drawer
          anchor="left"
          open={Boolean(openMobileMenu)}
          onClose={closeMobileMenu}
          style={{ zIndex: 1400 }}
          PaperProps={{
            elevation: 0,
            style: { backgroundColor: 'transparent', zIndex: 1201 },
          }}
        >
          <MobileMenu>
            <div className="header">
              <div className="title">{t(...titleMobileMenu)}</div>
              <div className="close-btn" onClick={closeMobileMenu}>
                <Close />
              </div>
            </div>

            {openMobileMenu === 'menu' && (
              <ul className="menu">
                <CommonLink className="logo" to="/">
                  <li className="menu-mobile-item" onClick={closeMobileMenu}>
                    <img
                      alt="Home Icon"
                      width="24"
                      height="24"
                      src={HomeIcon}
                    />
                    {t(...messages.home())}
                  </li>
                </CommonLink>

                <li className="menu-mobile-item">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<DownArrow />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <img
                        alt="Multiplayer Icon"
                        width="24"
                        height="24"
                        src={MultiplayerIcon}
                      />
                      {t(...messages.multiplayer())}
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul className="list-game">
                        {MULTI_GAME_LIST.map(game => (
                          <CommonLink key={game.url} to={game.url}>
                            <li
                              className="global_transition"
                              key={game.url}
                              onClick={closeMobileMenu}
                            >
                              <img
                                src={game.icon}
                                alt={game.name}
                                width="24"
                                height="24"
                              />
                              <span>{game.name}</span>
                            </li>
                          </CommonLink>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </li>

                <li className="menu-mobile-item">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<DownArrow />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <img
                        alt="Single Player Icon"
                        width="24"
                        height="24"
                        src={SinglePlayerIcon}
                      />
                      {t(...messages.singlePlayer())}
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul className="list-game">
                        {SINGLE_GAME_LIST.map(game => (
                          <li
                            className="global_transition"
                            key={game.url}
                            onClick={closeMobileMenu}
                          >
                            <CommonLink to={game.url}>
                              <img
                                src={game.icon}
                                alt={game.name}
                                width="24"
                                height="24"
                              />
                              <span>{game.name}</span>
                            </CommonLink>
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </li>

                <li className="menu-mobile-item" onClick={closeMobileMenu}>
                  <CommonLink className="logo" to="/user/provably-fair">
                    <img
                      alt="Provably Fair Icon"
                      width="24"
                      height="24"
                      src={ProvablyFairIcon}
                    />
                    {t(...messages.provablyFair())}
                  </CommonLink>
                </li>
                <li
                  className="menu-mobile-item"
                  onClick={() => setOpenMobileMenu('search')}
                >
                  <CommonLink className="logo" to="/">
                    <img
                      alt="Search Icon"
                      width="24"
                      height="24"
                      src={SearchIcon}
                    />
                    {t(...messages.search())}
                  </CommonLink>
                </li>
                <li
                  className="menu-mobile-item"
                  onClick={() => setOpenMobileMenu('noti')}
                >
                  <CommonLink className="logo" to="/">
                    <img
                      alt="Notification Icon"
                      width="24"
                      height="24"
                      src={BellIcon}
                    />
                    {t(...messages.notification())}
                  </CommonLink>
                </li>
                <li className="menu-mobile-item">
                  <LanguageSelect showText />
                </li>
              </ul>
            )}

            {openMobileMenu === 'noti' && (
              <div className="notification">
                <NotificationList />
              </div>
            )}

            {openMobileMenu === 'search' && (
              <div className="search">Search temp</div>
            )}
          </MobileMenu>
        </Drawer>
      )}
    </>
  );
};

export default Header;
