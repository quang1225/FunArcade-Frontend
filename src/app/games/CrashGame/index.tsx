import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { InitCrashGame } from './types';
import {
  selectOnClickBet,
  selectOnClickCancel,
  selectBetData,
  selectIsAutoBet,
  selectIsPreBet,
} from 'app/pages/GamePage/redux/selectors';
import {
  setIsBetting,
  setClickBet,
  setClickCancel,
  setBettedUsers,
  setGameStatus,
  setIsPreBet,
  setIsLoadingGame,
  setAutoBet,
  setGameLimits,
  setBettedWalletId,
} from 'app/pages/GamePage/redux/actions';
import {
  setToast,
  setWalletBalance,
  setUserHistory,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { GameStatus, BettedUser, BetData } from 'app/pages/GamePage/types';
import {
  GameStarting,
  GameStarted,
  GameCrash,
  UserCrash,
  PlayerBet,
} from './types';
import io from 'socket.io-client';
import {
  emitCustomEvent,
  SOCKET_TIMEOUT,
  WITH_CREDENTIALS_SOCKET,
} from 'utils/constants';
import {
  selectCurrentWallet,
  selectToken,
  selectWalletById,
} from 'app/redux/selectors';
import { ERROR_MESSAGES, USER_HISTORY_LENGTH } from 'utils/gameConfig';
import { UserHistory, UserWallet } from 'app/appTypes';

declare let window;

require('phaser');
require('../../../utils/dragonBones.bundle');
require('./main.bundle');

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    height: calc((100vw * 2) / 3);
  }
