export interface InitWheelGame {
  state: string;
  playerInfo: PlayerInfo;
  roundId: number;
  lastHash: string;
  maxWin: number;
  elapsed: number;
  created: string;
  joined: any[][];
  username: string;
  balance: number;
  history: InitHistory[];
  gameStatus: string;
  gameBettingDuration: number;
  gameRestartDuration: number;
  gameTillRestart: number;
  gameHistory: GameHistory[];
  gameFourWayJackpot: GameFourWayJackpot;
  setting: Setting;
  gamePlayers: GamePlayers[];
}

interface GamePlayers {
  arr: GamePlayerDetail[];
}

interface GamePlayerDetail {
  choice: number;
  amount: number;
  username: string;
  openId: string;
  gameId: string;
  roundId: number;
  playTime: string;
  playId: number;
  isJackpot: boolean;
  avatar: string;
  status: string;
}

interface Setting {
  [x: string]: Limit;
}

interface Limit {
  maxbet: string;
}

interface GameFourWayJackpot {
  [x: number]: number;
}

export interface WheelHistoryExtraData {
  betAmountList: number[];
}
export interface InitHistory {
  id: number;
  refid: string;
  walletid: string;
  created: string;
  result: number;
  amount: number;
  choice: number;
  payout: number;
  hash: string;
  isJackpot: boolean;
  jackpotMultiply: number;
  jackpotAmount: number;
}

export interface CustomInitHistory extends InitHistory, WheelHistoryExtraData {}

export interface JackpotJoin {
  choice: number;
  amount: number;
}

interface PlayerInfo {}
export interface GameHistory {
  roundId: number;
  refid: string;
  result: number;
  created: string;
  hash: string;
}

interface PlayerInfo {}

export interface UserBet {
  choice: number;
  amount: number;
  username: string;
  openId: string;
  avatar: string;
  roundId: string;
  playId: string;
  index: number;
}

export interface UserShow {
  username: string;
  avatar: string;
  betAmount: number;
}

export interface GameStarted {
  game_id: number;
  game_refid: string;
  created_time: string;
  time_till_end: number;
}

export interface GameEnd {
  elapsed: number;
  gameResult: number;
  hash: string;
  isJackpot: boolean;
  jackpotMultiply: number;
  jackpotAmount: number;
}

export interface CalcButton {
  text: string;
  func: any;
  isGlow: boolean;
}
