import { UserHistory, UserWallet } from 'app/appTypes';
import {
  setBettedUsers,
  setIsLoadingGame,
  setGameLimits,
  setGameStatus,
  setIsBetting,
  setBetData,
  setAutoBetList,
  setBettedWalletId,
} from 'app/pages/GamePage/redux/actions';
import {
  selectAutoBetList,
  selectBetData,
  selectBettedUsers,
  selectGameLimits,
} from 'app/pages/GamePage/redux/selectors';
import {
  AutoBetItem,
  BetData,
  BettedUser,
  GameLimits,
  GameStatus,
} from 'app/pages/GamePage/types';
import { setToast, setWalletBalance, setUserHistory } from 'app/redux/actions';
import {
  selectCurrentWallet,
  selectToken,
  selectWalletById,
} from 'app/redux/selectors';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import {
  emitCustomEvent,
  getMapLimits,
  HEADER_HEIGHT,
  SOCKET_TIMEOUT,
  WITH_CREDENTIALS_SOCKET,
} from 'utils/constants';
import {
  ERROR_MESSAGES,
  LIST_CHOICE_WHEEL,
  USER_HISTORY_LENGTH,
  WHEEL_RESULT,
} from 'utils/gameConfig';
import {
  InitWheelGame,
  GameStarted,
  UserBet,
  UserShow,
  GameEnd,
  CustomInitHistory,
} from './types';

declare let window;

const rightMenuHeight = 201;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    height: calc(100vh - ${rightMenuHeight + HEADER_HEIGHT * 2}px);
  }
