import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.pages.NotFoundPage;

export const messages = {
  header: () => _t(scope.header, 'Page not found.'),
};
