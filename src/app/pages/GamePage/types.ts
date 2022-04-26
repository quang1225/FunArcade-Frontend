import { ActionType } from 'typesafe-actions';
import * as actions from './redux/actions';

export interface AutoBetItem {
  choice: number;
  totalAmount: number;
}

export interface BetData {
  betAmount: number;
  autoCashout: number;
  autoBet: boolean;
}

export interface GamePageState {
  detectClickBet: boolean;
  detectClickCancel: boolean;
  detectClickConfirmAutobet: boolean;
  showAutobetPopup: boolean;
  isBetting: boolean;
  isBetDisabled: boolean;
  isCashoutDisabled: boolean;
  isLoadingGame: boolean;
  isPreBet: boolean;
  isAutoBet: boolean;
  gameHistory: GameHistory[];
  gameStatus: GameStatus;
  bettedUsers: BettedUser[];
  betData: BetData;
  cashoutAmount: number;
  autoBetList: AutoBetItem[];
  expandMobile: boolean;
  detectClickGameplay: boolean;
  detectClickGameChat: boolean;
  gameLimits: GameLimits;
  bettedWalletId: string;
}

export interface SingleLimitDetail {
  maxBet?: number;
  maxWin?: number;
}
export interface MultiLimitDetail {
  [x: string]: SingleLimitDetail;
}
export type GameLimits = SingleLimitDetail | MultiLimitDetail;

export interface SingleLimitRes {
  maxbet?: string;
  maxwin?: string;
}
export interface MultiLimitRes {
  [x: string]: SingleLimitRes;
}
export type GameLimitsRes = SingleLimitRes | MultiLimitRes;

export interface GameHistory {
  roundId: number;
  result: number;
  created: string;
}

export interface GameStatus {
  status: string;
  result: string;
  hash: string;
}

export interface BettedUser {
  username: string;
  crashAt: number;
  betAmount: number;
  choice: number;
  profit: number;
}

export type GamePageAction = ActionType<typeof actions>;
