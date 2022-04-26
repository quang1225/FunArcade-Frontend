import React, { memo, useState } from 'react';
import styled from 'styled-components';
import NoAvatar from 'app/images/no-avatar.png';
import CommonField from 'app/components/common/CommonField';
import { messages } from './messages';
import { useTranslation } from 'react-i18next';
import { selectToken } from 'app/redux/selectors';
import { useSelector } from 'react-redux';
import SendChatIcon from '../icons/SendChatIcon';

interface Props {
  gameSlug: string;
  isGlobal?: boolean;
}

const Wrapper = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: white;

  .chat-input {
    margin-top: 12px;

    .right_icon {
      cursor: pointer;
      svg path {
        fill: white;
        stroke: white;
      }

      &:hover {
        svg path {
          fill: #1659d4;
          stroke: #1659d4;
        }
      }
    }
  }
`;

const ChatWrap = styled.div`
  padding: 15px 15px 0 15px;
  overflow-y: auto;
  background: var(--global--background-color-2);
  border-radius: 0 0 8px 8px;
  height: calc(100% - 80px);
  font-size: 14px;
  flex: 1;

  .left-msg,
  .right-msg {
    display: flex;
    width: 100%;
    margin-bottom: 12px;

    img {
      align-self: flex-end;
      border-radius: 50%;
    }

    .chat-msg {
      padding: 8px 12px;
    }
  }

  .left-msg {
    .chat-msg {
      margin-left: 12px;
      background-color: var(--global--background-color-4);
      border-radius: 16px 16px 16px 0;
    }
  }

  .right-msg {
    float: right;
    display: flex;
    flex-direction: row-reverse;

    .chat-msg {
      margin-right: 12px;
      background-color: var(--global--background-color-3);
      border-radius: 16px 16px 0 16px;
    }
  }

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

const ChatComponent = memo((props: Props) => {
  // const { gameSlug, isGlobal } = props;
  const { t } = useTranslation();
  const [chatMsg, setChatMsg] = useState('');
  const token = useSelector(selectToken);

  const onSubmit = () => {
    console.log('Chat submit');
  };

  return (
    <Wrapper>
      <ChatWrap>
        <div className="left-msg">
          <img width="24" height="24" src={NoAvatar} alt="Chat Avatar" />
          <div className="chat-msg">
            Yesterday was such a battle, we lost all our ship to their hard ship
          </div>
        </div>
        <div className="left-msg">
          <img width="24" height="24" src={NoAvatar} alt="Chat Avatar" />
          <div className="chat-msg">That was so hush!</div>
        </div>
        <div className="right-msg">
          <img width="24" height="24" src={NoAvatar} alt="Chat Avatar" />
          <div className="chat-msg">
            Tim: Ahh i've lost my lottery! ahhh so angry. Today is such a bad
            day to this vagabond!
          </div>
        </div>
        {Array.from(Array(20).keys()).map(x => (
          <div className="left-msg">
            <img width="24" height="24" src={NoAvatar} alt="Chat Avatar" />
            <div className="chat-msg">
              It's time bro. Don’t let me gank for too long.
            </div>
          </div>
        ))}
      </ChatWrap>

      {Boolean(token) && (
        <CommonField
          type="text"
          className="chat-input"
          borderRadius={24}
          placeholder={t(...messages.typeYourMsg())}
          name="chat-msg"
          value={chatMsg}
          rightTextOrIcon={<SendChatIcon />}
          onClickRightTextOrIcon={onSubmit}
          onEnter={onSubmit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChatMsg(e.target.value)
          }
        />
      )}
    </Wrapper>
  );
});

export default ChatComponent;
