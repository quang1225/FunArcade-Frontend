import {
  selectToken,
  selectUserInfo,
  selectUserWallets,
} from 'app/redux/selectors';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CommonButton from '../common/CommonButton';
import CommonDialog from '../common/CommonDialog';
import CommonHr from '../common/CommonHr';
import { messages } from './messages';
import NoAvatar from 'app/images/no-avatar.png';
import {
  dateStrFormat,
  formatAmount,
  openInNewWindow,
  timeStrFormat,
} from 'utils/constants';
import { UserHistory } from 'app/appTypes';
import { USER_PATH } from 'app/pages/UserPage/UserLayout';
import {
  CRASH_GAME_SLUG,
  GAME_LIST,
  HILO_GAME_SLUG,
  ROAD_GAME_SLUG,
  WHEEL_GAME_SLUG,
} from 'utils/gameConfig';
import ProvablyFair from '../ProvablyFair';
import { useEffect, useState } from 'react';
import { getVerifyFairApi, rotateSeedPairApi } from 'app/redux/apis';
import { CircularProgress } from '@mui/material';
import { setToast } from 'app/redux/actions';
import {
  CrashVerifyDataRes,
  WheelVerifyDataRes,
  RoadVerifyDataRes,
  HiloVerifyDataRes,
} from './types';

interface Props {
  showFair: boolean;
  setShowFair: any;
  userHistory: UserHistory | undefined;
  setVerifyObj: any;
  gameSlug: string;
}

const FairWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  max-height: 80vh;

  .result_head {
    display: flex;
    padding-bottom: 16px;
    padding-top: 5px;

    .logo_wrap {
      position: relative;

      .MuiCircularProgress-root {
        position: absolute;
        top: -9px;
        right: -9px;
      }
    }

    .detail {
      flex: 1;

      .user {
        display: flex;
        align-items: center;

        img {
          border-radius: 50%;
          object-fit: cover;
          margin-right: 6px;
        }
      }

      .time {
        font-size: 14px;
      }
    }
  }

  .content {
    overflow-y: auto;

    .result-text,
    .fair-result-image,
    .input-wrap {
      margin-bottom: 24px;
    }

    .result-text {
      display: flex;
      align-items: center;
      height: 80px;
      background: var(--global--background-color);
      border-radius: 8px;

      .left-side,
      .right-side {
        flex: 1;
        text-align: center;

        .title {
          color: #4a8aff;
          font-weight: bold;
          margin-bottom: 4px;
        }

        svg {
          margin: -4px 3px 0px 3px;
        }
      }
    }

    .fair-result-image {
      height: 200px;
      background-repeat: no-repeat;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 48px;
    }
  }

  .footer_popup {
  }
