import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.pages.UserPage.GameHistoryPage;

export const messages = {
  gameHistory: () => _t(scope.gameHistory, 'Game History'),
  by: () => _t(scope.by, 'by'),
};
