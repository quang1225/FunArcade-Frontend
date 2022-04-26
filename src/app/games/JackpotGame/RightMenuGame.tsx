import {
  Collapse,
  Badge,
  CircularProgress,
  Popover,
  useMediaQuery,
} from '@mui/material';
import CommonButton from 'app/components/common/CommonButton';
import CommonField from 'app/components/common/CommonField';
import CommonHr from 'app/components/common/CommonHr';
import CommonSwitch from 'app/components/common/CommonSwitch';
import EllipsisText from 'app/components/EllipsisText';
import HeaderRightMenu from 'app/components/game-page/HeaderRightMenu';
import {
  setClickBet,
  setBetData,
  setAutoBet,
  setClickCancel,
  setIsPreBet,
} from 'app/pages/GamePage/redux/actions';
import { messages } from 'app/pages/GamePage/messages';
import { BetData, BettedUser } from 'app/pages/GamePage/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  clickLoginCommon,
  formatAmount,
  MOBILE_QUERY,
  PADDING_GAMEPAGE,
  preventMinus,
} from 'utils/constants';
import {
  selectIsBeting,
  selectIsLoadingGame,
  selectBettedUsers,
  selectGameStatus,
  selectIsPreBet,
  selectIsAutoBet,
  selectExpandMobile,
  selectGameLimits,
} from 'app/pages/GamePage/redux/selectors';
import {
  selectUserInfo,
  selectToken,
  selectCurrentWallet,
} from 'app/redux/selectors';
import { setToast } from 'app/redux/actions';
import { CrashPrevBet } from '.';
import CalcAmountButtons from 'app/components/CalcAmountButtons';

const BetListWrap = styled(Popover)`
  .MuiPaper-root {
    background-color: var(--global--background-color-2);
    color: white;
    border-radius: 8px;
    border: 2px solid var(--global--button-color);

    .wrapper {
      padding: 16px 12px;
      align-items: center;
      justify-content: space-between;
      display: flex;
      font-weight: bold;

      .scrore-board {
        background-color: var(--global--background-color-2);
        width: 290px;

        .title {
          font-weight: bold;
          margin-bottom: 16px;
        }

        .list-score {
          display: flex;
          flex-direction: column;

          .item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;

            .name {
              width: 40%;
            }

            .score {
              width: 40%;
              text-align: right;

              svg {
                margin-top: -3px;
              }
            }
          }
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  .autobet-wrap {
    margin-bottom: 20px;
    margin-top: 14px;
  }

  .amount_input,
  .max_win,
  .autoCashout-input,
  .bet-group {
    margin-bottom: 16px;
  }

  .calc_buttons {
    margin-bottom: 24px;
  }

  .btn-action {
    width: 100%;
    margin-bottom: 6px;
    font-size: 14px;
  }

  .scrore-board {
    margin-top: 24px;
    background-color: var(--global--background-color-2);
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: ${PADDING_GAMEPAGE}px;

    .title {
      font-weight: bold;
      margin-bottom: 16px;
    }

    .list-score {
      display: flex;
      flex-direction: column;

      .item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;

        .name {
          width: 40%;
        }

        .score {
          width: 40%;
          text-align: right;

          svg {
            margin-top: -3px;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .mobile-betList {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;

      .MuiBadge-badge {
        background-color: var(--global--button-color);
        height: 18px;
        min-width: 18px;
        margin-right: 16px;
      }
    }

    .autobet-wrap {
      display: none;
    }

    hr {
      display: none;
    }

    .game-buttons {
      position: fixed;
      bottom: 6px;
      left: 0;
      width: 100%;
      padding: 0 ${PADDING_GAMEPAGE * 2}px;
    }
  }
`;

