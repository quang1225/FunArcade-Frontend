import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  setBettedWalletId,
  setDetectClickGameplay,
  setIsBetting,
  setIsLoadingGame,
} from 'app/pages/GamePage/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentWallet,
  selectToken,
  selectWalletById,
} from 'app/redux/selectors';
import { GameHistory } from './types';
import { setToast, setWalletBalance, setUserHistory } from 'app/redux/actions';
import {
  emitCustomEvent,
  HEADER_HEIGHT,
  SOCKET_TIMEOUT,
  WITH_CREDENTIALS_SOCKET,
} from 'utils/constants';
import { USER_HISTORY_LENGTH } from 'utils/gameConfig';
import { UserHistory, UserWallet } from 'app/appTypes';
import { io } from 'socket.io-client';

declare let window;

require('phaser');
require('../../../utils/dragonBones.bundle');
require('./main.bundle');

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    height: calc(100vh - ${HEADER_HEIGHT * 2 + 16}px);
  }
`;

export interface RoadPrevBet {
  bettedWalletId: string;
}

const mapUserHistory = (data: GameHistory, history: UserHistory) => {
  history.crash = data.rounds.length;
  history.cashOut = +data.payout;
  history.gameNumber = data.id;
  history.walletId = data.walletId;
  history.serverSeed = data.seedId;
  history.time = data.createdAt;
  history.betAmount = +data.betAmount;
  history.userChoice = data.level;
};

let prevBet: RoadPrevBet | undefined;

export default function RoadGame() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const currentWallet = useSelector(selectCurrentWallet);
  const [isGameReady, setIsGameReady] = useState(false);

  const bettedWalletId = useRef('');
  const isBettingState = useRef(false);
  const userHistoryState = useRef<UserHistory[]>([]);
  const bettedWalletState = useRef<UserWallet>({} as UserWallet);
  const currentWalletState = useRef<UserWallet>({} as UserWallet);

  bettedWalletState.current = useSelector(
    selectWalletById(bettedWalletId.current),
  );

  // save state for reloading url
  const setPreviousState = () => {
    const prevBet: RoadPrevBet = {
      bettedWalletId: bettedWalletId.current,
    };

    localStorage.setItem('prev_bet-road', JSON.stringify(prevBet));
  };

  useEffect(() => {
    currentWalletState.current = currentWallet;
  }, [currentWallet]);

  useEffect(() => {
    const walletId = bettedWalletId.current || currentWallet.walletObj.id;
    if (isGameReady && walletId) {
      emitCustomEvent('update-wallet', walletId);
    }
  }, [currentWallet, isGameReady, bettedWalletId.current]);

  useEffect(() => {
    window.customSocketRoad = io(
      process.env.REACT_APP_ROAD_GAME_ENDPOINT + '',
      {
        reconnectionDelayMax: SOCKET_TIMEOUT,
        withCredentials: WITH_CREDENTIALS_SOCKET,
        auth: {
          token: token ? `Bearer ${token}` : 'no-token',
        },
      },
    );

    const prevBetStorage = localStorage.getItem('prev_bet-road');
    prevBet = prevBetStorage && JSON.parse(prevBetStorage);

    // get previous bet state when reloading
    if (prevBet) {
      bettedWalletId.current = prevBet.bettedWalletId;
      dispatch(setBettedWalletId(bettedWalletId.current));
    }
  }, []);

  const gameReadyFunc = () => {
    setIsGameReady(true);
    dispatch(setIsLoadingGame(false));
  };

  const isInGame = e => {
    isBettingState.current = e.detail;
    dispatch(setIsBetting(isBettingState.current));
  };

  const betFunc = e => {
    if (isBettingState.current) return;

    isBettingState.current = true;
    dispatch(setIsBetting(isBettingState.current));

    const betAmount: number = e.detail;
    bettedWalletId.current = currentWalletState.current.walletObj.id;
    dispatch(setBettedWalletId(bettedWalletId.current));

    dispatch(
      setWalletBalance({
        walletId: currentWalletState.current?.walletObj.id,
        balance:
          Number(currentWalletState.current?.walletObj.balance) - betAmount,
      }),
    );

    setPreviousState();
  };

  const payOut = e => {
    if (!isBettingState.current) return;

    isBettingState.current = false;
    dispatch(setIsBetting(isBettingState.current));

    const payout: number = e.detail;

    dispatch(
      setWalletBalance({
        walletId: bettedWalletState.current.walletObj.id,
        balance: Number(bettedWalletState.current.walletObj.balance) + payout,
      }),
    );
  };

  const clickGameplayMobile = () => {
    dispatch(setDetectClickGameplay(true));
  };

  // when Init + End game
  const history = e => {
    const history: any = e.detail;
    let tempHistory: UserHistory[] = [];

    if (Array.isArray(history)) {
      const historyArr: GameHistory[] = history;
      // map game history
      userHistoryState.current = [];
      if (historyArr?.[0]) {
        for (
          let i = 0;
          i <
          (historyArr.length < USER_HISTORY_LENGTH
            ? historyArr.length
            : USER_HISTORY_LENGTH);
          i++
        ) {
          const x = historyArr[i];
          const temp = {} as UserHistory;
          mapUserHistory(x, temp);
          tempHistory.push(temp);
        }
      }
      userHistoryState.current = [...tempHistory];
    } else if (history) {
      // END GAME
      // remove the previous state when server has the result
      localStorage.removeItem('prev_bet-road');
      bettedWalletId.current = '';
      isBettingState.current = false;
      dispatch(setIsBetting(false));

      // add game history
      const historyObj: GameHistory = history;
      const newHistory = {} as UserHistory;
      mapUserHistory(historyObj, newHistory);
      userHistoryState.current = [...userHistoryState.current];
      userHistoryState.current.unshift({ ...newHistory });
      if (userHistoryState.current.length > USER_HISTORY_LENGTH) {
        userHistoryState.current.length = USER_HISTORY_LENGTH;
      }
    }

    dispatch(setUserHistory(userHistoryState.current));
  };

  const onGameError = error => {
    dispatch(
      setToast({
        msg: 'Something went wrong',
        type: 'error',
      }),
    );
  };

  useEffect(() => {
    emitCustomEvent('init-rr', '');

    window.addEventListener('ready-game', gameReadyFunc);
    window.addEventListener('rr-ongoing', isInGame);
    window.addEventListener('rr-bet', betFunc);
    window.addEventListener('rr-payout', payOut);
    window.addEventListener('rr-history', history);
    window.addEventListener('rr-help', clickGameplayMobile);
    window.addEventListener('socket-response-error', onGameError);

    // Unmount
    return () => {
      window.removeEventListener('ready-game', gameReadyFunc);
      window.removeEventListener('rr-ongoing', isInGame);
      window.removeEventListener('rr-bet', betFunc);
      window.removeEventListener('rr-payout', payOut);
      window.removeEventListener('rr-history', history);
      window.removeEventListener('rr-help', clickGameplayMobile);
      window.removeEventListener('socket-response-error', onGameError);
      emitCustomEvent('destroyEngine', '');
    };
  }, []);

  return <Wrapper id="game-player-wrap"></Wrapper>;
}
