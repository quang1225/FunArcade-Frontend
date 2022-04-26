import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import GamePlayer from './GamePlayer/Loadable';
import { Helmet } from 'react-helmet-async';
import DownSolidArrow from './DownSolidArrow.svg';
import CommonHr from 'app/components/common/CommonHr';
import CommonDialog from 'app/components/common/CommonDialog';
import Chatbox from 'app/components/ChatComponent/Loadable';
import CommonTable from 'app/components/common/CommonTable';
import HistoryIcon from 'app/components/icons/History';
import ChatIcon from 'app/components/icons/Chat';
import GlobalIcon from 'app/components/icons/Global';
import RightArrow from 'app/components/icons/RightArrow';
import { messages } from './messages';
import gamePageReducer from './redux/reducer';
import { useInjectReducer } from '../../../utils/redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAutoBet,
  setAutoBetList,
  setBetData,
  setBettedUsers,
  setDetectClickGameChat,
  setDetectClickGameplay,
  setExpandMobile,
  setGameLimits,
  setIsLoadingGame,
} from './redux/actions';
import { selectToken } from 'app/redux/selectors';
import {
  HEADER_HEIGHT,
  TRANSITION_TIME,
  PADDING_GAMEPAGE,
  openInNewWindow,
  emitCustomEvent,
  HIDE_AUTOBET_LS_NAME,
  MOBILE_QUERY,
} from 'utils/constants';
import { GAME_LIST } from 'utils/gameConfig';
import { useTranslation } from 'react-i18next';
import BackBtn from 'app/images/icons/back-btn.svg';
import CircleQuestion from 'app/components/icons/CircleQuestion';
import { useSwipeable } from 'react-swipeable';
import Dialog from '@mui/material/Dialog';
import { Drawer, useMediaQuery } from '@mui/material';
import { getUserWallets, setUserHistory } from 'app/redux/actions';
import CommonSwitch from 'app/components/common/CommonSwitch';
import {
  selectDetectClickGameChat,
  selectDetectClickGameplay,
  selectExpandMobile,
} from './redux/selectors';
import DesktopChatBox from '../../components/DesktopChatBox/Loadable';
import { BetData } from './types';
import { USER_PATH } from '../UserPage/UserLayout';
import NotFoundPage from '../NotFoundPage';
import AutobetConfirmPopup from 'app/components/AutobetConfirmPopup';

const key = 'gamePage';

const mobileFooterHeight = 64;

const Wrapper = styled.div`
  background: linear-gradient(
    180deg,
    var(--global--body-color) 0%,
    var(--global--body-color-2) 100%
  );
  padding: ${PADDING_GAMEPAGE}px;
  flex: 1;
  position: relative;

  .table_history {
    .game_number {
      cursor: pointer;

      &:hover {
        font-weight: bold;
      }
    }
  }

  .gameConfig-wrap {
    border-radius: 24px;
    padding: ${PADDING_GAMEPAGE}px;
    background-color: var(--global--background-color);
    height: 100%;
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
      scrollbar-width: none;
    }

    .left-side {
      display: flex;
      flex: 1;
      flex-direction: column;
      position: relative;
      overflow-y: auto;

      .game_history_table {
        background-color: var(--global--background-color-4);
        padding-top: 18px;

        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          padding: 0 ${PADDING_GAMEPAGE}px;

          .title {
            font-size: 16px;
            font-weight: bold;

            svg {
              margin-top: -3px;
              margin-right: 2px;
            }
          }

          .view-all {
            cursor: pointer;
            font-size: 14px;

            svg {
              margin-left: 4px;
            }

            &:hover {
              color: var(--global--text-color);
              svg path {
                stroke: var(--global--text-color);
              }
            }
          }
        }
      }
    }

    .right-side {
      overflow-x: auto;
      display: flex;
      width: 324px;
      background-color: var(--global--background-color-4);
      border-radius: 8px;
      margin-left: 16px;
      padding: 24px ${PADDING_GAMEPAGE}px;
      flex-direction: column;

      .MuiCollapse-wrapperInner {
        display: grid;
      }

      .drag-mobile {
        display: none;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0;

    .gameConfig-wrap {
      flex-direction: column;
      border-radius: 0;
      background-color: var(--global--background-color-2);
      height: calc(100vh - ${HEADER_HEIGHT}px);

      .left-side {
        .game_ratio_wrap {
          height: 100%;
          position: unset;
          .game_player {
          }
        }
      }

      .right-side {
        margin-left: unset;
        position: fixed;
        bottom: 0;
        width: 100vw;
        left: ${PADDING_GAMEPAGE}px;
        width: calc(100vw - ${PADDING_GAMEPAGE * 2}px);
        border-radius: 8px 8px 0 0;
        overflow: unset;
        transition: height 0.3s;
        padding-top: 14px;

        .drag-mobile {
          position: absolute;
          width: 48px;
          height: 24px;
          background-color: var(--global--background-color-4);
          top: -12px;
          left: 50%;
          transform: translate(-50%, 0);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;

          img {
            transition: transform ${TRANSITION_TIME}s;
          }
        }
      }
    }
  }
`;

