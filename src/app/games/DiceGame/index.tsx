import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  selectOnClickBet,
  selectOnClickCancel,
  selectBetData,
  selectIsBeting,
} from 'app/pages/GamePage/redux/selectors';
import {
  setIsBetting,
  setClickBet,
  setClickCancel,
  setIsLoadingGame,
  setIsBetDisabled,
  setCashoutAmount,
  setBetData,
  setGameLimits,
  setBettedWalletId,
} from 'app/pages/GamePage/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  emitCustomEvent,
  HEADER_HEIGHT,
  SOCKET_TIMEOUT,
  WITH_CREDENTIALS_SOCKET,
} from 'utils/constants';
import {
  selectCurrentWallet,
  selectToken,
  selectWalletById,
} from 'app/redux/selectors';
import { GameHistory, InitData, OngoingGame } from './types';
import { BetData } from 'app/pages/GamePage/types';
import { setToast, setWalletBalance, setUserHistory } from 'app/redux/actions';
import { USER_HISTORY_LENGTH } from 'utils/gameConfig';
import { io } from 'socket.io-client';
import { UserHistory, UserWallet } from 'app/appTypes';

declare let window;

require('phaser');
require('../../../utils/dragonBones.bundle');
require('./main.bundle');

const rightMenuHeight = 192;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    height: calc(100vh - ${rightMenuHeight + 20 + HEADER_HEIGHT}px);
  }
