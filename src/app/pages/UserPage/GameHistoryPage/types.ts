export interface GameHistoryRes {
  totalCount: string;
  pageSize: number;
  data: History[];
}

interface History {
  source: string;
  gameId: string;
  gameMetaData: CrashGameData | WheelGameData | HiloGameData | RoadGameData;
  playMetaData: CrashPlayData | WheelPlayData | HiloPlayData | RoadPlayData;
  betCount: string;
  betAmount: number;
  cashOut: number;
}

export interface CrashGameData {
  gameId: string;
  gameTime: string;
  crashPoint: number;
}

export interface CrashPlayData {
  gameId: string;
  payout: number;
  playId: number;
  userId: string;
  playTime: string;
  betAmount: number;
  cashOutAt: number;
  autoCashout: number;
}

export interface WheelGameData {
  gameId: string;
  result: number;
  gameTime: string;
  isJackpot: boolean;
}

export interface WheelPlayData {
  gameId: string;
  payout?: any;
  playId: number;
  result: number;
  userId: string;
  choices: number[];
  gameTime: string;
  playTime: string;
  betAmount: number;
  isJackpot: boolean;
  jackpotAmount?: any;
  jackpotMultiply: number;
}

export interface HiloGameData {
  gameId: string;
  source: string;
  gameTime: string;
  gameNumber: number;
}

export interface HiloPlayData {
  gameId: string;
  playId: string;
  userId: string;
  cashOut: number;
  playTime: string;
  betAmount: string;
  cardsPlayed: number;
}

export interface RoadGameData {
  gameId: string;
  source: string;
  gameTime: string;
  gameNumber: number;
}

export interface RoadPlayData {
  level: number;
  gameId: string;
  userId: string;
  cashOut: number;
  playTime: string;
  betAmount: string;
}
