import { translations } from 'locales/translations';
import { APP_TITLE } from 'utils/constants';
import { _t } from 'utils/messages';

export const scope = translations.pages.GamePage;

export const messages = {
  betColors: () => _t(scope.betColors, 'Bet colors'),
  cancelAutoBet: () => _t(scope.cancelAutoBet, 'Cancel auto bet'),
  currentBetList: () => _t(scope.currentBetList, 'Current bet list'),
  autoBetList: () => _t(scope.autoBetList, 'Auto bet list'),
  autoBetting: () => _t(scope.autoBetting, 'Auto bet is running...'),
  startAutoBet: () => _t(scope.startAutoBet, 'Start auto bet'),
  notEnoughBalance: () => _t(scope.notEnoughBalance, 'Not enough balance'),
  loginToPlay: () => _t(scope.loginToPlay, 'Login to play'),
  gameHistory: () => _t(scope.gameHistory, 'Game History'),
  gameChat: () => _t(scope.gameChat, 'Game Chat'),
  globalChat: () => _t(scope.globalChat, 'Global Chat'),
  viewAll: () => _t(scope.singleGameTitle, 'View all'),
  currentBet: () => _t(scope.currentBet, 'Current Bet'),
  autoBet: () => _t(scope.autoBet, 'Auto Bet'),
  placeBet: () => _t(scope.placeBet, 'Place bet'),
  placeAutoBet: () => _t(scope.placeAutoBet, 'Place auto bet'),
  placeBetNow: () => _t(scope.placeBetNow, 'Place bet now'),
  placeBetNext: () => _t(scope.placeBetNext, 'Place bet for next round'),
  cancelBet: () => _t(scope.cancelBet, 'Cancel bet'),
  cashOut: () => _t(scope.cashOut, 'Cash out'),
  gameplay: () => _t(scope.gameplay, 'Gameplay'),
  betAmount: () => _t(scope.betAmount, 'Bet amount *'),
  autoCashOut: () => _t(scope.autoCashOut, 'Auto cashout (min 1.1)'),
  typeYourMsg: () => _t(scope.typeYourMsg, 'Type your message'),
  howToPlay: () => _t(scope.howToPlay, 'How To Play'),
  start: () => _t(scope.start, 'Start'),
  round: () => _t(scope.round, 'Round'),
  dontShowFirstGameplay: () =>
    _t(scope.dontShowFirstGameplay, `Don't show for this game next time`),
  pickChoice: () => _t(scope.pickChoice, 'Pick  2x / 3x / 5x / 5x'),
  waiting: () => _t(scope.waiting, 'Waiting for next round...'),
  maxWin: () => _t(scope.maxWin, 'Max win'),
  maxBet: () => _t(scope.maxBet, 'Max bet'),
  maxBetExceeded: () => _t(scope.maxBetExceeded, 'Max bet exceeded'),
  loginToChat: () => _t(scope.loginToChat, 'Login to chat'),
  crashAutobetConfirmText: () =>
    _t(
      scope.crashAutobetConfirmText,
      `Turning Auto Bet on will instantly place a bet for you now, and all subsequent rounds. You may turn this off at any time, but bets placed for the current round may not be cancelled.
  Proceed anyway?`,
    ),
  wheelAutobetConfirmText: () =>
    _t(
      scope.wheelAutobetConfirmText,
      `You can now play auto bet by the ${APP_TITLE} system`,
    ),
};
