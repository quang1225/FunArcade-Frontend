export interface InitCrashGame {
  state: string;
  player_info: Playerinfo;
  game_id: number;
  last_hash: string;
  max_win: number;
  elapsed: number;
  created: string;
  joined: any[];
  chat: any[];
  history: History[];
  username: string;
  balance_satoshis: number;
  setting: Setting;
}

export interface CrashHistoryExtraData {}

interface Setting {
  maxbet: string;
  maxwin: string;
}

interface History {
  refid: string;
  walletid: string;
  id: number;
  hash: string;
  created: string;
  bet: number;
  cash_out?: number;
  game_crash: number;
}

interface Playerinfo {
  [x: string]: PlayerinfoDetail;
}

interface PlayerinfoDetail {
  bet: number;
  stopped_at?: number;
}

export interface GameStarting {
  game_refid: string;
  game_id: number;
  created_time: string;
  start_time: string;
  max_win: string;
  max_bet: string;
  time_till_start: number;
}

export interface GameStarted {
  [username: string]: number;
}

export interface UserCrash {
  username: string;
  stopped_at: number;
}

export interface PlayerBet {
  username: string;
  betAmount: number;
  autoCashout: number;
  index: number;
}

export interface GameCrash {
  forced: boolean;
  elapsed: number;
  game_crash: number;
  bonuses: Bonuses;
  hash: string;
}

interface Bonuses {}
