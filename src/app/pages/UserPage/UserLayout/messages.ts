import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.pages.UserPage.UserLayout;

export const messages = {
  settings: () => _t(scope.settings, 'Settings'),
  verification: () => _t(scope.verification, 'Verification'),
  security: () => _t(scope.security, 'Security'),
  privacy: () => _t(scope.privacy, 'Privacy'),
  sessions: () => _t(scope.sessions, 'Sessions'),
  firstName: () => _t(scope.firstName, 'First name'),
  userName: () => _t(scope.userName, 'Username'),
  lastName: () => _t(scope.lastName, 'Last name'),
  email: () => _t(scope.email, 'Email'),
  gender: () => _t(scope.gender, 'Gender'),
  phoneNumber: () => _t(scope.phoneNumber, 'Phone number'),
  submit: () => _t(scope.submit, 'Submit'),
  oldPassword: () => _t(scope.oldPassword, 'Old password'),
  newPassword: () => _t(scope.newPassword, 'New password'),
  confirmNewPassword: () =>
    _t(scope.confirmNewPassword, 'Confirm new password'),
  apiToken: () => _t(scope.apiToken, 'API Token'),
  reveal: () => _t(scope.reveal, 'Reveal'),
  dontMess: () =>
    _t(
      scope.dontMess,
      `Don't mess with this unlesss you know what you're doing!`,
    ),
  saveChanges: () => _t(scope.saveChanges, 'Save changes'),
  hideBets: () => _t(scope.hideBets, 'Hide your bets (ghost mode)'),
  hideStatics: () => _t(scope.hideStatics, 'Hide all your players statics'),
  hideStats: () => _t(scope.hideStats, 'Hide your race stats'),
  smsOptOut: () => _t(scope.smsOptOut, 'SMS opt out'),
  browser: () => _t(scope.browser, 'Browser'),
  near: () => _t(scope.near, 'Near'),
  ipAddress: () => _t(scope.ipAddress, 'IP Address'),
  lastUsed: () => _t(scope.lastUsed, 'Last Used'),
  action: () => _t(scope.action, 'Action'),
  current: () => _t(scope.current, 'Current'),
  removed: () => _t(scope.removed, 'Removed'),
  minutesAgo: () => _t(scope.minutesAgo, 'minutes ago'),
  cashier: () => _t(scope.cashier, 'Cashier'),
  transaction: () => _t(scope.transaction, 'Transaction'),
  gameHistory: () => _t(scope.gameHistory, 'Game History'),
};
