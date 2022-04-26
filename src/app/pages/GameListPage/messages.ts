import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.pages.GameListPage;

export const messages = {
  multiGameTitle: () => _t(scope.multiGameTitle, 'Multiplayer Games'),
  singleGameTitle: () => _t(scope.singleGameTitle, 'Single Games'),
};
