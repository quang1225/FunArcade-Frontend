import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.components.Header;

export const messages = {
  home: () => _t(scope.home, 'Home'),
  seeAll: () => _t(scope.seeAll, 'See all'),
  multiplayer: () => _t(scope.multiplayer, 'Multiplayer'),
  singlePlayer: () => _t(scope.singlePlayer, 'Single Player'),
  language: () => _t(scope.language, 'Language'),
  login: () => _t(scope.login, 'Log In'),
  loginViaWallet: () =>
    _t(scope.loginViaWallet, 'Log In via blockchain wallet'),
  signup: () => _t(scope.signup, 'Sign Up'),
  logout: () => _t(scope.logout, 'Log out'),
  wallet: () => _t(scope.wallet, 'Wallet'),
  deposit: () => _t(scope.deposit, 'Deposit'),
  withdraw: () => _t(scope.withdraw, 'Withdraw'),
  exchange: () => _t(scope.exchange, 'Exchange'),
  currency: () => _t(scope.currency, 'Currency'),
  moneyRange: () => _t(scope.moneyRange, 'Money range'),
  bankName: () => _t(scope.bankName, 'Bank Name'),
  bankBranch: () => _t(scope.bankBranch, 'Bank Branch'),
  accountNumber: () => _t(scope.accountNumber, 'Account Number'),
  nameOfHolder: () => _t(scope.nameOfHolder, 'Name Of Holder'),
  submit: () => _t(scope.submit, 'Submit'),
  fromWallet: () => _t(scope.fromWallet, 'From wallet'),
  send: () => _t(scope.send, 'Send'),
  receive: () => _t(scope.receive, 'Receive'),
  notHaveMoney: () =>
    _t(scope.notHaveMoney, 'Does not have money to exchange yet? Deposit now!'),
  notHaveAcc: () =>
    _t(
      scope.notHaveAcc,
      'Does not have account to transfer yet? Input your account information here:',
    ),
  menu: () => _t(scope.menu, 'Menu'),
  notification: () => _t(scope.notification, 'Notification'),
  search: () => _t(scope.search, 'Search'),
  statistics: () => _t(scope.statistics, 'Statistics'),
  transactions: () => _t(scope.transactions, 'Transactions'),
  settings: () => _t(scope.settings, 'Settings'),
  gameHistory: () => _t(scope.gameHistory, 'Game History'),
  cashier: () => _t(scope.cashier, 'Cashier'),
  balance: () => _t(scope.balance, 'Balance'),
  bankInfo: () => _t(scope.bankInfo, 'Bank Info'),
  provablyFair: () => _t(scope.provablyFair, 'Provably Fair'),
};
