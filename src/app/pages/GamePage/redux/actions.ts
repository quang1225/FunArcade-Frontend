import {
  SET_CLICK_BET,
  SET_CLICK_CANCEL,
  SET_IS_BETTING,
  SET_GAME_HISTORY,
  SET_GAME_STATUS,
  SET_BETTED_USERS,
  SET_IS_PRE_BET,
  SET_BET_DATA,
  SET_AUTO_BET,
  SET_IS_LOADING_GAME,
  SET_AUTO_BET_LIST,
  SET_BET_DISABLED,
  SET_CASHOUT_DISABLED,
  SET_CASHOUT_AMOUNT,
  SET_DETECT_CLICK_GAMEPLAY,
  SET_DETECT_CLICK_GAME_CHAT,
  SET_EXPAND_MOBILE,
  SET_GAME_LIMITS,
  SET_BETTED_WALLET_ID,
  SET_CLICK_CONFIRM_AUTOBET,
  SET_SHOW_AUTOBET_POPUP,
} from './constants';
import {
  GameHistory,
  GameStatus,
  BettedUser,
  BetData,
  AutoBetItem,
  GameLimits,
} from '../types';
import { action } from 'typesafe-actions';

export const setBetData = (value: BetData) => action(SET_BET_DATA, value);
export const setClickBet = (value: boolean) => action(SET_CLICK_BET, value);
export const setClickConfirmAutobet = (value: boolean) =>
  action(SET_CLICK_CONFIRM_AUTOBET, value);
export const setShowAutobetPopup = (value: boolean) =>
  action(SET_SHOW_AUTOBET_POPUP, value);
export const setIsLoadingGame = (value: boolean) =>
  action(SET_IS_LOADING_GAME, value);
export const setClickCancel = (value: boolean) =>
  action(SET_CLICK_CANCEL, value);
export const setIsBetting = (value: boolean) => action(SET_IS_BETTING, value);
export const setIsBetDisabled = (value: boolean) =>
  action(SET_BET_DISABLED, value);
export const setIsCashoutDisabled = (value: boolean) =>
  action(SET_CASHOUT_DISABLED, value);
export const setIsPreBet = (value: boolean) => action(SET_IS_PRE_BET, value);
export const setAutoBet = (value: boolean) => action(SET_AUTO_BET, value);
export const setGameHistory = (value: GameHistory[]) =>
  action(SET_GAME_HISTORY, value);
export const setGameStatus = (value: GameStatus) =>
  action(SET_GAME_STATUS, value);
export const setBettedUsers = (value: BettedUser[]) =>
  action(SET_BETTED_USERS, value);
export const setAutoBetList = (value: AutoBetItem[]) =>
  action(SET_AUTO_BET_LIST, value);
export const setCashoutAmount = (value: number) =>
  action(SET_CASHOUT_AMOUNT, value);
export const setExpandMobile = (value: boolean) =>
  action(SET_EXPAND_MOBILE, value);
export const setDetectClickGameplay = (value: boolean) =>
  action(SET_DETECT_CLICK_GAMEPLAY, value);
export const setDetectClickGameChat = (value: boolean) =>
  action(SET_DETECT_CLICK_GAME_CHAT, value);
export const setGameLimits = (value: GameLimits) =>
  action(SET_GAME_LIMITS, value);
export const setBettedWalletId = (value: string) =>
  action(SET_BETTED_WALLET_ID, value);