`;

const ProvablyFairPopup = (props: Props) => {
  const { userHistory, gameSlug, showFair, setShowFair } = props;
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const userWallets = useSelector(selectUserWallets);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [clientSeed, setClientSeed] = useState('');
  const [serverSeed, setServerSeed] = useState('');
  const [hashedServerSeed, setHashedServerSeed] = useState('');
  const [nonce] = useState<string | undefined>();
  const [gameLevel, setGameLevel] = useState<string | undefined>();
  const [gameNumber, setGameNumber] = useState<string | undefined>();
  const [round, setRound] = useState<string | undefined>();
  const [gameDataRes, setGameDataRes] = useState<any>();
  const [loading, setLoading] = useState(false);

  const gameConfig = GAME_LIST.find(x => x.slug === gameSlug);

  const currency = userWallets.find(
    x => x.walletObj.id === userHistory?.walletId,
  )?.currencyObj.shortname;

  const closeFairPopup = () => {
    setShowFair(false);
  };

  const clickCalculateOrRotate = async () => {
    if (serverSeed) {
      openInNewWindow(
        `${USER_PATH}/provably-fair?game=${gameSlug}&hash=${serverSeed}&seed=${clientSeed}${
          nonce ? `&nonce=${nonce}` : ''
        }${gameLevel ? `&gameLevel=${gameLevel}` : ''}${
          gameNumber ? `&gameNumber=${gameNumber}` : ''
        }${round ? `&round=${round}` : ''}`,
        window.innerWidth * 0.8,
        window.innerHeight * 0.8,
      );
    } else {
      setLoading(true);
      const newSeed = await rotateSeedPairApi(token || '', gameSlug || '');
      setLoading(false);

      if (newSeed.lastServerSeed) {
        setClientSeed(newSeed.lastClientSeed);
        setServerSeed(newSeed.lastServerSeed);
      } else {
        dispatch(setToast({ type: 'error', msg: 'Rotate fail' }));
      }
    }
  };

  const exitedFairPopup = () => {
    setClientSeed('');
    setServerSeed('');
    setHashedServerSeed('');
  };

  const getVerifyData = async () => {
    setLoading(true);
    const res = await getVerifyFairApi(
      userHistory?.gameNumber || '',
      token || '',
      gameSlug || '',
    );
    setGameDataRes(res);

    switch (gameSlug) {
      case CRASH_GAME_SLUG:
        const crashData: CrashVerifyDataRes = res;
        setClientSeed(crashData.clientHash);
        setServerSeed(crashData.hash);
        break;

      case WHEEL_GAME_SLUG:
        const wheelData: WheelVerifyDataRes = res;
        setClientSeed(wheelData.clientHash);
        setServerSeed(wheelData.hash);
        break;

      case ROAD_GAME_SLUG:
        const roadData: RoadVerifyDataRes = res;
        setClientSeed(roadData.seed.clientSeed);
        setServerSeed(roadData.seed.serverSeed);
        setHashedServerSeed(roadData.seed.hashedServerSeed);
        setGameLevel(roadData.level + '');
        setGameNumber(roadData.gameNumber + '');
        break;

      case HILO_GAME_SLUG:
        const hiloData: HiloVerifyDataRes = res;
        setClientSeed(hiloData.seed.clientSeed);
        setServerSeed(hiloData.seed.serverSeed);
        setHashedServerSeed(hiloData.seed.hashedServerSeed);
        setGameNumber(hiloData.gameNumber + '');
        setRound(hiloData.rounds.length + '');
        break;

      default:
        break;
    }

    setLoading(false);
  };

  useEffect(() => {
    if (showFair && userHistory?.gameNumber && token) {
      getVerifyData();
    }
  }, [userHistory, token, showFair]);

  return (
    <CommonDialog
      onClose={closeFairPopup}
      onExited={exitedFairPopup}
      open={showFair}
      headerTitle={t(...messages.fairResult())}
      width={400}
      padding="0"
    >
      <FairWrap>
        <div className="result_head">
          <div className="detail">
            <div className="user">
              <img src={NoAvatar} alt="Avatar" width="16" height="16" />
              <div className="name">{userInfo?.username}</div>
            </div>
            <div className="time">
              {`${t(...messages.on())} ${dateStrFormat(userHistory?.time)} ${t(
                ...messages.at(),
              )} ${timeStrFormat(userHistory?.time)}`}
            </div>
          </div>

          <div className="logo_wrap">
            {loading && <CircularProgress size={42} />}
            <img
              src={gameConfig?.icon}
              alt="Game Icon"
              width="24"
              height="24"
            />
          </div>
        </div>

        <div className="content">
          <div className="result-text">
            <div className="left-side">
              <div className="title">{t(...messages.betAmount())}</div>
              <div className="content">
                {formatAmount(userHistory?.betAmount)} {currency}
              </div>
            </div>
            <div className="right-side">
              <div className="title">{t(...messages.cashOut())}</div>
              <div className="content">
                {formatAmount(userHistory?.cashOut)} {currency}
              </div>
            </div>
          </div>

          <ProvablyFair
            gameSlug={gameSlug}
            clientSeed={clientSeed}
            serverSeed={serverSeed}
            hashedServerSeed={hashedServerSeed}
            nonce={nonce}
            gameLevel={gameLevel}
            gameNumber={gameNumber}
            round={round}
            isRotateRequired={Boolean(!serverSeed)}
            hideBreakdown
            loading={loading}
            gameDataRes={gameDataRes}
          />
        </div>

        <div className="footer_popup">
          <CommonHr marginBottom="20" />

          <CommonButton
            onClick={clickCalculateOrRotate}
            className="submit-btn"
            text={
              serverSeed && !loading
                ? t(...messages.calculateFair())
                : t(...messages.rotateSeedPair())
            }
            width="100%"
            disabled={loading}
          />
        </div>
      </FairWrap>
    </CommonDialog>
  );
};

export default ProvablyFairPopup;