const RightMenuGame = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const gameLimits = useSelector(selectGameLimits);
  const expandMobile = useSelector(selectExpandMobile);
  const currentWallet = useSelector(selectCurrentWallet);
  const bettedUsers = useSelector(selectBettedUsers);
  const gameStatus = useSelector(selectGameStatus);
  const isPreBet = useSelector(selectIsPreBet);
  const isAutoBet = useSelector(selectIsAutoBet);
  const isBetting = useSelector(selectIsBeting);
  const userInfo = useSelector(selectUserInfo);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const isLoadingGame = useSelector(selectIsLoadingGame);
  const [elBetList, setElBetList] = useState<null | HTMLElement>(null);
  const [typeBetList, setTypeBetList] = useState('');
  const [currentBet, setCurrentBet] = useState<BettedUser | undefined>();
  const [betAmount, setBetAmount] = useState(0);
  const [autoCashOut, setAutoCashOut] = useState(-1);

  const showCashoutBtn = isBetting && gameStatus.status === 'IN_PROGRESS';

  const showCancelBtn = !showCashoutBtn && (isAutoBet || isPreBet);

  const disableMaxBet = betAmount > Number(gameLimits.maxBet);

  const disableBet =
    betAmount > currentWallet.walletObj.balance ||
    betAmount < 1 ||
    disableMaxBet ||
    !betAmount ||
    autoCashOut < 1.1;

  const disableBetBtn =
    Boolean(token) && (disableBet || isBetting || isAutoBet);

  const openBetListMobile = (
    e: React.MouseEvent<HTMLLIElement>,
    type: string,
  ) => {
    setTypeBetList(type);
    setElBetList(e.currentTarget);
  };

  useEffect(() => {
    setAutoCashOut(2);

    const prevBetStorage = sessionStorage.getItem('prev_bet_crash');
    const prevBetUser: CrashPrevBet | undefined =
      prevBetStorage && JSON.parse(prevBetStorage);
    if (prevBetUser) {
      setAutoCashOut(prevBetUser.autoCashOut);
    }
  }, []);

  useEffect(() => {
    if (bettedUsers) {
      const temp = bettedUsers.find(x => x.username === userInfo.username);
      setCurrentBet(temp);
    }
  }, [bettedUsers]);

  const clickBetBtn = () => {
    if (!token) {
      clickLoginCommon();
      return;
    }

    if (betAmount < 1 || betAmount > Number(gameLimits.maxBet)) {
      dispatch(
        setToast({
          msg: `Bet Amount must be between 1 and ${gameLimits.maxBet}`,
          type: 'error',
        }),
      );
      return;
    }

    if (autoCashOut < 1.1) {
      dispatch(
        setToast({
          msg: `Auto Cashout must be greater than 1.1`,
          type: 'error',
        }),
      );
      return;
    }

    dispatch(setClickBet(true));
    const newBetData = {} as BetData;
    newBetData.betAmount = betAmount;
    newBetData.autoCashout = autoCashOut;
    dispatch(setBetData(newBetData));
  };

  const clickCancelBtn = () => {
    // click Cancel Auto Bet
    if (gameStatus.status !== 'IN_PROGRESS' || isAutoBet) {
      disableAutoBet();
    } else {
      // click Cancel Bet
      dispatch(setClickCancel(true));
    }
  };

  const clickCashoutBtn = () => {
    dispatch(setClickCancel(true));
  };

  const enableAutoBet = () => {
    dispatch(setAutoBet(true));
    dispatch(setIsPreBet(true));
    clickBetBtn();
  };

  const disableAutoBet = () => {
    dispatch(setAutoBet(false));
    dispatch(setIsPreBet(false));
  };

  const onAutoBetChange = e => {
    const checked = e.currentTarget.checked;
    if (checked) {
      enableAutoBet();
    } else {
      disableAutoBet();
    }
  };

  const BetAmountInput = () => (
    <CommonField
      type="number"
      className={`amount_input ${!betAmount ? 'glow' : ''}`}
      label={t(...messages.betAmount())}
      afterLabel={
        gameLimits.maxBet
          ? ` ( 1 → ${formatAmount(Number(gameLimits.maxBet))} )`
          : ''
      }
      placeholder=""
      name="ticket-amount"
      value={betAmount || ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setBetAmount(+e.target.value);
      }}
      onKeyPress={preventMinus}
      disabled={isAutoBet}
    />
  );

  const ScoreBoard = () => (
    <div className="scrore-board">
      <div className="title">{t(...messages.currentBet())}</div>
      <div className="list-score">
        {currentBet && (
          <div className="item" key={currentBet?.username}>
            <div className="name">
              <EllipsisText text={currentBet.username} lineNumber={1} />
            </div>
            <div className="separate">
              {currentBet.crashAt ? `${currentBet.crashAt / 100}x` : '-'}
            </div>
            <div className="score">{currentBet.betAmount}</div>
          </div>
        )}
        <CommonHr
          marginTop="4"
          marginBottom="16"
          color="var(--global--text-color-2)"
        />
        {bettedUsers
          .filter(x => x.username !== userInfo.username)
          .map(item => (
            <div className="item" key={item.username}>
              <div className="name">
                <EllipsisText text={item.username} lineNumber={1} />
              </div>
              <div className="separate">
                {item.crashAt ? `${item.crashAt / 100}x` : '-'}
              </div>
              <div className="score">{item.betAmount}</div>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <Wrapper>
      <HeaderRightMenu
        autobetCheck={isAutoBet}
        onAutoBetChange={onAutoBetChange}
      />

      {isMobile && BetAmountInput()}

      <Collapse in={expandMobile || !isMobile}>
        <div className="autobet-wrap hideOnMobile">
          <CommonSwitch
            checked={isAutoBet}
            text={t(...messages.autoBet())}
            name="autobet-check"
            onChange={onAutoBetChange}
            disabled={!isAutoBet && disableBet}
          />
        </div>

        {!isMobile && BetAmountInput()}

        <CalcAmountButtons
          className="hideOnMobile"
          setBetAmount={setBetAmount}
          betAmount={betAmount}
          disabled={isAutoBet}
        />

        {Number(gameLimits.maxWin) > 0 && (
          <div className="max_win">
            {t(...messages.maxWin())}: {formatAmount(Number(gameLimits.maxWin))}
          </div>
        )}

        <div className="mobile-betList showOnMobile-flex">
          <Badge
            badgeContent={bettedUsers?.length}
            showZero
            style={{ width: '100%' }}
          >
            <CommonButton
              text={t(...messages.currentBetList())}
              background="var(--global--background-color-2)"
              onClick={e => openBetListMobile(e, 'crash-current-bet')}
              width="100%"
            />
          </Badge>
          <BetListWrap
            elevation={0}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            anchorEl={elBetList}
            open={Boolean(elBetList)}
            onClose={() => setElBetList(null)}
          >
            <div className="wrapper">
              {typeBetList === 'crash-current-bet' && <ScoreBoard />}
            </div>
          </BetListWrap>
        </div>
      </Collapse>

      <div className="game-buttons">
        {!showCancelBtn && !showCashoutBtn && (
          <CommonButton
            className={`btn-action ${!token || !disableBetBtn ? 'glow' : ''}`}
            text={
              isLoadingGame ? (
                <CircularProgress
                  size={28}
                  thickness={4}
                  style={{ color: 'white' }}
                />
              ) : !token ? (
                t(...messages.loginToPlay())
              ) : betAmount > currentWallet.walletObj.balance ? (
                t(...messages.notEnoughBalance())
              ) : isAutoBet ? (
                t(...messages.autoBetting())
              ) : gameStatus.status === 'STARTING' ? (
                t(...messages.placeBetNow())
              ) : disableMaxBet ? (
                t(...messages.maxBetExceeded())
              ) : (
                t(...messages.placeBetNext())
              )
            }
            background={!token ? 'var(--global--button-color)' : '#00C242'}
            fontWeight={700}
            height={40}
            onClick={clickBetBtn}
            disabled={disableBetBtn}
          />
        )}

        {showCancelBtn && (
          <CommonButton
            className="btn-action"
            text={
              isAutoBet
                ? t(...messages.cancelAutoBet())
                : t(...messages.cancelBet())
            }
            background="#ED3453"
            disabled={
              gameStatus.status === 'STARTING' && isBetting && !isAutoBet
            }
            onClick={clickCancelBtn}
          />
        )}

        {showCashoutBtn && (
          <CommonButton
            className="btn-action"
            text={t(...messages.cashOut())}
            background="orange"
            onClick={clickCashoutBtn}
          />
        )}
      </div>

      <div className="hideOnMobile">
        <ScoreBoard />
      </div>
    </Wrapper>
  );
};

export default RightMenuGame;
