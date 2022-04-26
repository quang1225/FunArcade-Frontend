import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.components.CallbackRoute;

export const messages = {
  redirecting: () => _t(scope.redirecting, 'Redirecting'),
};