interface GameCssProp {
  $gameRatio: number;
}

const GameRatioWrap = styled.div<GameCssProp>`
  margin-bottom: 24px;
  width: 100%;
  padding-bottom: ${props =>
    props.$gameRatio ? 100 / props.$gameRatio + '%' : 'unset'};

  .game_player {
    height: fit-content;
    position: ${props => (props.$gameRatio ? 'absolute' : 'relative')};
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const HowToPlayWrap = styled.div`
  line-height: 21px;

  .title {
    font-weight: bold;
    font-size: 18px;
  }
`;

const MobileMenuWrap = styled(Dialog)`
  &,
  .MuiBackdrop-root {
    margin-top: ${HEADER_HEIGHT}px;
  }

  .MuiPaper-root {
    background-color: var(--global--background-color-4);
    color: white;
  }

  .header,
  .content {
    padding: ${PADDING_GAMEPAGE}px;
  }

  .content.no-padding {
    padding: 0;
  }

  hr {
    flex: 0 0 auto;
  }

  .header {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    height: 56px;

    img {
      margin-right: 8px;
    }
  }

  .content {
    flex: 1 1 auto;
    overflow-y: auto;
    margin-bottom: ${mobileFooterHeight}px;
  }

  ul.footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0;
    height: ${mobileFooterHeight}px;
    background-color: var(--global--background-color);

    li {
      padding: 12px;
      border-radius: 48px;
      transition: background-color ${TRANSITION_TIME}s;

      &:not(:last-child) {
        margin-right: 8px;
      }

      &.active {
        background-color: var(--global--button-color);
      }

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`;

const DesktopChatSidebar = styled(Drawer)`
  .MuiBackdrop-root {
    background-color: transparent;
  }

  .MuiPaper-root {
    width: 360px;
    height: calc(100vh - ${HEADER_HEIGHT}px);
    margin-top: ${HEADER_HEIGHT}px;
    background: var(--global--background-color-4);
    z-index: 1201;
  }
`;

let tempMobileMenu = 'how-to-play';

const GamePage = () => {
  const expandMobile = useSelector(selectExpandMobile);
  const detectClickGameplay = useSelector(selectDetectClickGameplay);
  const detectClickGameChat = useSelector(selectDetectClickGameChat);
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer: gamePageReducer });
  const { gameSlug }: any = useParams();
  const [showGameplay, setShowGameplay] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState('');
  const [hideFirstGameplay, setHideFirstGameplay] = useState(false);
  const [shortGameplay, setShortGameplay] = useState(false);
  const [openChatSidebar, setOpenChatSidebar] = useState(false);
  const gamePlayerEl = useRef<HTMLDivElement>(null);

  const gameConfig = GAME_LIST.find(x => x.slug === gameSlug);

  useEffect(() => {
    resetGame();

    const hideFirstGameplayLS = localStorage.getItem(
      `hideShortGameplay-${gameSlug}`,
    );
    const hideFirstGameplay =
      !hideFirstGameplayLS || hideFirstGameplayLS === 'false' ? false : true;
    setHideFirstGameplay(hideFirstGameplay);
    setShortGameplay(!hideFirstGameplay);
    setShowGameplay(!hideFirstGameplay);
  }, [gameSlug]);

  const resetGame = () => {
    dispatch(setBetData({} as BetData));
    dispatch(setUserHistory([]));
    dispatch(setAutoBet(false));
    dispatch(setBettedUsers([]));
    dispatch(setAutoBetList([]));
    dispatch(setIsLoadingGame(true));
    dispatch(setGameLimits({}));
    isMobile && setOpenMobileMenu('');
  };

  useEffect(() => {
    return () => {
      resetGame();
    };
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getUserWallets());
    }
  }, [token]);

  //------ detect for in-gameConfig button ------
  useEffect(() => {
    if (detectClickGameplay) {
      clickGameplay();
      dispatch(setDetectClickGameplay(false));
    }
  }, [detectClickGameplay]);

  useEffect(() => {
    if (detectClickGameChat) {
      clickGameChat();
      dispatch(setDetectClickGameChat(false));
    }
  }, [detectClickGameChat]);
  //---------------------------------------

  const clickGameplay = () => {
    if (isMobile) {
      setOpenMobileMenu(tempMobileMenu);
    } else {
      setShowGameplay(true);
    }
  };

  const clickGameChat = () => {
    if (!isMobile) {
      setOpenChatSidebar(prev => !prev);
    }
  };

  const closeMobileMenu = () => {
    tempMobileMenu = openMobileMenu;
    setOpenMobileMenu('');
  };

  const hideChatSidebar = () => {
    setOpenChatSidebar(false);
  };

  const swipeMobileMenu = useSwipeable({
    onSwipedUp: () => dispatch(setExpandMobile(true)),
    onSwipedDown: () => dispatch(setExpandMobile(false)),
  });

  const onHideShortGameplayChange = e => {
    const checked = e.currentTarget.checked;
    localStorage.setItem(
      `hideShortGameplay-${gameSlug}`,
      checked ? 'true' : 'false',
    );
    setHideFirstGameplay(checked);
  };

  const hideGamePlay = () => {
    setShowGameplay(false);
  };

  const hideShortGamePlay = () => {
    setShortGameplay(false);
  };

  const hideMobileMenu = () => {
    setOpenMobileMenu('');
  };

  const clickViewAllHistory = () => {
    openInNewWindow(
      `${USER_PATH}/game-history/?game=${gameConfig?.slug}`,
      window.innerWidth * 0.8,
      window.innerHeight * 0.8,
    );
  };

  const onScrollGame = () => {
    emitCustomEvent('react-scrolling', '');
  };

  const howToPlayEl =
    gameConfig &&
    (shortGameplay ? <gameConfig.howToPlayShort /> : <gameConfig.howToPlay />);

  if (!gameConfig) return <NotFoundPage />;

  return (
    <Wrapper className="full_height_page">
      <Helmet>
        <title>{gameConfig.name} game</title>
        <meta name="description" content={`${gameConfig.name} game`} />
      </Helmet>
      {gameConfig && (
        <>
          <div className="gameConfig-wrap">
            <div className="left-side" onScroll={onScrollGame}>
              <GameRatioWrap $gameRatio={gameConfig.gameRatio}>
                <div className="game_player" ref={gamePlayerEl}>
                  <GamePlayer />
                </div>
              </GameRatioWrap>

              {!isMobile && token && (
                <div className="game_history_table">
                  <div className="header">
                    <div className="title">
                      <HistoryIcon /> {t(...messages.gameHistory())}
                    </div>
                    <div
                      className="view-all global_transition"
                      onClick={clickViewAllHistory}
                    >
                      {t(...messages.viewAll())} <RightArrow />
                    </div>
                  </div>
                  <div className="table_history">
                    {gameConfig && gameSlug && !isMobile && (
                      <CommonTable HistoryHead={gameConfig.historyHead}>
                        <gameConfig.historyBody />
                      </CommonTable>
                    )}
                  </div>
                </div>
              )}
            </div>
            {(!isMobile || !gameConfig.noControls) && (
              <div
                className="right-side"
                style={{ paddingBottom: gameConfig.noBetButton ? 4 : 56 }}
              >
                {!gameConfig.hideExpandMenuMobile && (
                  <div
                    className="drag-mobile"
                    onClick={() => dispatch(setExpandMobile(!expandMobile))}
                    {...swipeMobileMenu}
                  >
                    <img
                      style={{
                        transform: expandMobile ? '' : 'rotate(-180deg)',
                      }}
                      src={DownSolidArrow}
                      alt="Expand Arrow"
                      width="12"
                      height="8"
                    />
                  </div>
                )}

                {gameConfig.rightMenu && <gameConfig.rightMenu />}
              </div>
            )}
          </div>
          <CommonDialog
            container={() => gamePlayerEl.current}
            style={{
              position: !isMobile && shortGameplay ? 'absolute' : 'fixed',
              zIndex: 1400,
            }}
            backdropProps={{
              style: {
                position: !isMobile && shortGameplay ? 'absolute' : 'fixed',
              },
            }}
            onClose={hideGamePlay}
            onExited={hideShortGamePlay}
            open={showGameplay}
            width={720}
            headerTitle={
              <>
                {gameConfig.name} - {t(...messages.howToPlay())}
              </>
            }
            footerContent={
              shortGameplay && (
                <CommonSwitch
                  checked={hideFirstGameplay}
                  text={t(...messages.dontShowFirstGameplay())}
                  name="dont-show-short-gameplay"
                  onChange={onHideShortGameplayChange}
                />
              )
            }
          >
            <HowToPlayWrap>{howToPlayEl}</HowToPlayWrap>
          </CommonDialog>

          <AutobetConfirmPopup
            text={t(...messages.crashAutobetConfirmText())}
            localStorageName={`${HIDE_AUTOBET_LS_NAME}-${gameConfig.slug}`}
            container={() => gamePlayerEl.current}
          />

          {isMobile && (
            <MobileMenuWrap
              fullScreen
              open={Boolean(openMobileMenu)}
              onClose={hideMobileMenu}
            >
              <div className="header">
                <img
                  src={BackBtn}
                  alt="Back button"
                  width="24"
                  height="24"
                  onClick={closeMobileMenu}
                />
                {openMobileMenu === 'how-to-play' &&
                  `${gameConfig.name} - ${t(...messages.howToPlay())}`}
                {openMobileMenu === 'history' && t(...messages.gameHistory())}
                {openMobileMenu === 'chat' && t(...messages.gameChat())}
                {openMobileMenu === 'global-chat' &&
                  t(...messages.globalChat())}
              </div>
              <CommonHr />
              <div
                className={`content ${
                  openMobileMenu === 'history' ? 'no-padding' : ''
                }`}
              >
                {openMobileMenu === 'how-to-play' && (
                  <HowToPlayWrap>{howToPlayEl}</HowToPlayWrap>
                )}

                {openMobileMenu === 'history' &&
                  gameConfig &&
                  gameSlug &&
                  isMobile && (
                    <CommonTable HistoryHead={gameConfig.historyHead}>
                      <gameConfig.historyBody />
                    </CommonTable>
                  )}

                {!gameConfig.isSingle && openMobileMenu === 'chat' && (
                  <div className="chat">
                    <Chatbox gameSlug={gameConfig.slug} />
                  </div>
                )}

                {openMobileMenu === 'global-chat' && (
                  <div className="global-chat">
                    <Chatbox gameSlug={gameConfig.slug} isGlobal />
                  </div>
                )}
              </div>
              <ul className="footer">
                <li
                  className={openMobileMenu === 'how-to-play' ? 'active' : ''}
                  onClick={() => setOpenMobileMenu('how-to-play')}
                >
                  <CircleQuestion />
                </li>
                <li
                  className={openMobileMenu === 'history' ? 'active' : ''}
                  onClick={() => setOpenMobileMenu('history')}
                >
                  <HistoryIcon />
                </li>
                {!gameConfig.isSingle && (
                  <li
                    className={openMobileMenu === 'chat' ? 'active' : ''}
                    onClick={() => setOpenMobileMenu('chat')}
                  >
                    <ChatIcon />
                  </li>
                )}
                <li
                  className={openMobileMenu === 'global-chat' ? 'active' : ''}
                  onClick={() => setOpenMobileMenu('global-chat')}
                >
                  <GlobalIcon />
                </li>
              </ul>
            </MobileMenuWrap>
          )}
        </>
      )}

      {!isMobile && gameConfig?.slug && (
        <DesktopChatSidebar
          hideBackdrop
          disableEnforceFocus
          anchor="left"
          open={openChatSidebar}
          style={{
            width: 'fit-content',
            height: 'fit-content',
          }}
        >
          <DesktopChatBox
            gameSlug={gameConfig.slug}
            hideChatSidebar={hideChatSidebar}
          />
        </DesktopChatSidebar>
      )}
    </Wrapper>
  );
};

export default GamePage;
