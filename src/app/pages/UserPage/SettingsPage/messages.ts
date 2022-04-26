import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.pages.UserPage.SettingsPage;

export const messages = {
  profile: () => _t(scope.profile, 'Profile'),
  profileDes: () =>
    _t(
      scope.profileDes,
      `To serve you better we ask that you provide identifying documents.
  This will secure your account in cases of account recovery. It
  also helps make sure you receive your gifts or physical rewards
  to the correct location.`,
    ),
  security: () => _t(scope.security, 'Security'),
  securityDes: () => _t(scope.securityDes, 'Input your new password to reset.'),
  settings: () => _t(scope.settings, 'Settings'),
  firstName: () => _t(scope.firstName, 'First name'),
  userName: () => _t(scope.userName, 'User name'),
  lastName: () => _t(scope.lastName, 'Last name'),
  email: () => _t(scope.email, 'Email'),
  phoneNumber: () => _t(scope.phoneNumber, 'Phone number'),
  submit: () => _t(scope.submit, 'Submit'),
  oldPassword: () => _t(scope.oldPassword, 'Old Password'),
  newPassword: () => _t(scope.newPassword, 'New Password'),
  confirmNewPassword: () =>
    _t(scope.confirmNewPassword, 'Confirm New Password'),
  enable2FA: () => _t(scope.enable2FA, 'Enable 2FA'),
};
