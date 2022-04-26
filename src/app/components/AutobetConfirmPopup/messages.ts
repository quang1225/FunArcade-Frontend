import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.components.AutobetConfirmPopup;

export const messages = {
  cancel: () => _t(scope.cancel, 'Cancel'),
  proceed: () => _t(scope.proceed, 'Proceed'),
  autobetConfirm: () => _t(scope.autobetConfirm, 'Auto Bet Confirmation'),
  doNotRemind: () => _t(scope.doNotRemind, 'Do not remind me again'),
};
