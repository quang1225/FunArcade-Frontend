import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const scope = translations.components.Cashier;

export const messages = {
  deposit: () => _t(scope.deposit, 'Deposit'),
  withdraw: () => _t(scope.withdraw, 'Withdraw'),
  balance: () => _t(scope.balance, 'Balance'),
  staking: () => _t(scope.staking, 'Staking'),
  rewards: () => _t(scope.rewards, 'Rewards'),
  submit: () => _t(scope.submit, 'Submit'),
  transactions: () => _t(scope.transactions, 'Transactions'),
  settings: () => _t(scope.settings, 'Settings'),
  gameHistory: () => _t(scope.gameHistory, 'Game History'),
  cashier: () => _t(scope.cashier, 'Cashier'),
  cryptocurrency: () => _t(scope.cryptocurrency, 'Cryptocurrency'),
  amount: () => _t(scope.amount, 'Amount'),
  networkFee: () => _t(scope.networkFee, 'Network fee'),
  youWillReceive: () => _t(scope.youWillReceive, 'You will receive'),
  send: () => _t(scope.send, 'Send'),
  via: () => _t(scope.via, 'via'),
  wallet: () => _t(scope.wallet, 'wallet'),
  walletAddress: () => _t(scope.walletAddress, 'Wallet Address'),
  orSendTo: () => _t(scope.orSendTo, 'Or send to'),
  network: () => _t(scope.network, 'Network'),
  walletAddressCopied: () =>
    _t(scope.walletAddressCopied, 'Wallet Address is copied'),
  depositNoticeText1: () => _t(scope.depositNoticeText1, `Send only`),
  depositNoticeText2: () => _t(scope.depositNoticeText2, `on the`),
  depositNoticeText3: () =>
    _t(
      scope.depositNoticeText3,
      `network to this deposit address, assets maybe lost otherwise. Your balance will be updated as soon as the deposit is received.`,
    ),
  withdrawNoticeText1: () =>
    _t(
      scope.withdrawNoticeText1,
      `Please ensure the withdrawal address matches and supports both the`,
    ),
  withdrawNoticeText2: () => _t(scope.withdrawNoticeText2, `token and the`),
  withdrawNoticeText3: () =>
    _t(scope.withdrawNoticeText3, `network, assets maybe lost otherwise.`),
};
