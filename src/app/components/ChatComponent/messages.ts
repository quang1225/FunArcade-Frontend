import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.components.ChatComponent;

export const messages = {
  typeYourMsg: () => _t(scope.typeYourMsg, 'Type your message'),
};
