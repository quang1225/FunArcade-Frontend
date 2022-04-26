import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.pages.UserPage.CashierPage;

export const messages = {
  cashier: () => _t(scope.cashier, 'Cashier'),
};
