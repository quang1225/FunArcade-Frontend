import { Badge, Popover } from '@mui/material';
import CommonButton from 'app/components/common/CommonButton';
import CommonField from 'app/components/common/CommonField';
import CommonSwitch from 'app/components/common/CommonSwitch';
import {
  setAutoBetList,
  setBetData,
  setAutoBet,
  setShowAutobetPopup,
  setClickConfirmAutobet,
} from 'app/pages/GamePage/redux/actions';
import { messages } from 'app/pages/GamePage/messages';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  formatAmount,
  HIDE_AUTOBET_LS_NAME,
  PADDING_GAMEPAGE,
  preventMinus,
} from 'utils/constants';
import {
  selectBettedUsers,
  selectIsAutoBet,
  selectAutoBetList,
  selectBetData,
  selectOnClickConfirmAutobet,
} from 'app/pages/GamePage/redux/selectors';
import { selectToken } from 'app/redux/selectors';
import HeaderRightMenu from 'app/components/game-page/HeaderRightMenu';
import CalcAmountButtons from 'app/components/CalcAmountButtons';
import ChoiceBox from './ChoiceBox';

export const WheelBetListWrap = styled.div`
  width: 100%;
  font-size: 14px;

  ul {
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      align-items: center;
      font-weight: bold;
      color: #00c242;

      &:not(:last-child) {
        margin-bottom: 12px;
      }

      svg {
        margin-left: 8px;
      }
      .remove {
        cursor: pointer;
        color: white;
        font-weight: normal;
        margin-left: 12px;
        background-color: var(--global--background-color);
        height: 16px;
        width: 16px;
        font-size: 12px;
        border-radius: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

const BetListPopupWrap = styled(Popover)`
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
    }
  }
