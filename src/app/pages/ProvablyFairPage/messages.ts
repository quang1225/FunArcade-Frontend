import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.pages.ProvablyFairPage;

export const messages = {
  provablyFair: () => _t(scope.provablyFair, 'Provably Fair'),
  overview: () => _t(scope.overview, 'Overview'),
  calculation: () => _t(scope.calculation, 'Calculation'),
  game: () => _t(scope.game, 'Game'),
  clientSeed: () => _t(scope.clientSeed, 'Client Seed'),
  serverSeed: () => _t(scope.serverSeed, 'Server Seed'),
  hashedServerSeed: () => _t(scope.hashedServerSeed, 'Hashed Server Seed'),
  finalResult: () => _t(scope.finalResult, 'Final Result'),
  luckyJackpot: () => _t(scope.luckyJackpot, 'Lucky Jackpot'),
  seedsToHex: () => _t(scope.seedsToHex, 'Casino Seeds to Hexadecimals'),
  hexToDec: () => _t(scope.hexToDec, 'Hexadecimals to Decimal'),
  rawToEdged: () => _t(scope.rawToEdged, 'Raw to Edged'),
  fomrula: () =>
    _t(scope.fomrula, 'fair result = operators input + players input'),
  notRevealedYet: () => _t(scope.notRevealedYet, `not revealed yet`),
  generalOverview: () => _t(scope.generalOverview, 'General Overview'),
  example: () => _t(scope.example, 'Example'),
  overviewHeaderText: () =>
    _t(
      scope.overviewHeaderText,
      'Provably Fair: Creating a ‘trust-less’ environment for online gaming',
    ),
  overviewText1: () =>
    _t(
      scope.overviewText1,
      `The underlying concept of provable fairness is that players have the
      ability to prove and verify that their results are fair and
      un-manipulated. This is achieved through the use of a commitment
      scheme and cryptographic hashing.`,
    ),
  overviewText2: () =>
    _t(
      scope.overviewText2,
      `The commitment scheme is used to ensure that the player has an
      influence on all results generated. Cryptographic hashing is used to
      ensure that the casino also remains honest to this commitment
      scheme. Both concepts combine to create a casino environment where
      the user does not have to worry about fraud in game results.`,
    ),
  overviewText3: () =>
    _t(
      scope.overviewText3,
      `This is simplified in the following representation:`,
    ),
  overviewText4: () =>
    _t(
      scope.overviewText4,
      `Use these links to independently verify game results:`,
    ),
  overviewText5: () => _t(scope.overviewText5, `Verify Casino Seeds here:`),
  overviewText6: () =>
    _t(
      scope.overviewText6,
      `Client Seeds are entered in the “Plain Text to Compute Hash”
    field. Server Seeds are entered in the “Secret Key” field. Select
    the “SHA-256” hash function. For games with Game and Round
    numbers, input data in the “Plain Text to Compute Hash” field in
    this format:`,
    ),
  overviewText7: () => _t(scope.overviewText7, `Verify Server Seeds here:`),
  overviewText8: () =>
    _t(
      scope.overviewText8,
      `Input the server seed of the current game in the Input field and
  select input type “Text”. Hash it to get the server seed of the
  previous game.`,
    ),
  overviewText9: () =>
    _t(scope.overviewText9, `Hexadecimal to Decimal converter:`),
  overviewText10: () =>
    _t(
      scope.overviewText10,
      `For detailed information about our implementation of Provably Fair
  principles, please refer to the Provably Fair section in our
  GitBook: ____________________`,
    ),
};
