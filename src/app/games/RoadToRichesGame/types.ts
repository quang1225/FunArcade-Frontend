export interface GameHistory {
  id: string;
  walletId: string;
  seedId: string;
  gameNumber: number;
  level: number;
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
  result: number;
  selectedPosition: number;
  multiplier: string;
  createdAt: string;
  updatedAt: string;
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
