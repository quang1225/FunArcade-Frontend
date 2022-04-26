export interface HiloVerifyDataRes {
  id: string;
  gameNumber: number;
  startCard: number;
  betAmount: string;
  multiplier: string;
  payout: string;
  isEnded: boolean;
  createdAt: string;
  updatedAt: string;
  rounds: Round[];
  seed: Seed;
}

interface Seed {
  clientSeed: string;
  serverSeed?: any;
  hashedServerSeed: string;
}

interface Round {
  id: string;
  gameId: string;
  card: number;
  guess: string;
  selectedPosition: number;
  multiplier: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoadVerifyDataRes {
  id: string;
  gameNumber: number;
  level: number;
  betAmount: string;
  multiplier: string;
  payout: string;
  isEnded: boolean;
  createdAt: string;
  updatedAt: string;
  rounds: Round[];
  seed: Seed;
}

interface Seed {
  clientSeed: string;
  serverSeed?: any;
  hashedServerSeed: string;
}

interface Round {
  id: string;
  gameId: string;
  result: number;
  selectedPosition: number;
  multiplier: string;
  createdAt: string;
  updatedAt: string;
}

export interface CrashVerifyDataRes {
  id: number;
  hash: string;
  created: string;
  bet: number;
  cash_out: number;
  game_crash: number;
  clientHash: string;
}

export interface WheelVerifyDataRes {
  id: number;
  hash: string;
  created: string;
  amount: number;
  win: number;
  game_crash: number;
  clientHash: string;
}

export interface RotateSeedPairRes {
  userId: string;
  clientSeed: string;
  lastClientSeed: string;
  lastServerSeed: string;
  hashedServerSeed: string;
}
