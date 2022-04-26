import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Route, useParams, Routes } from 'react-router-dom';
import GamePage from '../GamePage/Loadable';
import { Helmet } from 'react-helmet-async';
import CommonField from 'app/components/common/CommonField';
import SearchIcon from 'app/components/icons/SearchIcon';
import GameGrid from 'app/components/GameGrid';
import MascotImage from 'app/images/mascot-1.svg';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import CustomBody from 'app/components/CustomBody';
import { MULTI_GAME_LIST, SINGLE_GAME_LIST } from 'utils/gameConfig';
import { GameProps } from 'app/appTypes';
import { searchTextFilter } from 'utils/constants';
import NotFoundPage from '../NotFoundPage';

const GameListWrap = styled.div``;

const SearchWrap = styled.div`
  display: flex;
  height: 160px;
  background-color: var(--global--background-color-4);
  box-shadow: 0px 4px 20px rgb(0 0 0 / 25%);
  position: relative;
  flex-direction: column;
  color: white;

  .MuiContainer-root {
    height: 100%;
    position: relative;

    .content {
      padding: 32px 0;

      .first-text {
        font-weight: 600;
        font-size: 24px;
        margin-bottom: 12px;
      }

      .search-input input {
        border-radius: 20px;
        width: 400px;
        height: 40px;
      }
    }

    .mascot-img {
      position: absolute;
      bottom: -13px;
      right: 24px;
    }
  }

  @media (max-width: 768px) {
    .MuiContainer-root {
      .content {
        padding: 24px 0;
        .first-text {
          font-size: 20px;
        }
        .search-input input {
          width: 100%;
        }
      }
    }
  }
`;

const GameListPage = () => {
  const { t } = useTranslation();
  const { gameTypePath }: any = useParams();
  const [searchInput, setSearchInput] = useState('');
  const [gameList, setGameList] = useState<GameProps[]>([]);

  const isMulti = gameTypePath === 'multiplayer';
  const initList = isMulti ? MULTI_GAME_LIST : SINGLE_GAME_LIST;

  const titleText = isMulti
    ? messages.multiGameTitle()
    : messages.singleGameTitle();

  useEffect(() => {
    const filtered = initList.filter(x =>
      searchTextFilter(x.name, searchInput),
    );
    setGameList(filtered);
  }, [searchInput, isMulti]);

  const GameListComponent = (
    <GameListWrap className="full_height_page">
      <Helmet>
        <title>{t(titleText)}</title>
        <meta name="description" content={String(t(...titleText))} />
      </Helmet>

      <SearchWrap>
        <Container>
          <div className="content">
            <div className="first-text">{t(...titleText)}</div>
            <CommonField
              type="text"
              className="search-input"
              name="search-input"
              leftTextOrIcon={<SearchIcon />}
              value={searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchInput(e.target.value)
              }
            />
          </div>
          <img
            width="160"
            height="160"
            className="mascot-img hideOnMobile"
            src={MascotImage}
            alt="Mascot"
          />
        </Container>
      </SearchWrap>

      <CustomBody>
        <GameGrid gameList={gameList} />
      </CustomBody>
    </GameListWrap>
  );

  if (!['multiplayer', 'single-player'].includes(gameTypePath))
    return <NotFoundPage />;

  return (
    <Routes>
      <Route path="/" element={GameListComponent} />
      <Route path=":gameSlug/*" element={<GamePage />} />
    </Routes>
  );
};

export default GameListPage;