`;

require('phaser');
require('../../../utils/dragonBones.bundle');
require('./main.bundle');

interface WheelPrevBet {
  currentGameState: UserHistory;
  bettedWallet: UserWallet;
  bettedUser: BettedUser[];
  betList: UserShow[][];
  totalBetAmountList: number[];
}

let prevBet: WheelPrevBet | undefined;

export const getResultIndexWheel = (result: number) => {
  let indexRS = 0;
  WHEEL_RESULT.some((arr, index) => {
    if (arr.includes(result)) {
      indexRS = index;
      return true;
    }
    return false;
  });
  return indexRS;
};

export default function WheelGame() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const currentWallet = useSelector(selectCurrentWallet);
  const autoBetList = useSelector(selectAutoBetList);
  const gameLimits = useSelector(selectGameLimits);
  const bettedUsers = useSelector(selectBettedUsers);
  const betData = useSelector(selectBetData);
  const [isGameReady, setIsGameReady] = useState(false);
  const [initData, setInitData] = useState({} as InitWheelGame);

  const choiceState = useRef(0);
  const isBettingState = useRef(false);
  const currentWalletState = useRef<UserWallet>({} as UserWallet);
  const bettedWalletState = useRef<UserWallet>({} as UserWallet);
  const currentMaxBetState = useRef(0);
  const currentGameState = useRef({} as UserHistory);
  const roundResultState = useRef('');
  const isWheeling = useRef(false);
  const currentUsername = useRef('');
  const resultIndexState = useRef(0);
  const autoBetListState = useRef<AutoBetItem[]>([]);
  const totalBetAmountList = useRef([0, 0, 0, 0]);
  const betListState = useRef<UserShow[][]>([[], [], [], []]);
  const isBettingTime = useRef(false);
  const betDataState = useRef({} as BetData);
  const gameStatusState = useRef({} as GameStatus);
  const userHistoryState = useRef<UserHistory[]>([]);
  // const gameHistoryState = useRef<GameHistory[]>([]);
  const initGame = useRef(false);
  const bettedUserState = useRef<BettedUser[]>([]);
  const gameLimitsState = useRef({} as GameLimits);
  const bettedUsersState = useRef<BettedUser[]>([]);

  const getMaxBet = (tChoice: number) =>
    Number(gameLimitsState.current[LIST_CHOICE_WHEEL[tChoice]]?.maxBet || 0);

  bettedWalletState.current = useSelector(
    selectWalletById(currentGameState.current.walletId),
  );

  useEffect(() => {
    const prevBetStorage = localStorage.getItem('prev_bet-wheel');
    prevBet = prevBetStorage && JSON.parse(prevBetStorage);
  }, []);

  // useEffect(() => {
  //   gameHistoryState.current = [...gameHistory];
  // }, [gameHistory]);

  useEffect(() => {
    currentWalletState.current = currentWallet;
  }, [currentWallet]);

  useEffect(() => {
    autoBetListState.current = [...autoBetList];
  }, [autoBetList]);

  useEffect(() => {
    betDataState.current = { ...betData };
  }, [betData]);

  useEffect(() => {
    emitBetAmount(betData.betAmount);
  }, [betData.betAmount]);

  useEffect(() => {
    emitIsAutobet(betData.autoBet);
  }, [betData.autoBet]);

  useEffect(() => {
    gameLimitsState.current = { ...gameLimits };
  }, [gameLimits]);

  useEffect(() => {
    bettedUsersState.current = [...bettedUsers];
    isBettingState.current = Boolean(bettedUsers.length);
    dispatch(setIsBetting(isBettingState.current));
  }, [bettedUsers]);

  const alertLimitBet = (currentAmount: number) => {
    const maxBet = getMaxBet(choiceState.current);

    dispatch(
      setToast({
        msg: (
          <>
            <strong>{LIST_CHOICE_WHEEL[choiceState.current]}</strong> max bet
            exceeded. Remaining amount:{' '}
            <strong>{maxBet - currentAmount}</strong>
          </>
        ),
        type: 'warn',
      }),
    );
  };

  const betResponse = data => {
    if (data === 'BET-OVER-LIMIT-TIMES') {
      dispatch(
        setToast({
          msg: '10 times bet exceeded',
          type: 'error',
        }),
      );
    }

    if (data === 'INTERNAL-ERROR') {
      dispatch(
        setToast({
          msg: 'Server error',
          type: 'error',
        }),
      );
    }
  };

  const placeBet = (
    choice: number = +betDataState.current.autoCashout,
    amount: number = +betDataState.current.betAmount,
  ) => {
    // others bet will use WalletId of first bet
    if (!currentGameState.current.walletId || !isBettingState.current) {
      currentGameState.current.walletId =
        currentWalletState.current.walletObj.id;
      dispatch(setBettedWalletId(currentGameState.current.walletId));
    }

    window.customSocketWheel.emit(
      'place-bet',
      +amount,
      +choice,
      currentGameState.current.walletId,
      betResponse,
    );
  };

  const validPlaceBet = () => {
    if (gameStatusState.current.status === 'STARTED') {
      const bettedAmount =
        bettedUserState.current.find(x => x.choice === choiceState.current)
          ?.betAmount || 0;

      if (
        betDataState.current.betAmount + bettedAmount >
        currentMaxBetState.current
      ) {
        alertLimitBet(bettedAmount);
        return;
      } else {
        placeBet(choiceState.current, betDataState.current.betAmount);
      }
    }
  };

  const addAutobet = () => {
    // update autobet amount
    let tempList = [...autoBetListState.current];
    let isExist = false;

    tempList = tempList.map(x => {
      if (x.choice === +choiceState.current) {
        isExist = true;

        const newBetAmount = x.totalAmount + betDataState.current.betAmount;
        if (newBetAmount > currentMaxBetState.current) {
          alertLimitBet(x.totalAmount);
          return x;
        }

        let updated = { ...x };
        updated.totalAmount += betDataState.current.betAmount;
        return updated;
      }
      return x;
    });

    if (!isExist) {
      if (betDataState.current.betAmount > currentMaxBetState.current) {
        alertLimitBet(0);
        return;
      } else {
        tempList.unshift({
          choice: +choiceState.current,
          totalAmount: +betDataState.current.betAmount,
        });
      }
    }

    dispatch(setAutoBetList(tempList));

    // bet when Betting time
    const betData = {} as BetData;
    betData.betAmount = betDataState.current.betAmount;
    betData.autoCashout = choiceState.current;
    dispatch(setBetData({ ...betDataState.current }));
    validPlaceBet();
  };

  const emitBetAmount = (amount: number) => {
    emitCustomEvent('wheel-amount-change', amount || 0);
  };

  const emitIsAutobet = (isAutobet: boolean) => {
    emitCustomEvent('wheel-auto-bet', isAutobet);
  };

  const emitClickChoice = (e: any) => {
    const choice = Number(e.detail || 0);
    choiceState.current = choice;
    currentMaxBetState.current = getMaxBet(choice);

    if (!betDataState.current.betAmount) {
      dispatch(
        setToast({
          msg: 'Please input Bet amount first',
          type: 'warn',
        }),
      );
      return;
    }

    if (betDataState.current.autoBet) {
      emitCustomEvent('wheel-click-choice', choice);
      addAutobet();
    } else {
      validPlaceBet();
    }
  };

  const gameReadyFunc = () => {
    setIsGameReady(true);
  };

  const initGameData = (err, data: InitWheelGame) => {
    setInitData(data);
    const gameId = data.roundId + '';

    // get previous bet state when reloading
    if (prevBet && gameId === prevBet.currentGameState.gameNumber) {
      currentGameState.current = { ...prevBet.currentGameState };
      bettedUserState.current = [...prevBet.bettedUser];
      currentGameState.current.walletId = prevBet.bettedWallet.walletObj.id;
      dispatch(setBettedWalletId(currentGameState.current.walletId));

      dispatch(
        setWalletBalance({
          walletId: prevBet.bettedWallet.walletObj.id,
          balance: prevBet.bettedWallet.walletObj.balance,
        }),
      );

      dispatch(setBettedUsers(prevBet.bettedUser));
      betListState.current = [...prevBet.betList];
      totalBetAmountList.current = [...prevBet.totalBetAmountList];
    }

    dispatch(setIsLoadingGame(false));
    initGame.current = true;
    isWheeling.current = false;

    const mapLimits = getMapLimits(data.setting);
    dispatch(setGameLimits(mapLimits));

    gameStatusState.current = { ...gameStatusState.current };
    gameStatusState.current.status = data.state;
    dispatch(setGameStatus(gameStatusState.current));

    currentUsername.current = data.username;
    currentGameState.current = { ...currentGameState.current };
    currentGameState.current.gameNumber = gameId;
    currentGameState.current.time = data.created;

    // map Game history
    // gameHistoryState.current = [];
    // let tempGame: GameHistory;
    // if (data.gameHistory?.[0]) {
    //   for (
    //     let i = 0;
    //     i <
    //     (data.gameHistory.length < gameHistoryLength
    //       ? data.gameHistory.length
    //       : gameHistoryLength);
    //     i++
    //   ) {
    //     const x = data.gameHistory[i];
    //     const resultIndex = getResultIndexWheel(x.result);

    //     tempGame = {} as GameHistory;
    //     tempGame.result = resultIndex;
    //     tempGame.roundId = x.roundId;
    //     tempGame.created = x.created;
    //     gameHistoryState.current.push(tempGame);
    //   }
    // }
    // dispatch(setGameHistory(gameHistoryState.current));

    // sum multi user's bet to one
    let sumHistoryList: CustomInitHistory[] = [];
    data.history?.forEach(x => {
      const object = sumHistoryList.find(y => y.id === x.id);
      if (object) {
        object.amount += x.amount;
        object.payout += x.payout;
        object.betAmountList[x.choice] = x.amount;
      } else {
        let betAmountList = [0, 0, 0, 0];
        betAmountList[x.choice] = x.amount;
        sumHistoryList.push({ ...x, betAmountList });
      }
    });

    // map User history
    let tempUser: UserHistory;
    userHistoryState.current = [];
    if (sumHistoryList.length > 0) {
      for (
        let i = 0;
        i <
        (sumHistoryList.length < USER_HISTORY_LENGTH
          ? sumHistoryList.length
          : USER_HISTORY_LENGTH);
        i++
      ) {
        const x = sumHistoryList[i];
        const resultIndex = getResultIndexWheel(x.result);
        tempUser = {} as UserHistory;
        tempUser.betAmount = x.amount;
        tempUser.userChoice = x.choice;
        tempUser.crash = resultIndex;
        tempUser.walletId = x.walletid;
        tempUser.gameNumber = x.refid;
        tempUser.time = x.created;
        tempUser.cashOut = x.payout;
        tempUser.serverSeed = x.hash;
        tempUser.isJackpot = x.isJackpot;
        tempUser.extraGameData = { betAmountList: x.betAmountList };
        tempUser.jackpotWinAmount =
          x.jackpotMultiply * x.betAmountList[resultIndex];
        tempUser.jackpotTotalAmount = x.jackpotAmount;
        userHistoryState.current.push(tempUser);
      }
    }
    dispatch(setUserHistory(userHistoryState.current));
  };

  const onGameStarted = (data: GameStarted) => {
    // game status
    gameStatusState.current = { ...gameStatusState.current };
    gameStatusState.current.status = 'STARTED';
    dispatch(setGameStatus(gameStatusState.current));

    // autobet
    autoBetListState.current?.forEach(x => {
      placeBet(x.choice, x.totalAmount);
    });

    isBettingTime.current = true;

    currentGameState.current = { ...currentGameState.current };
    currentGameState.current.gameNumber = data.game_refid;
    currentGameState.current.time = data.created_time;
    currentGameState.current.cashOut = 0;

    betListState.current = [[], [], [], []];
    totalBetAmountList.current = [0, 0, 0, 0];

    bettedUserState.current = [];
    dispatch(setBettedUsers([]));

    isBettingState.current = false;
    dispatch(setIsBetting(false));
  };

  const onPlayersBet = (data: UserBet) => {
    let user = {} as UserShow;
    user.avatar = data.avatar;
    user.username = data.username;
    user.betAmount = data.amount;

    const choice = +data.choice;
    betListState.current[choice].push(user);
    if (betListState.current[choice].length > 10) {
      betListState.current[choice].length = 10;
    }

    if (data.username === currentUsername.current) {
      // update choice
      currentGameState.current = { ...currentGameState.current };
      currentGameState.current.userChoice = +data.choice;
      totalBetAmountList.current[choice] += data.amount;

      // update Betted List
      let isExist = false;
      bettedUserState.current = bettedUserState.current.map(x => {
        if (x.choice === +data.choice) {
          isExist = true;
          let updated = { ...x };
          updated.betAmount += +data.amount;
          return updated;
        }
        return x;
      });
      if (!isExist) {
        const newBet = {} as BettedUser;
        newBet.username = data.username;
        newBet.choice = +data.choice;
        newBet.betAmount = +data.amount;
        bettedUserState.current.unshift(newBet);
      }
      dispatch(setBettedUsers(bettedUserState.current));

      // update balance
      const newBalance =
        bettedWalletState.current.walletObj.balance - Number(data.amount);

      dispatch(
        setWalletBalance({
          walletId: currentGameState.current.walletId,
          balance: newBalance,
        }),
      );

      setPreviousState();
    }
  };

  // start spinning Wheel
  const onGameEnd = async (data: GameEnd) => {
    gameStatusState.current = { ...gameStatusState.current };
    gameStatusState.current.status = 'ENDED';
    dispatch(setGameStatus(gameStatusState.current));

    // total bet amount
    const totalBetAmount = totalBetAmountList.current?.reduce(
      (total, x) => total + x,
      0,
    );
    currentGameState.current = { ...currentGameState.current };
    currentGameState.current.betAmount = totalBetAmount;

    const resultIndex = getResultIndexWheel(data.gameResult);
    resultIndexState.current = resultIndex;
    roundResultState.current = LIST_CHOICE_WHEEL[resultIndex];

    isWheeling.current = true;
    dispatch(setIsBetting(true));

    currentGameState.current = { ...currentGameState.current };
    currentGameState.current.crash = resultIndexState.current;
    currentGameState.current.serverSeed = data.hash;
    currentGameState.current.isJackpot = data.isJackpot;
    currentGameState.current.extraGameData = {
      betAmountList: totalBetAmountList.current,
    };
    currentGameState.current.jackpotWinAmount =
      data.jackpotMultiply * totalBetAmountList.current[resultIndex];
    currentGameState.current.jackpotTotalAmount = data.jackpotAmount;

    // remove the previous state when server has the result
    localStorage.removeItem('prev_bet-wheel');
  };

  const onWheelStopped = () => {
    isWheeling.current = false;

    if (!currentGameState.current.gameNumber) {
      return;
    }

    // win amount
    if (currentGameState.current.betAmount > 0) {
      let win =
        totalBetAmountList.current[resultIndexState.current] *
        parseInt(roundResultState.current);

      win += currentGameState.current.isJackpot
        ? currentGameState.current.jackpotWinAmount
        : 0;

      currentGameState.current.cashOut = win;

      // const loss = totalBetAmountList.current.reduce(
      //   (total, amount, index) =>
      //     index !== resultIndexState.current ? total + amount : total,
      //   0,
      // );
    }

    // set User history
    if (currentGameState.current.betAmount > 0) {
      // history Single bet color
      userHistoryState.current = [...userHistoryState.current];
      userHistoryState.current.unshift(currentGameState.current);
      if (userHistoryState.current.length > USER_HISTORY_LENGTH) {
        userHistoryState.current.length = USER_HISTORY_LENGTH;
      }
      dispatch(setUserHistory(userHistoryState.current));

      // update user balance
      if (currentGameState.current.cashOut > 0) {
        dispatch(
          setWalletBalance({
            walletId: bettedWalletState.current?.walletObj.id,
            balance:
              Number(bettedWalletState.current?.walletObj.balance) +
              currentGameState.current.cashOut,
          }),
        );
      }
    }

    // set Game History
    // let newHistory = {} as GameHistory;
    // newHistory.roundId = +currentGameState.current.gameNumber;
    // newHistory.created = currentGameState.current.time;
    // newHistory.result = currentGameState.current.crash;
    // let tempGameHistory = [...gameHistoryState.current];
    // tempGameHistory.unshift(newHistory);
    // if (tempGameHistory.length > gameHistoryLength) {
    //   tempGameHistory.length = gameHistoryLength;
    // }
    // gameHistoryState.current = tempGameHistory;
    // dispatch(setGameHistory(tempGameHistory));
  };

  const onGameError = error => {
    dispatch(
      setToast({
        msg: ERROR_MESSAGES[error] || 'Something went wrong',
        type: 'error',
      }),
    );
  };

  useEffect(() => {
    if (currentWallet.walletObj.id && isGameReady) {
      const walletId =
        currentGameState.current.walletId || currentWallet.walletObj.id;
      emitCustomEvent('update-wallet', walletId);
    }
  }, [currentWallet, isGameReady]);

  const onConnection = () => {
    window.customSocketWheel.emit('authenticate', initGameData);
  };

  // save state for reloading url
  const setPreviousState = () => {
    const prevBet: WheelPrevBet = {
      currentGameState: currentGameState.current,
      bettedWallet: bettedWalletState.current,
      bettedUser: bettedUserState.current,
      betList: betListState.current,
      totalBetAmountList: totalBetAmountList.current,
    };
    localStorage.setItem('prev_bet-wheel', JSON.stringify(prevBet));
  };

  useEffect(() => {
    if (token && window.customSocketWheel) {
      window.customSocketWheel.auth.token = `Bearer ${token}`;
      window.customSocketWheel.disconnect().connect();
    }
  }, [token]);

  useEffect(() => {
    if (isGameReady && window.customSocketWheel && initData.roundId) {
      emitCustomEvent('join', initData);
    }
  }, [isGameReady, initData]);

  // init
  useEffect(() => {
    emitCustomEvent('init-wheel', '');
    window.addEventListener('ready-game', gameReadyFunc);
    window.addEventListener('wheel-stopped', onWheelStopped);
    window.addEventListener('wheel-click-bet', emitClickChoice);

    window.customSocketWheel = io(
      process.env.REACT_APP_WHEEL_GAME_ENDPOINT + '',
      {
        reconnectionDelayMax: SOCKET_TIMEOUT,
        withCredentials: WITH_CREDENTIALS_SOCKET,
        auth: {
          token: token ? `Bearer ${token}` : 'no-token',
        },
      },
    );
    window.customSocketWheel.once('connect', onConnection);
    window.customSocketWheel.on('round-started', onGameStarted);
    window.customSocketWheel.on('player-bet', onPlayersBet);
    window.customSocketWheel.on('round-end', onGameEnd);
    window.customSocketWheel.on('socket-error', onGameError);
    window.customSocketWheel.on('error', onGameError);

    return () => {
      window.customSocketWheel.disconnect();
      window.customSocketWheel = null;
      window.removeEventListener('ready-game', gameReadyFunc);
      window.removeEventListener('wheel-stopped', onWheelStopped);
      window.removeEventListener('wheel-click-bet', emitClickChoice);
      emitCustomEvent('destroyEngine', '');
    };
  }, []);

  return <Wrapper id="game-player-wrap"></Wrapper>;
}
