import Chatbox from 'app/components/ChatComponent';
import CloseIcon from 'app/components/icons/CloseIcon';
import MaximizeIcon from 'app/components/icons/MaximizeIcon';
import LanguageSelect from 'app/components/LanguageSelect';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  clickLoginCommon,
  openInNewWindow,
  TRANSITION_TIME,
} from 'utils/constants';
import { messages } from 'app/pages/GamePage/messages';
import { GAME_LIST } from 'utils/gameConfig';
import { useSelector } from 'react-redux';
import { selectToken } from 'app/redux/selectors';
import CommonButton from 'app/components/common/CommonButton';
import { useLocation } from 'react-router-dom';

declare let window: any;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--global--background-color-4);

  .header {
    display: flex;
    position: relative;

    /* .drag_icon {
      width: 60px;
      position: absolute;
      padding: 8px 0;
      cursor: move;
      left: 0;
      right: 0;
      margin: auto;
      top: -20px;

      .line {
        height: 100%;
        height: 4px;
        background-color: white;
        border-radius: 24px;
      }
    } */

    ul.tabs {
      display: flex;

      li {
        font-weight: bold;
        font-size: 14px;
        color: white;
        padding: 12px;

        :hover {
          color: #387eff;
          cursor: pointer;
          transition: color ${TRANSITION_TIME}s;
        }

        &.selected {
          color: white;
          background: #102a51;
          border-radius: 8px 8px 0px 0px;
          transition: background ${TRANSITION_TIME}s;
        }
      }
    }

    .buttons {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;

      .maximize_btn,
      .minimize_btn,
      .close_btn {
        cursor: pointer;
        &:hover {
          svg path {
            stroke: var(--global--background-color-3);
          }
        }
      }

      .maximize_btn,
      .minimize_btn,
      .login_btn {
        margin-left: 16px;
      }

      .close_btn {
        margin-left: 10px;
      }
    }
  }
`;

window.ondragend = (e: any) => {
  // console.log('drag', e);
};

interface Props {
  gameSlug: string;
  hideChatSidebar?: () => void;
}

const maxHeightPopup = document.documentElement.clientHeight * 0.9;

const DesktopChatBox = (props: Props) => {
  const { hideChatSidebar, gameSlug } = props;
  const { t } = useTranslation();
  const location = useLocation();
  const token = useSelector(selectToken);
  const [chatType, setChatType] = useState('game_chat');

  const isSingleGame = GAME_LIST.find(x => x.slug === gameSlug)?.isSingle;
  const isChatPage = location.pathname === '/chat';

  const clickLogin = () => {
    clickLoginCommon();
  };

  const openChatWindow = () => {
    hideChatSidebar?.();
    openInNewWindow(
      `/chat?game=${gameSlug}`,
      Boolean(token) ? 360 : 500,
      maxHeightPopup,
    );
  };

  return (
    <Wrapper style={{ padding: hideChatSidebar ? 16 : 24 }}>
      <div className="header">
        {/* <div className="drag_icon" id="draggable-area">
          <div className="line" />
        </div> */}

        <ul className="tabs">
          {!isSingleGame && (
            <li
              className={`${chatType === 'game_chat' ? 'selected' : ''}`}
              onClick={() => setChatType('game_chat')}
            >
              {t(...messages.gameChat())}
            </li>
          )}
          <li
            className={`${chatType === 'global_chat' ? 'selected' : ''}`}
            onClick={() => setChatType('global_chat')}
          >
            {t(...messages.globalChat())}
          </li>
        </ul>

        <div className="buttons">
          <LanguageSelect isGameChat />

          {!Boolean(token) && isChatPage && (
            <CommonButton
              className="login_btn"
              text={t(...messages.loginToChat())}
              background="var(--global--button-color)"
              width="160"
              height="36"
              onClick={clickLogin}
            />
          )}

          {hideChatSidebar && (
            <>
              <div className="maximize_btn" onClick={openChatWindow}>
                <MaximizeIcon />
              </div>
              <div className="close_btn" onClick={hideChatSidebar}>
                <CloseIcon />
              </div>
            </>
          )}
        </div>
      </div>
      <Chatbox gameSlug={gameSlug} isGlobal={chatType === 'global_chat'} />
    </Wrapper>
  );
};

export default DesktopChatBox;
