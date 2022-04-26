import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.components.TableGameHistory;

export const messages = {
  jackpot: () => _t(scope.jackpot, 'Jackpot'),
  gameNumber: () => _t(scope.gameNumber, 'Game Number'),
  time: () => _t(scope.time, 'Time'),
  on: () => _t(scope.on, 'on'),
  at: () => _t(scope.at, 'at'),
  crash: () => _t(scope.crash, 'Crash'),
  result: () => _t(scope.result, 'Result'),
  cardsPlayed: () => _t(scope.cardsPlayed, 'Cards Played'),
  betAmount: () => _t(scope.betAmount, 'Bet Amount'),
  cashOut: () => _t(scope.cashOut, 'Cash out'),
  yourProfit: () => _t(scope.yourProfit, 'Your Profit'),
  verification: () => _t(scope.verification, 'Verification'),
  verify: () => _t(scope.verify, 'Verify'),
  fairResult: () => _t(scope.fairResult, 'Fair Result'),
  clientSeed: () => _t(scope.clientSeed, 'Client Seed'),
  serverSeed: () => _t(scope.serverSeed, 'Server Seed'),
  calculateFair: () => _t(scope.calculateFair, 'Calculation Breakdown'),
  rotateSeedPair: () => _t(scope.rotateSeedPair, 'Rotate Seed Pair To Verify'),
};
