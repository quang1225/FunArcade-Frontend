import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import AnimatedNumber from 'app/components/AnimatedNumber';
import CommonSwitch from 'app/components/common/CommonSwitch';
import { messages } from 'app/pages/GamePage/messages';
import YellowCoin from 'app/images/icons/yellow-coin.svg';
import CommonHr from 'app/components/common/CommonHr';
import { TRANSITION_TIME } from 'utils/constants';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentWallet,
  selectToken,
  selectUserWallets,
} from 'app/redux/selectors';
import {
  selectBettedWalletId,
  selectExpandMobile,
  selectIsBeting,
} from 'app/pages/GamePage/redux/selectors';
import {
  setBettedWalletId,
  setDetectClickGameChat,
  setDetectClickGameplay,
} from 'app/pages/GamePage/redux/actions';
import GameChatIcon from 'app/components/icons/GameChatIcon';
import GameplayIcon from 'app/components/icons/GameplayIcon';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .balance_wrap {
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;

    .balance_str {
      display: flex;

      /* .balance_amount {
        width: 110px;
      } */

      .symbol {
        margin-left: 8px;
        color: #ffe37e;
      }
    }

    span {
      margin-right: 8px;
    }

    img {
      margin-right: 8px;
    }
  }

  .autobet-wrap.mobile {
    display: none;
  }

  .buttons {
    display: flex;

    .game_chat_btn,
    .gameplay_btn {
      cursor: pointer;
    }

    .gameplay_btn {
      margin-left: 16px;
      z-index: 100;
      transition: opacity ${TRANSITION_TIME}s;
    }
  }

  @media (max-width: 768px) {
    transition: margin ${TRANSITION_TIME}s;

    .buttons {
      .game_chat_btn {
        display: none;
      }
    }
  }
`;

interface Props {
  autobetCheck?: boolean;
  onAutoBetChange?: any;
  hideAutobet?: boolean;
  hideHr?: boolean;
  hideOnMinimize?: boolean;
}

const HeaderRightMenu = memo((props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isBetting = useSelector(selectIsBeting);
  const expandMobile = useSelector(selectExpandMobile);
  const userWallets = useSelector(selectUserWallets);
  const currentWallet = useSelector(selectCurrentWallet);
  const bettedWalletId = useSelector(selectBettedWalletId);

  const inGameWallet = bettedWalletId
    ? userWallets.find(x => x.walletObj.id === bettedWalletId) || currentWallet
    : currentWallet;

  useEffect(() => {
    if (!isBetting) {
      dispatch(setBettedWalletId(''));
    }
  }, [isBetting]);

  const {
    autobetCheck = false,
    onAutoBetChange,
    hideAutobet,
    hideHr,
    hideOnMinimize,
  } = props;

  return (
    <>
      <Wrapper
        className="common-header-menu"
        style={{
          marginBottom: expandMobile ? 20 : 12,
          position: hideAutobet ? 'absolute' : 'unset',
          top: hideAutobet ? 10 : 0,
          right: hideAutobet ? 16 : 0,
        }}
      >
        <div className="balance_wrap hideOnMobile">
          <img src={YellowCoin} alt="Yellow coin" width="24" height="24" />{' '}
          {token && (
            <div className="balance_str">
              <div className="balance_amount">
                <AnimatedNumber value={inGameWallet?.walletObj.balance || 0} />
              </div>
              <div className="symbol">
                {inGameWallet?.currencyObj.shortname}
              </div>
            </div>
          )}
        </div>
        {!hideAutobet && (
          <div className="showOnMobile">
            <CommonSwitch
              checked={autobetCheck}
              text={t(...messages.autoBet())}
              name="autobet-check"
              onChange={onAutoBetChange}
            />
          </div>
        )}

        <div className="buttons">
          <div
            className="game_chat_btn"
            style={{ opacity: hideOnMinimize && !expandMobile ? 0 : 1 }}
            onClick={() => dispatch(setDetectClickGameChat(true))}
          >
            <GameChatIcon />
          </div>

          <div
            className="gameplay_btn"
            style={{ opacity: hideOnMinimize && !expandMobile ? 0 : 1 }}
            onClick={() => dispatch(setDetectClickGameplay(true))}
          >
            <GameplayIcon />
          </div>
        </div>
      </Wrapper>
      {!hideHr && <CommonHr marginTop={6} marginBottom={6} />}
    </>
  );
});

export default HeaderRightMenu;
