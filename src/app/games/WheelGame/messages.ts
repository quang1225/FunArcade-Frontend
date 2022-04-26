import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.games.WheelGame;

export const messagesWheel = {
  result: () => _t(scope.result, 'Result'),
  roundNumber: () => _t(scope.roundNumber, 'Round number'),
  luckyJackpot: () => _t(scope.luckyJackpot, 'Lucky Jackpot'),
  players: () => _t(scope.players, 'players'),
  bettingTime: () => _t(scope.bettingTime, 'Betting time...'),
  nextRoundIn: () => _t(scope.nextRoundIn, 'Next round in'),
  loadingGame: () => _t(scope.loadingGame, 'Loading...'),
};
