import { initialState } from './reducer';
import { GamePageState } from '../types';
import { ApplicationRootState } from 'app/types';
import { createSelector } from '@reduxjs/toolkit';

export const selectGamePage = (state: ApplicationRootState) =>
  state?.gamePage || initialState;

export const selectOnClickBet = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.detectClickBet,
);

export const selectOnClickCancel = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.detectClickCancel,
);

export const selectOnClickConfirmAutobet = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.detectClickConfirmAutobet,
);

export const selectShowAutobetPopup = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.showAutobetPopup,
);

export const selectIsBeting = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.isBetting,
);

export const selectIsBetDisabled = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.isBetDisabled,
);

export const selectIsCashoutDisabled = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.isCashoutDisabled,
);

export const selectIsLoadingGame = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.isLoadingGame,
);

export const selectIsPreBet = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.isPreBet,
);

export const selectIsAutoBet = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.isAutoBet,
);

export const selectGameHistory = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.gameHistory,
);

export const selectGameStatus = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.gameStatus,
);

export const selectBettedUsers = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.bettedUsers,
);

export const selectBetData = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.betData,
);

export const selectCashoutAmount = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.cashoutAmount,
);

export const selectAutoBetList = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.autoBetList,
);

export const selectExpandMobile = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.expandMobile,
);

export const selectDetectClickGameplay = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.detectClickGameplay,
);

export const selectDetectClickGameChat = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.detectClickGameChat,
);

export const selectGameLimits = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.gameLimits,
);

export const selectBettedWalletId = createSelector(
  selectGamePage,
  (gamePageState: GamePageState) => gamePageState.bettedWalletId,
);
