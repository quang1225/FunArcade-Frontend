import { CircularProgress, Collapse, useMediaQuery } from '@mui/material';
import CommonButton from 'app/components/common/CommonButton';
import CommonField from 'app/components/common/CommonField';
import HeaderRightMenu from 'app/components/game-page/HeaderRightMenu';
import {
  setClickBet,
  setBetData,
  setClickCancel,
  setIsBetDisabled,
} from 'app/pages/GamePage/redux/actions';
import { messages } from 'app/pages/GamePage/messages';
import { BetData } from 'app/pages/GamePage/types';
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
  selectBetData,
  selectCashoutAmount,
  selectExpandMobile,
  selectGameLimits,
  selectIsBetDisabled,
  selectIsBeting,
  selectIsLoadingGame,
} from 'app/pages/GamePage/redux/selectors';
import { selectToken } from 'app/redux/selectors';
import CalcAmountButtons from 'app/components/CalcAmountButtons';

const Wrapper = styled.div`
  .amount-input,
  .bet-group,
  .max_win {
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

  @media (max-width: 768px) {
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
  const expandMobile = useSelector(selectExpandMobile);
  const gameLimits = useSelector(selectGameLimits);
  const betData = useSelector(selectBetData);
  const cashoutAmount = useSelector(selectCashoutAmount);
  const isBetting = useSelector(selectIsBeting);
  const isBetDisabled = useSelector(selectIsBetDisabled);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const isLoadingGame = useSelector(selectIsLoadingGame);
  const [betAmount, setBetAmount] = useState(0);

  useEffect(() => {
    if (betData.betAmount > 0) {
      setBetAmount(betData.betAmount);
    }
  }, [betData]);

  const disableMaxBet = betAmount > Number(gameLimits.maxBet);
  const disableBetBtn =
    Boolean(token) &&
    (!betAmount ||
      isBetting ||
      isBetDisabled ||
      betAmount < 1 ||
      disableMaxBet);

  const clickBetBtn = () => {
    if (!token) {
      clickLoginCommon();
      return;
    }

    if (betAmount > 0) {
      dispatch(setClickBet(true));
      const betData = {} as BetData;
      betData.betAmount = betAmount;
      dispatch(setBetData({ ...betData }));
    }
  };

  const clickCashoutBtn = () => {
    dispatch(setIsBetDisabled(true));
    dispatch(setClickCancel(true));
  };

  return (
    <Wrapper>
      <HeaderRightMenu hideAutobet={isMobile} hideOnMinimize />

      <Collapse in={expandMobile || !isMobile}>
        <CommonField
          type="number"
          className={`amount-input ${!betAmount && !isBetting ? 'glow' : ''}`}
          label={t(...messages.betAmount())}
          afterLabel={
            gameLimits.maxBet
              ? ` ( 1 → ${formatAmount(Number(gameLimits.maxBet))} )`
              : ''
          }
          placeholder=" "
          name="ticket-amount"
          value={betAmount || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBetAmount(+e.target.value);
          }}
          onKeyPress={preventMinus}
          disabled={isBetting}
        />

        <CalcAmountButtons
          className="hideOnMobile"
          setBetAmount={setBetAmount}
          betAmount={betAmount}
          disabled={isBetting}
        />

        {Number(gameLimits.maxWin) > 0 && (
          <div className="max_win">
            {t(...messages.maxWin())}: {formatAmount(Number(gameLimits.maxWin))}
          </div>
        )}
      </Collapse>

      <div className="game-buttons">
        {!isBetting && (
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
              ) : disableMaxBet ? (
                t(...messages.maxBetExceeded())
              ) : (
                t(...messages.placeBet())
              )
            }
            background={!token ? 'var(--global--button-color)' : '#00C242'}
            fontWeight={700}
            height={40}
            onClick={clickBetBtn}
            disabled={disableBetBtn}
          />
        )}

        {isBetting && (
          <CommonButton
            className="btn-action"
            text={
              t(...messages.cashOut()) +
              (cashoutAmount > 0 ? ` ${formatAmount(cashoutAmount)}` : '')
            }
            background="#00C242"
            onClick={clickCashoutBtn}
            disabled={cashoutAmount <= 0}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default RightMenuGame;
