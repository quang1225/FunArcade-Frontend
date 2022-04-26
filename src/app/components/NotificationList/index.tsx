import styled from 'styled-components';
import EllipsisText from '../EllipsisText';
import HeartCoinIcon from 'app/images/icons/heart-coin.png';

const NotiList = styled.div`
  .sub-title {
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 6px;
  }

  ul {
    list-style: none;
    padding: 0;
    background-color: var(--global--background-color-4);
    padding: 17px 14px;
    border-radius: 4px;

    li {
      display: flex;
      flex-direction: row;
      margin-bottom: 16px;

      .noti-icon {
        margin-top: 2px;
        margin-right: 4px;
      }

      .noti-text {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .noti-status {
        color: #416c76;
        width: 160px;
        text-align: right;

        .unread-dot {
          height: 8px;
          width: 8px;
          background-color: #00c242;
          border-radius: 50%;
          margin-left: auto;
          margin-top: 4px;
        }
      }
    }
  }
`;

const NotificationList = () => (
  <NotiList>
    <div className="sub-title">New</div>
    <ul>
      <li>
        <img
          width="16"
          height="16"
          className="noti-icon"
          src={HeartCoinIcon}
          alt="Heart Icon"
        />
        <EllipsisText
          text="You have a message from Funasia administration
                aaaaaaaaaaaaaaaaaaaaaaaaaa"
          lineNumber={2}
        />
        <div className="noti-status">
          <div className="time">15m</div>
          <div className="unread-dot"></div>
        </div>
      </li>
      <li>
        <img
          width="16"
          height="16"
          className="noti-icon"
          src={HeartCoinIcon}
          alt="Heart Icon"
        />
        <EllipsisText
          text="You have a message from Funasia administration
                aaaaaaaaaaaaaaaaaaaaaaaaaa"
          lineNumber={2}
        />
        <div className="noti-status">
          <div className="time">15m</div>
          <div className="unread-dot"></div>
        </div>
      </li>
    </ul>

    <div className="sub-title">Earlier</div>
    <ul>
      <li>
        <img
          width="16"
          height="16"
          className="noti-icon"
          src={HeartCoinIcon}
          alt="Heart Icon"
        />
        <EllipsisText
          text="You have a message from Funasia administration
                aaaaaaaaaaaaaaaaaaaaaaaaaa"
          lineNumber={2}
        />
        <div className="noti-status">
          <div className="time">15m</div>
          <div className="unread-dot"></div>
        </div>
      </li>
      <li>
        <img
          width="16"
          height="16"
          className="noti-icon"
          src={HeartCoinIcon}
          alt="Heart Icon"
        />
        <EllipsisText
          text="You have a message from Funasia administration
                aaaaaaaaaaaaaaaaaaaaaaaaaa"
          lineNumber={2}
        />
        <div className="noti-status">
          <div className="time">15m</div>
          <div className="unread-dot"></div>
        </div>
      </li>
    </ul>
  </NotiList>
);

export default NotificationList;
