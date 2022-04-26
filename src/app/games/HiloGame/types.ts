export interface InitData {
  ongoingGame?: OngoingGame;
  history: GameHistory[];
  setting: Setting;
}

interface Setting {
  maxbet: string;
  maxwin: string;
}
export interface GameHistory {
  id: string;
  walletId: string;
  seedId: string;
  gameNumber: number;
  startCard: number;
  betAmount: string;
  multiplier: string;
  payout: string;
  isEnded: boolean;
  createdAt: string;
  updatedAt: string;
  seed: Seed;
  rounds: Round[];
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

export interface OngoingGame {
  id: string;
  seedId: string;
  gameNumber: number;
  startCard: number;
  betAmount: string;
  multiplier: string;
  payout: string;
  isEnded: boolean;
  createdAt: string;
  updatedAt: string;
  rounds: any[];
  seed: Seed;
}

interface Seed {
  id: string;
  userId: string;
  serverSeed: string;
  clientSeed: string;
  nextServerSeed: string;
  nextClientSeed: string;
  isRotated: boolean;
  createdAt: string;
  updatedAt: string;
}