`;

const Wrapper = styled.div`
  .radio-text,
  .wheel-radio,
  .calc_buttons,
  .bet-group,
  .bet-lists {
    margin-bottom: 18px;
    margin-top: 18px;

    .text {
      margin-bottom: 12px;
    }
  }

  .bet_limits {
    margin-bottom: 18px;
    ul {
      display: grid;
      grid-template-columns: auto auto;
      gap: 8px;
      margin-top: 6px;

      .key {
        font-weight: bold;
      }
    }
  }

  .amount-input {
    margin-bottom: 8px;
  }

  .autobet-wrap {
    margin-bottom: 20px;
    margin-top: 14px;
  }

  .btn-action {
    width: 100%;
    margin-bottom: 6px;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .amount-input {
      margin-bottom: 28px;
    }

    .mobile-betList {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

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
  const betData = useSelector(selectBetData);
  const bettedUsers = useSelector(selectBettedUsers);
  const isAutoBet = useSelector(selectIsAutoBet);
  const autoBetList = useSelector(selectAutoBetList);
  const onClickConfirmAutobet = useSelector(selectOnClickConfirmAutobet);
  const [elBetList, setElBetList] = useState<null | HTMLElement>(null);
  const [typeBetList, setTypeBetList] = useState('');
  const [betAmount, setBetAmount] = useState(0);

  const choiceState = useRef(0);

  const openBetListMobile = (
    e: React.MouseEvent<HTMLLIElement>,
    type: string,
  ) => {
    setTypeBetList(type);
    setElBetList(e.currentTarget);
  };

  const clickChoiceObserver = e => {
    console.trace();
    const tChoice: number = +e.detail || 0;
    choiceState.current = tChoice;
  };

  useEffect(() => {
    window.addEventListener('wheel-click-choice', clickChoiceObserver);

    return () => {
      window.removeEventListener('wheel-click-choice', clickChoiceObserver);
    };
  }, []);

  useEffect(() => {
    if (betAmount >= 0) {
      const temp = { ...betData };
      temp.betAmount = betAmount;
      dispatch(setBetData(temp));
    }
  }, [betAmount]);

  useEffect(() => {
    const temp = { ...betData };
    temp.autoBet = isAutoBet;
    dispatch(setBetData(temp));
  }, [isAutoBet]);

  const enableAutoBet = () => {
    dispatch(setAutoBet(true));
  };

  const disableAutoBet = () => {
    dispatch(setAutoBet(false));
    dispatch(setAutoBetList([]));
  };

  const onAutoBetChange = e => {
    const checked = e.currentTarget.checked;
    if (checked) {
      const hideConfirm = localStorage.getItem(`${HIDE_AUTOBET_LS_NAME}-wheel`);
      if (hideConfirm) {
        enableAutoBet();
      } else {
        dispatch(setShowAutobetPopup(true));
      }
    } else {
      disableAutoBet();
    }
  };

  const onConfirmAutobet = () => {
    enableAutoBet();
  };

  useEffect(() => {
    if (onClickConfirmAutobet) {
      onConfirmAutobet();
      dispatch(setClickConfirmAutobet(false));
    }
  }, [onClickConfirmAutobet]);

  const BettedList = () => (
    <WheelBetListWrap>
      <ul>
        {[...bettedUsers]
          ?.sort((a, b) => a?.choice - b?.choice)
          .map(x => (
            <li key={x.choice}>
              <ChoiceBox choice={x.choice} />
              {formatAmount(x.betAmount)}
            </li>
          ))}
      </ul>
    </WheelBetListWrap>
  );

  const AutoBetList = () => (
    <WheelBetListWrap>
      <ul>
        {[...autoBetList]
          ?.sort((a, b) => a.choice - b.choice)
          .map(x => (
            <li key={x.choice}>
              <ChoiceBox choice={x.choice} />
              {formatAmount(x.totalAmount)}
              <div
                className="remove global_transition"
                onClick={() => removeAutoBetItem(x.choice)}
              >
                x
              </div>
            </li>
          ))}
      </ul>
    </WheelBetListWrap>
  );

  const removeAutoBetItem = (choice: number) => {
    let removed = autoBetList.filter(x => x.choice !== choice);
    dispatch(setAutoBetList(removed));
  };

  const onBetAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = +e.target.value;
    setBetAmount(amount);
  };

  return (
    <Wrapper>
      <HeaderRightMenu
        autobetCheck={isAutoBet}
        onAutoBetChange={onAutoBetChange}
      />

      <div className="autobet-wrap hideOnMobile">
        <CommonSwitch
          checked={isAutoBet}
          text={t(...messages.autoBet())}
          name="autobet-check"
          onChange={onAutoBetChange}
          disabled={betAmount <= 0 && !isAutoBet}
        />
      </div>

      <CommonField
        type="number"
        className={`amount-input ${token && !betAmount ? 'glow_2' : ''}`}
        label={t(...messages.betAmount())}
        placeholder=" "
        name="ticket-amount"
        value={betAmount || ''}
        onChange={onBetAmountChange}
        onKeyPress={preventMinus}
      />

      <CalcAmountButtons
        className="hideOnMobile"
        setBetAmount={setBetAmount}
        betAmount={betAmount}
      />

      <div className="mobile-betList showOnMobile-flex">
        <Badge badgeContent={bettedUsers?.length} showZero>
          <CommonButton
            text={t(...messages.currentBetList())}
            background="var(--global--background-color-2)"
            onClick={e => openBetListMobile(e, 'wheel-current-bet')}
            width={140}
            height={32}
          />
        </Badge>
        <Badge badgeContent={autoBetList?.length} showZero>
          <CommonButton
            text={t(...messages.autoBetList())}
            background="var(--global--background-color-2)"
            onClick={e => openBetListMobile(e, 'wheel-auto-bet')}
            width={140}
            height={32}
          />
        </Badge>

        <BetListPopupWrap
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
          open={
            Boolean(elBetList) &&
            ((typeBetList === 'wheel-current-bet' && bettedUsers?.length > 0) ||
              (typeBetList === 'wheel-auto-bet' && autoBetList?.length > 0))
          }
          onClose={() => setElBetList(null)}
        >
          <div className="wrapper">
            {typeBetList === 'wheel-auto-bet' && <AutoBetList />}
            {typeBetList === 'wheel-current-bet' && <BettedList />}
          </div>
        </BetListPopupWrap>
      </div>

      <div className="bet-lists hideOnMobile">
        {autoBetList.length > 0 && (
          <div className="text">{t(...messages.autoBetList())}</div>
        )}
        {isAutoBet && <AutoBetList />}

        <br />

        {bettedUsers.length > 0 && (
          <div className="text">{t(...messages.currentBetList())}</div>
        )}

        <BettedList />
      </div>
    </Wrapper>
  );
};

export default RightMenuGame;