`;

export interface HiloPrevBet {
  gameId: string;
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
  history.userChoice = data.startCard;
  history.listResult = data.rounds.map(x => x.card);
};

let prevBet: HiloPrevBet | undefined;

export default function HiloGame() {
  const dispatch = useDispatch();
  const currentWallet = useSelector(selectCurrentWallet);
  const token = useSelector(selectToken);
  const detectClickBet = useSelector(selectOnClickBet);
  const detectClickCancel = useSelector(selectOnClickCancel);
  const betData = useSelector(selectBetData);
  const isBeting = useSelector(selectIsBeting);

  const bettedWalletId = useRef('');
  const isBettingState = useRef(false);
  const bettedWalletState = useRef<UserWallet>({} as UserWallet);
  const currentWalletState = useRef<UserWallet>({} as UserWallet);
  const userHistoryState = useRef<UserHistory[]>([]);
  const onGoingGameState = useRef({} as OngoingGame);
  const betDataState = useRef({} as BetData);
  const [isGameReady, setIsGameReady] = useState(false);
  const [initData, setInitData] = useState({} as InitData);

  bettedWalletState.current = useSelector(
    selectWalletById(bettedWalletId.current),
  );

  // save state for reloading url
  const setPreviousState = () => {
    const prevBet: HiloPrevBet = {
      gameId: onGoingGameState.current.id,
      bettedWalletId: bettedWalletState.current.walletObj.id,
    };

    localStorage.setItem('prev_bet-hilo', JSON.stringify(prevBet));
  };

  useEffect(() => {
    const prevBetStorage = localStorage.getItem('prev_bet-hilo');
    prevBet = prevBetStorage && JSON.parse(prevBetStorage);
  }, []);

  useEffect(() => {
    isBettingState.current = isBeting;
  }, [isBeting]);

  useEffect(() => {
    currentWalletState.current = currentWallet;
  }, [currentWallet]);

  useEffect(() => {
    betDataState.current = { ...betData };
  }, [betData]);

  useEffect(() => {
    if (
      isGameReady &&
      window.customSocketHilo &&
      Object.keys(initData).length
    ) {
      emitCustomEvent('hilo-join', initData);
    }
  }, [isGameReady, initData]);

  useEffect(() => {
    // click Bet
    if (detectClickBet) {
      dispatch(setClickBet(false));

      if (isBettingState.current) return;

      isBettingState.current = true;
      dispatch(setIsBetting(true));

      bettedWalletId.current = currentWalletState.current.walletObj.id;
      dispatch(setBettedWalletId(bettedWalletId.current));

      emitCustomEvent('hilo-bet', {
        betAmount: betData.betAmount,
        walletId: currentWallet.walletObj.id,
      });
    }
  }, [detectClickBet]);

  useEffect(() => {
    // click Cash Out
    if (detectClickCancel) {
      dispatch(setClickCancel(false));

      if (!isBettingState.current) return;

      dispatch(setIsBetting(false));
      isBettingState.current = false;

      window.customSocketHilo.emit(
        'cashout',
        onGoingGameState.current.id,
        bettedWalletState.current.walletObj.id,
        success => {
          const newBalance =
            Number(bettedWalletState.current?.walletObj.balance) +
            Number(onGoingGameState.current.payout);

          dispatch(
            setWalletBalance({
              walletId: bettedWalletState.current?.walletObj.id,
              balance: newBalance,
            }),
          );

          emitCustomEvent('hilo-cashout', '');
        },
      );
    }
  }, [detectClickCancel]);

  const gameReadyFunc = () => {
    setIsGameReady(true);
    dispatch(setIsLoadingGame(false));
  };

  const interactiveBet = e => {
    const isBetEnabled: boolean = e.detail;
    dispatch(setIsBetDisabled(!isBetEnabled));
  };

  const endGameFunc = () => {
    dispatch(setIsBetDisabled(true));
    dispatch(setCashoutAmount(0));
    dispatch(setIsBetting(false));
    onGoingGameState.current = {} as OngoingGame;
  };

  const payOut = e => {
    const payout: number = e.detail;
    if (payout > 0) {
      onGoingGameState.current.payout = payout + '';
      dispatch(setCashoutAmount(payout));
    }
  };

  const onNewGame = e => {
    const gameId: string = e.detail;
    if (gameId) {
      onGoingGameState.current.id = gameId;
      const newBalance =
        Number(bettedWalletState.current?.walletObj.balance) -
        betDataState.current.betAmount;

      dispatch(
        setWalletBalance({
          walletId: bettedWalletState.current?.walletObj.id,
          balance: newBalance,
        }),
      );

      setPreviousState();
    }
  };

  const onGameEnd = e => {
    endGameFunc();
    const historyObj: GameHistory = e.detail;
    const newHistory = {} as UserHistory;
    mapUserHistory(historyObj, newHistory);
    userHistoryState.current = [...userHistoryState.current];
    userHistoryState.current.unshift({ ...newHistory });
    if (userHistoryState.current.length > USER_HISTORY_LENGTH) {
      userHistoryState.current.length = USER_HISTORY_LENGTH;
    }
    dispatch(setUserHistory(userHistoryState.current));

    // remove the previous state when server has the result
    localStorage.removeItem('prev_bet-hilo');
  };

  const initGameData = (data: InitData) => {
    // get previous bet state when reloading
    if (prevBet && data.ongoingGame?.id === prevBet.gameId) {
      bettedWalletId.current = prevBet.bettedWalletId;
      dispatch(setBettedWalletId(bettedWalletId.current));
    }

    dispatch(
      setGameLimits({
        maxBet: +data.setting.maxbet,
        maxWin: +data.setting.maxwin,
      }),
    );

    setInitData(data);
    if (data?.ongoingGame?.id) {
      onGoingGameState.current = data.ongoingGame;

      const isInGame = Boolean(data.ongoingGame.id);
      dispatch(setIsBetting(isInGame));
      dispatch(setCashoutAmount(+data.ongoingGame.payout));

      const updatedBetData = { ...betData };
      updatedBetData.betAmount = +data.ongoingGame.betAmount;
      dispatch(setBetData(updatedBetData));
    }

    // map User History
    let tempHistory: UserHistory[] = [];
    userHistoryState.current = [];
    if (data.history?.[0]) {
      for (
        let i = 0;
        i <
        (data.history.length < USER_HISTORY_LENGTH
          ? data.history.length
          : USER_HISTORY_LENGTH);
        i++
      ) {
        const x = data.history[i];
        const temp = {} as UserHistory;
        mapUserHistory(x, temp);
        tempHistory.push(temp);
      }
    }
    userHistoryState.current = [...tempHistory];
    dispatch(setUserHistory(userHistoryState.current));
  };

  const onConnection = () => {
    window.customSocketHilo.emit('join', initGameData);
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
    if (token && window.customSocketHilo) {
      window.customSocketHilo.auth.token = `Bearer ${token}`;
      window.customSocketHilo.disconnect().connect();
    }
  }, [token]);

  // init
  useEffect(() => {
    endGameFunc();

    window.customSocketHilo = io(
      process.env.REACT_APP_HILO_GAME_ENDPOINT + '',
      {
        reconnectionDelayMax: SOCKET_TIMEOUT,
        withCredentials: WITH_CREDENTIALS_SOCKET,
        auth: {
          token: token ? `Bearer ${token}` : 'no-token',
        },
      },
    );
    window.customSocketHilo.once('connect', onConnection);

    emitCustomEvent('init-dice', '');
    window.addEventListener('ready-game', gameReadyFunc);
    window.addEventListener('hilo-interactive-bet', interactiveBet);
    window.addEventListener('hilo-game-id', onNewGame);
    window.addEventListener('hilo-payout', payOut);
    window.addEventListener('hilo-history', onGameEnd);
    window.addEventListener('socket-response-error', onGameError);

    return () => {
      window.customSocketHilo.disconnect();
      window.customSocketHilo = null;
      window.removeEventListener('ready-game', gameReadyFunc);
      window.removeEventListener('hilo-interactive-bet', interactiveBet);
      window.removeEventListener('hilo-game-id', onNewGame);
      window.removeEventListener('hilo-payout', payOut);
      window.removeEventListener('hilo-history', onGameEnd);
      window.removeEventListener('socket-response-error', onGameError);
      emitCustomEvent('destroyEngine', '');
    };
  }, []);

  return <Wrapper id="game-player-wrap"></Wrapper>;
}