`;

export interface CrashPrevBet {
  gameId: string;
  username: string;
  betAmount: number;
  autoCashOut: number;
  bettedUser: BettedUser[];
  bettedWallet: UserWallet;
}

let prevBet: CrashPrevBet | undefined;

export default function CrashGame() {
  const currentWallet = useSelector(selectCurrentWallet);
  const token = useSelector(selectToken);
  const detectClickBet = useSelector(selectOnClickBet);
  const detectClickCancel = useSelector(selectOnClickCancel);
  const isPreBet = useSelector(selectIsPreBet);
  const betData = useSelector(selectBetData);
  const isAutoBet = useSelector(selectIsAutoBet);
  const dispatch = useDispatch();
  const [isGameReady, setIsGameReady] = useState(false);
  const [initData, setInitData] = useState({} as InitCrashGame);

  const bettedWalletState = useRef<UserWallet>({} as UserWallet);
  const currentWalletState = useRef<UserWallet>({} as UserWallet);
  const isBettingState = useRef(false);
  const preBet = useRef(false);
  const isAutobetState = useRef(false);
  const currentGameState = useRef({} as UserHistory);
  const betDataState = useRef({} as BetData);
  const userHistoryState = useRef<UserHistory[]>([]);
  const gameStatusState = useRef({} as GameStatus);
  const bettedUserState = useRef<BettedUser[]>([]);
  const currentUsername = useRef('');

  bettedWalletState.current = useSelector(
    selectWalletById(currentGameState.current.walletId),
  );

  useEffect(() => {
    const prevBetStorage = localStorage.getItem('prev_bet-crash');
    prevBet = prevBetStorage && JSON.parse(prevBetStorage);
  }, []);

  useEffect(() => {
    currentWalletState.current = currentWallet;
  }, [currentWallet]);

  useEffect(() => {
    isAutobetState.current = isAutoBet;
  }, [isAutoBet]);

  useEffect(() => {
    betDataState.current = { ...betData };
  }, [betData]);

  useEffect(() => {
    preBet.current = isPreBet;
  }, [isPreBet]);

  const placeBet = () => {
    if (isBettingState.current) return;

    const autoCashOut = Math.round(betDataState.current.autoCashout * 100);
    currentGameState.current.walletId = currentWalletState.current.walletObj.id;
    dispatch(setBettedWalletId(currentGameState.current.walletId));

    window.customSocketCrash.emit(
      'place_bet',
      betDataState.current.betAmount,
      autoCashOut,
      currentGameState.current.walletId,
      err => {},
    );
  };

  // save state for reloading url
  const setPreviousState = () => {
    const prevBet: CrashPrevBet = {
      gameId: currentGameState.current.gameNumber,
      username: currentUsername.current,
      betAmount: betDataState.current.betAmount,
      autoCashOut: betDataState.current.autoCashout,
      bettedUser: bettedUserState.current,
      bettedWallet: bettedWalletState.current,
    };

    localStorage.setItem('prev_bet-crash', JSON.stringify(prevBet));
  };

  // update crashAt user list
  const updatePlayerCrashAt = (username: string, crashAt: number) => {
    bettedUserState.current = bettedUserState.current.map(x => {
      if (x.username === username) {
        return { ...x, crashAt: crashAt || 0 };
      } else return x;
    });
    dispatch(setBettedUsers(bettedUserState.current));
  };

  useEffect(() => {
    if (detectClickBet) {
      dispatch(setClickBet(false));

      if (gameStatusState.current.status === 'STARTED') return;

      if (
        gameStatusState.current.status === 'STARTING' &&
        (!isBettingState.current || isAutoBet)
      ) {
        placeBet();
        preBet.current = false;
        dispatch(setIsPreBet(false));
      }
      // IN_PROGRESS
      else {
        preBet.current = true;
        dispatch(setIsPreBet(true));
      }
    }
  }, [detectClickBet, isAutoBet]);

  useEffect(() => {
    if (detectClickCancel) {
      dispatch(setClickCancel(false));

      // click Cash Out
      if (gameStatusState.current.status === 'IN_PROGRESS' && !preBet.current) {
        cashoutFunc();
      }
      // click Cancel
      else {
        dispatch(setAutoBet(false));
        isBettingState.current = false;
        dispatch(setIsBetting(false));
        preBet.current = false;
        dispatch(setIsPreBet(false));
      }
    }
  }, [detectClickCancel]);

  const cashoutFunc = () => {
    window.customSocketCrash.emit(
      'cash_out',
      currentWallet.walletObj.id,
      err => {},
    );
  };

  const userCashout = (cashoutAt: number) => {
    const cashOut = currentGameState.current.betAmount * (cashoutAt / 100);
    currentGameState.current.cashOut = cashOut;
    return cashOut;
  };

  // 'STARTING' | 'BLOCKING' | 'IN_PROGRESS' |  'CRASHED'
  const initGameData = (err, data: InitCrashGame) => {
    // get previous bet state when reloading
    const cashoutAt = prevBet?.username
      ? data.player_info?.[prevBet?.username]?.stopped_at
      : 0;
    currentGameState.current.cashOutAt = cashoutAt;

    // get previous bet state when reloading
    if (prevBet && data.game_id.toString() === prevBet.gameId) {
      currentGameState.current.betAmount = prevBet.betAmount;
      currentGameState.current.userChoice = prevBet.autoCashOut;
      bettedUserState.current = [...prevBet.bettedUser];
      currentGameState.current.walletId = prevBet.bettedWallet.walletObj.id;
      dispatch(setBettedWalletId(currentGameState.current.walletId));

      dispatch(setBettedUsers(prevBet.bettedUser));

      if (cashoutAt) {
        updatePlayerCrashAt(prevBet.username, cashoutAt);
        userCashout(cashoutAt);
      } else {
        isBettingState.current = true;
        dispatch(setIsBetting(true));
      }
    }

    setInitData(data);
    dispatch(setIsLoadingGame(false));
    dispatch(
      setGameLimits({
        maxBet: +data.setting.maxbet,
        maxWin: +data.setting.maxwin,
      }),
    );

    currentUsername.current = data.username;

    const status =
      (data.state === 'STARTING' && 'STARTING') ||
      (data.state === 'BLOCKING' && 'STARTED') ||
      (data.state === 'IN_PROGRESS' && 'IN_PROGRESS') ||
      'CRASHED';
    gameStatusState.current = {
      ...gameStatusState.current,
      status: status,
    };
    dispatch(setGameStatus(gameStatusState.current));

    // set state
    currentGameState.current.gameNumber = data.game_id + '';
    currentGameState.current.time = data.created;

    // map User History
    userHistoryState.current = [];
    let tempHistory: UserHistory[] = [];
    let temp: UserHistory;
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
        temp = {} as UserHistory;
        temp.crash = x.game_crash / 100;
        temp.gameNumber = x.refid;
        temp.walletId = x.walletid;
        temp.time = x.created;
        temp.serverSeed = x.hash;
        temp.betAmount = x.bet;
        temp.cashOut = x.cash_out ? x.cash_out : 0;
        tempHistory.push(temp);
      }
    }
    userHistoryState.current = [...tempHistory];
    dispatch(setUserHistory(tempHistory));
  };

  const onGameStarting = (data: GameStarting) => {
    gameStatusState.current = {
      ...gameStatusState.current,
      status: 'STARTING',
    };
    dispatch(setGameStatus(gameStatusState.current));

    // new game
    currentGameState.current.gameNumber = data.game_refid;
    currentGameState.current.time = data.created_time;

    bettedUserState.current = [];
    dispatch(setBettedUsers([]));

    if (preBet.current || isAutobetState.current) {
      preBet.current = false;
      dispatch(setIsPreBet(false));
      placeBet();
    }
  };

  const addUserBetList = (username: string, betAmount: number) => {
    const newUser = {} as BettedUser;
    newUser.username = username;
    newUser.betAmount = betAmount;
    bettedUserState.current = [...bettedUserState.current];
    bettedUserState.current.unshift(newUser);
    dispatch(setBettedUsers(bettedUserState.current));

    setPreviousState();
  };

  const onPlayerBet = (data: PlayerBet) => {
    // if current player
    if (data.username === currentUsername.current) {
      currentGameState.current.betAmount = data.betAmount;
      currentGameState.current.userChoice = data.autoCashout;
      bettedWalletState.current = { ...currentWalletState.current };

      // update balance
      dispatch(
        setWalletBalance({
          walletId: bettedWalletState.current?.walletObj.id,
          balance:
            Number(bettedWalletState.current?.walletObj.balance) -
            Number(data.betAmount),
        }),
      );

      isBettingState.current = true;
      dispatch(setIsBetting(true));
    }

    addUserBetList(data.username, data.betAmount);
  };

  const onGameStarted = (data: GameStarted) => {
    gameStatusState.current = { ...gameStatusState.current, status: 'STARTED' };
    dispatch(setGameStatus(gameStatusState.current));
  };

  const onInProgress = (data: number) => {
    if (gameStatusState.current.status !== 'IN_PROGRESS') {
      gameStatusState.current = {
        ...gameStatusState.current,
        status: 'IN_PROGRESS',
      };
      dispatch(setGameStatus(gameStatusState.current));
    }
  };

  const onUserCashOut = (data: UserCrash) => {
    const cashoutAt = +data.stopped_at;

    if (data.username === currentUsername.current) {
      currentGameState.current.cashOutAt = cashoutAt;
      // update status
      if (isAutobetState.current) {
        preBet.current = true;
        dispatch(setIsPreBet(true));
      }
      isBettingState.current = false;
      dispatch(setIsBetting(false));

      // update user balance
      const cashOut = userCashout(cashoutAt);
      dispatch(
        setWalletBalance({
          walletId: bettedWalletState.current?.walletObj.id,
          balance:
            Number(bettedWalletState.current?.walletObj.balance) + cashOut,
        }),
      );
    }

    updatePlayerCrashAt(data.username, cashoutAt);
    setPreviousState();
  };

  const onGameCrash = (data: GameCrash) => {
    if (!preBet.current) {
      isBettingState.current = false;
      dispatch(setIsBetting(false));
    }

    gameStatusState.current = {
      ...gameStatusState.current,
      status: 'CRASHED',
    };
    dispatch(setGameStatus(gameStatusState.current));

    const cashoutAt = data.game_crash;
    const autoCashout = currentGameState.current.userChoice;

    // set user history
    currentGameState.current.crash = cashoutAt / 100;
    currentGameState.current.serverSeed = data.hash;
    if (autoCashout) {
      // user not cashout yet
      if (!currentGameState.current.cashOut) {
        // user lose
        if (autoCashout > cashoutAt) {
          currentGameState.current.cashOut = 0;
          currentGameState.current.cashOutAt = 0;
        }
        // user win
        else {
          userCashout(cashoutAt);
        }
      }

      userHistoryState.current = [...userHistoryState.current];
      userHistoryState.current.unshift({ ...currentGameState.current });
      if (userHistoryState.current.length > USER_HISTORY_LENGTH) {
        userHistoryState.current.length = USER_HISTORY_LENGTH;
      }
      dispatch(setUserHistory(userHistoryState.current));
    }

    currentGameState.current = {} as UserHistory;

    // remove the previous state when server has the result
    localStorage.removeItem('prev_bet-crash');
  };

  const onGameError = error => {
    dispatch(
      setToast({
        msg: ERROR_MESSAGES[error] || 'Something went wrong',
        type: 'error',
      }),
    );
  };

  const gameReadyFunc = () => {
    setIsGameReady(true);
  };

  useEffect(() => {
    if (token && window.customSocketCrash) {
      window.customSocketCrash.auth.token = `Bearer ${token}`;
      window.customSocketCrash.disconnect().connect();
    }
  }, [token]);

  useEffect(() => {
    if (isGameReady && window.customSocketCrash && initData.game_id) {
      emitCustomEvent('join', initData);
    }
  }, [isGameReady, initData]);

  const onConnection = () => {
    window.customSocketCrash.emit('authenticate', initGameData);
  };

  // init
  useEffect(() => {
    emitCustomEvent('initCrash', '');
    window.addEventListener('readyCrash', gameReadyFunc);

    window.customSocketCrash = io(
      process.env.REACT_APP_CRASH_GAME_ENDPOINT + '',
      {
        reconnectionDelayMax: SOCKET_TIMEOUT,
        withCredentials: WITH_CREDENTIALS_SOCKET,
        auth: {
          token: token ? `Bearer ${token}` : 'no-token',
        },
      },
    );
    window.customSocketCrash.once('connect', onConnection);
    window.customSocketCrash.on('game_starting', onGameStarting);
    window.customSocketCrash.on('player_bet', onPlayerBet);
    window.customSocketCrash.on('cashed_out', onUserCashOut);
    window.customSocketCrash.on('game_started', onGameStarted);
    window.customSocketCrash.on('game_tick', onInProgress);
    window.customSocketCrash.on('game_crash', onGameCrash);
    window.customSocketCrash.on('socket-error', onGameError);

    return () => {
      window.customSocketCrash.disconnect();
      window.customSocketCrash = null;
      dispatch(setIsBetting(false));
      window.removeEventListener('readyCrash', gameReadyFunc);
      emitCustomEvent('destroyEngine', '');
    };
  }, []);

  return <Wrapper id="game-player-wrap"></Wrapper>;
}
