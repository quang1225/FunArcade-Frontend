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
  table_history: Tablehistory[];
  username: string;
  balance_satoshis: number;
}

export interface Tablehistory {
  game_id: number;
  game_crash: number;
  created: string;
  player_info: Playerinfo;
  hash: string;
}

interface History {
  id: number;
  hash: string;
  created: string;
  bet: number;
  cash_out?: number;
  game_crash: number;
}

interface Playerinfo {}

export interface GameStarting {
  game_id: number;
  max_win: number;
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
