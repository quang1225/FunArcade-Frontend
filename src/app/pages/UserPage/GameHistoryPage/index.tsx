import styled from 'styled-components';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CommonTable from 'app/components/common/CommonTable';
import { UserHistory } from 'app/appTypes';
import { useState, useEffect } from 'react';
import {
  CRASH_GAME_SLUG,
  GAME_LIST,
  HILO_GAME_SLUG,
  ROAD_GAME_SLUG,
  WHEEL_GAME_SLUG,
} from 'utils/gameConfig';
import ContentBox from 'app/components/ContentBox';
import GameSelectInput from 'app/components/GameSelectInput';
import { dateInputFormat } from 'utils/constants';
import DateInput from 'app/components/DateInput';
import CommonButton from 'app/components/common/CommonButton';
import CommonField from 'app/components/common/CommonField';
import SearchIcon from 'app/components/icons/SearchIcon';
import { getUserPlayHistoryApi } from 'app/redux/apis';
import { setToast } from 'app/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurencies,
  selectCurrentWallet,
  selectUserInfo,
} from 'app/redux/selectors';
import {
  CrashGameData,
  CrashPlayData,
  GameHistoryRes,
  HiloGameData,
  HiloPlayData,
  RoadGameData,
  RoadPlayData,
  WheelGameData,
  WheelPlayData,
} from './types';
import { setUserHistory } from 'app/redux/actions';
import { USER_PATH } from '../UserLayout';
import { getResultIndexWheel } from 'app/games/WheelGame';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

const Wrapper = styled.div`
  .search_box {
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding: 16px;

    .filters {
      display: flex;
      gap: 12px;

      .game_select_input {
        width: 250px;
      }

      .search_input {
        margin-top: auto;
        margin-bottom: 2px;
      }
    }

    .search_btn {
      margin-left: 16px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;

    .search_box {
      overflow-x: auto;
    }
  }
`;

export const mapGameHistory = (
  gameSlug: string | null,
  data: GameHistoryRes,
) => {
  let tempHistory: UserHistory[] = [];
  let temp: UserHistory;

  data.data.forEach(x => {
    temp = {} as UserHistory;

    switch (gameSlug) {
      case CRASH_GAME_SLUG:
        const crashGameData = x.gameMetaData as CrashGameData;
        const crashPlayData = x.playMetaData as CrashPlayData;

        temp.crash = crashGameData.crashPoint / 100;
        temp.gameNumber = crashGameData.gameId;
        temp.time = crashGameData.gameTime;
        temp.betAmount = x.betAmount;
        temp.cashOut = Number(crashPlayData.payout ?? 0);
        break;
      case WHEEL_GAME_SLUG:
        const wheelGameData = x.gameMetaData as WheelGameData;
        const wheelplayData = x.playMetaData as WheelPlayData;

        const resultIndex = getResultIndexWheel(wheelGameData.result);
        temp.betAmount = x.betAmount;
        temp.crash = resultIndex;
        temp.extraGameData = { betAmountList: wheelplayData.choices };
        temp.gameNumber = x.gameId + '';
        temp.time = wheelGameData.gameTime;
        temp.isJackpot = wheelplayData.isJackpot;
        temp.jackpotWinAmount =
          wheelplayData.jackpotMultiply *
          wheelplayData.choices[wheelplayData.result];
        temp.cashOut = Number(wheelplayData.payout ?? 0);
        break;
      case HILO_GAME_SLUG:
        const hiloGameData = x.gameMetaData as HiloGameData;
        const hiloPlayData = x.playMetaData as HiloPlayData;

        temp.crash = hiloPlayData.cardsPlayed;
        temp.cashOut = Number(hiloPlayData.cashOut ?? 0);
        temp.gameNumber = x.gameId;
        temp.time = hiloGameData.gameTime;
        temp.betAmount = x.betAmount;
        break;
      case ROAD_GAME_SLUG:
        const roadGameData = x.gameMetaData as RoadGameData;
        const roadPlayData = x.playMetaData as RoadPlayData;

        temp.cashOut = Number(roadPlayData.cashOut ?? 0);
        temp.gameNumber = roadGameData.gameId;
        temp.time = roadGameData.gameTime;
        temp.betAmount = x.betAmount;
        temp.userChoice = roadPlayData.level;
        break;

      default:
        break;
    }

    tempHistory.push(temp);
  });

  return tempHistory;
};

const GameHistoryPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const currentWallet = useSelector(selectCurrentWallet);
  const [searchParams, setSearchParams] = useSearchParams();
  const gameSlug = searchParams.get('game');
  const [fromDate, setDateFrom] = useState(new Date().toISOString());
  const [toDate, setDateTo] = useState(new Date().toISOString());
  const [currencyId, setCurrencyId] = useState<number>();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const currencies = useSelector(selectCurencies);

  const gameConfig = GAME_LIST.find(x => x.slug === gameSlug);

  const gameSlugChange = (gameSlug: string) => {
    searchParams.set('game', gameSlug);
    setSearchParams(searchParams);
  };

  const searchOnChange = (e: any) => {
    setSearch(e.target.value);
  };

  const onClickSearch = () => {
    getGameHistory();
  };

  const getGameHistory = async () => {
    try {
      setLoading(true);

      const data = await getUserPlayHistoryApi(
        userInfo.id,
        gameSlug || '',
        Number(currencyId),
        fromDate,
        toDate,
        search,
        page,
        rowsPerPage,
      );
      setTotalCount(+data.totalCount);
      const rs = mapGameHistory(gameSlug, data);
      dispatch(setUserHistory(rs));

      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      dispatch(
        setToast({
          msg: typeof err === 'string' ? err : err.message,
          type: 'error',
        }),
      );
    }
  };

  useEffect(() => {
    if (currentWallet?.walletObj?.currencyId) {
      setCurrencyId(currentWallet.walletObj.currencyId);
    }
  }, [currentWallet]);

  useEffect(() => {
    if (userInfo.id && gameSlug && currencyId && currencyId >= 0) {
      getGameHistory();
    }
  }, [userInfo.id, gameSlug, currencyId, page, rowsPerPage]);

  const dateFromChange = (date: string) => {
    setDateFrom(date);
  };

  const dateToChange = (date: string) => {
    setDateTo(date);
  };

  const findCurrencyObj = (currencyId: number | undefined) =>
    currencies.find(x => x.id === currencyId);

  if (!gameSlug)
    return (
      <Navigate to={`${USER_PATH}/game-history/?game=${GAME_LIST[0].slug}`} />
    );

  const title = t(...messages.gameHistory());

  return (
    <Wrapper>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <ContentBox
        title={`${title} ${t(...messages.by())} ${
          findCurrencyObj(currencyId)?.shortname
        }`}
        padding="0"
        currencyId={currencyId}
        setCurrencyId={setCurrencyId}
        secondHeader
      >
        <div className="search_box">
          <div className="filters">
            <GameSelectInput
              gameSlug={gameSlug || ''}
              gameSlugChange={gameSlugChange}
            />
            <DateInput
              label="From"
              value={dateInputFormat(
                fromDate ? new Date(fromDate) : new Date(),
              )}
              onChange={dateFromChange}
            />
            <DateInput
              label="To"
              value={dateInputFormat(toDate ? new Date(toDate) : new Date())}
              onChange={dateToChange}
            />
            <CommonField
              className="search_input"
              type="text"
              leftTextOrIcon={<SearchIcon />}
              value={search}
              placeholder="Game Number..."
              onChange={searchOnChange}
              onEnter={onClickSearch}
            />
          </div>
          <CommonButton
            className="search_btn"
            text="Search"
            width={100}
            onClick={onClickSearch}
          />
        </div>
        <div className="table-history-wrap">
          {gameConfig && (
            <CommonTable
              totalCount={totalCount}
              HistoryHead={gameConfig.historyHead}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              loading={loading}
            >
              <gameConfig.historyBody />
            </CommonTable>
          )}
        </div>
      </ContentBox>
    </Wrapper>
  );
};

export default GameHistoryPage;
