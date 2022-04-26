import { useState } from 'react';
import styled from 'styled-components';
import { messages } from './messages';
import CommonPageHeader from 'app/components/common/CommonPageHeader';
import CustomBody from 'app/components/CustomBody';
import ContentBox from 'app/components/ContentBox';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ProvablyFair from 'app/components/ProvablyFair';
import { HILO_GAME_SLUG, ROAD_GAME_SLUG } from 'utils/gameConfig';
import OverviewProvablyFair from './components/OverviewProvablyFair';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProvablyFairPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const gameSlug = searchParams.get('game');
  const hash = searchParams.get('hash');
  const seed = searchParams.get('seed');
  const nonce = searchParams.get('nonce');
  const gameLevel = searchParams.get('gameLevel');
  const gameNumber = searchParams.get('gameNumber');
  const round = searchParams.get('round');
  const [tab, setTab] = useState(gameSlug || hash || seed ? 1 : 0);

  const listTab = [t(...messages.overview()), t(...messages.calculation())];

  const gameSlugChange = (gameSlug: string) => {
    let newSearch = new URLSearchParams();
    newSearch.set('game', gameSlug);
    newSearch.set('seed', '');
    newSearch.set('hash', '');

    // add inputs
    switch (gameSlug) {
      case ROAD_GAME_SLUG:
        newSearch.set('gameLevel', '');
        newSearch.set('gameNumber', '');
        break;
      case HILO_GAME_SLUG:
        newSearch.set('gameNumber', '');
        newSearch.set('round', '');
        break;

      default:
        break;
    }
    setSearchParams(newSearch);
  };

  const clientSeedChange = (value: string) => {
    searchParams.set('seed', value);
    setSearchParams(searchParams);
  };

  const serverSeedChange = (value: string) => {
    searchParams.set('hash', value);
    setSearchParams(searchParams);
  };

  const nonceChange = (value: string) => {
    searchParams.set('nonce', value);
    setSearchParams(searchParams);
  };

  const gameLevelChange = (value: string) => {
    searchParams.set('gameLevel', value);
    setSearchParams(searchParams);
  };

  const gameNumberChange = (value: string) => {
    searchParams.set('gameNumber', value);
    setSearchParams(searchParams);
  };

  const roundChange = (value: string) => {
    searchParams.set('round', value);
    setSearchParams(searchParams);
  };

  return (
    <Wrapper>
      <CommonPageHeader
        title={t(...messages.provablyFair())}
        tab={tab}
        setTab={setTab}
        listTab={listTab}
      />

      <CustomBody width={400}>
        {tab === 0 && (
          <ContentBox title={t(...messages.overviewHeaderText())}>
            <OverviewProvablyFair gameSlug={gameSlug} />
          </ContentBox>
        )}
        {tab === 1 && (
          <ContentBox title={t(...messages.calculation())}>
            <ProvablyFair
              gameSlug={gameSlug}
              gameSlugChange={gameSlugChange}
              clientSeed={seed}
              clientSeedChange={clientSeedChange}
              serverSeed={hash}
              serverSeedChange={serverSeedChange}
              nonce={nonce}
              nonceChange={nonceChange}
              gameLevel={gameLevel}
              gameLevelChange={gameLevelChange}
              gameNumber={gameNumber}
              gameNumberChange={gameNumberChange}
              round={round}
              roundChange={roundChange}
            />
          </ContentBox>
        )}
      </CustomBody>
    </Wrapper>
  );
};

export default ProvablyFairPage;
