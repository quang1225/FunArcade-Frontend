import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.pages.HomePage;

export const messages = {
  homepage: () => _t(scope.homepage, 'Home Page'),
  firstText: () => _t(scope.firstText, 'Online Bitcoin Gambling'),
  secondText: () => _t(scope.secondText, 'Become adventurist!'),
  socialLogin: () => _t(scope.socialLogin, 'Or sign in another way'),
  multiplayerGames: () => _t(scope.multiplayerGames, 'Multiplayer Games'),
  singlePlayerGames: () => _t(scope.singlePlayerGames, 'Single Player Games'),
  signUp: () => _t(scope.signUp, 'Sign up'),
  inputYour: () => _t(scope.inputYour, 'Input your'),
};
