import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.pages.UserPage.TransactionPage;

export const messages = {
  balance: () => _t(scope.balance, 'Balance'),
};
