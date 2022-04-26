import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.components.LoginSignup;

export const messages = {
  signup: () => _t(scope.signup, 'Sign up'),
  login: () => _t(scope.login, 'Log in'),
  username: () => _t(scope.username, 'User Name'),
  password: () => _t(scope.password, 'Password'),
  forgotPassword: () => _t(scope.forgotPassword, 'Forgot your password?'),
  email: () => _t(scope.email, 'Email'),
  optional: () => _t(scope.optional, '(optional)'),
  orConnectWith: () => _t(scope.orConnectWith, 'Or connect with'),
};
