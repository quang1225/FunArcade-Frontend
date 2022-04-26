import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './reducer';
import { AppState, UserWallet } from 'app/appTypes';
import { ApplicationRootState } from 'app/types';

export const selectApp = (state: ApplicationRootState) =>
  state.app || initialState;

export const selectToken = createSelector(
  selectApp,
  (appState: AppState) => appState.token,
);

export const selectAppPopup = createSelector(
  selectApp,
  (appState: AppState) => appState.appPopup,
);

export const selectAppLoading = createSelector(
  selectApp,
  (appState: AppState) => appState.appLoading,
);

export const selectWalletProvider = createSelector(
  selectApp,
  (appState: AppState) => appState.walletProvider,
);

export const selectToastAlert = createSelector(
  selectApp,
  (appState: AppState) => appState.toastAlert,
);

export const selectCurrentWallet = createSelector(
  selectApp,
  (appState: AppState) => appState.currentWallet,
);

export const selectUserInfo = createSelector(
  selectApp,
  (appState: AppState) => appState.userInfo,
);

export const selectUserWallets = createSelector(
  selectApp,
  (appState: AppState) => appState.userWallets,
);

export const selectWalletById = (walletId: string) =>
  createSelector(
    selectApp,
    (appState: AppState) =>
      appState.userWallets.find(x => x.walletObj.id === walletId) ||
      ({} as UserWallet),
  );

export const selectCurencies = createSelector(selectApp, (appState: AppState) =>
  [...appState.currencies].sort((a, b) =>
    a.shortname.localeCompare(b.shortname),
  ),
);

export const selectUserHistory = createSelector(
  selectApp,
  (appState: AppState) =>
    [...appState.userHistory].sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
    ),
);

export const selectUserWallet = createSelector(
  selectApp,
  (appState: AppState) => appState.userWallet,
);

export const selectNetworkInfo = createSelector(
  selectApp,
  (appState: AppState) => appState.networkInfo,
);
