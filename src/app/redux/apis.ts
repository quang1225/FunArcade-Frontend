import { UserWalletRes } from 'app/appTypes';
import { RotateSeedPairRes } from 'app/components/ProvablyFairPopup/types';
import { GameHistoryRes } from 'app/pages/UserPage/GameHistoryPage/types';
import globalAxios from '../../utils/globalAxios';

export const getUserInfoApi = token => {
  return globalAxios.get(`${process.env.REACT_APP_IDENTITY_ENDPOINT}/userinfo`);
};

export const getUserWalletsApi = async token => {
  const data: UserWalletRes[] = (
    await globalAxios.get(`${process.env.REACT_APP_WALLET_ENDPOINT}/wallets`)
  ).data;
  return data;
};

export const getCurrenciesApi = token => {
  return globalAxios.get(`${process.env.REACT_APP_WALLET_ENDPOINT}/currencies`);
};

export const getUserPlayHistoryApi = async (
  userId: string,
  gameSlug: string,
  currencyId: number,
  fromDate: string,
  toDate: string,
  search: string,
  page: number,
  pageSize: number,
) => {
  const data: GameHistoryRes = (
    await globalAxios.get(
      `${process.env.REACT_APP_WALLET_ENDPOINT}/playhistories?userId=${userId}&gameCode=${gameSlug}&currencyId=${currencyId}&fromDate=${fromDate}&toDate=${toDate}&searchText=${search}&page=${page}&pageSize=${pageSize}`,
    )
  ).data;
  return data;
};

export const logout = token => {
  const idToken = localStorage.getItem('idToken');
  return globalAxios.get(
    `${process.env.REACT_APP_IDENTITY_ENDPOINT}/endsession`,
    {
      params: {
        id_token_hint: idToken,
        post_logout_redirect_uri: process.env.REACT_APP_CALLBACK_ENDPOINT,
      },
    },
  );
};

export const getVerifyFairApi = async (
  gameId: string,
  token: string,
  gameSlug: string,
) => {
  const url = process.env.REACT_APP_CRASH_GAME_ENDPOINT?.replace(
    'crash',
    gameSlug,
  );

  const data = (await globalAxios.get(`${url}/verify?gameId=${gameId}`)).data;
  return data;
};

export const rotateSeedPairApi = async (token: string, gameSlug: string) => {
  const url = process.env.REACT_APP_CRASH_GAME_ENDPOINT?.replace(
    'crash',
    gameSlug,
  );

  const data: RotateSeedPairRes = (await globalAxios.post(`${url}/seed/rotate`))
    .data;
  return data;
};
