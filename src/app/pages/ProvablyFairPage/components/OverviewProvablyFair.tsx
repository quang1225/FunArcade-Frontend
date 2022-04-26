import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameSelectInput from 'app/components/GameSelectInput';
import { GAME_LIST } from 'utils/gameConfig';
import CommonA from 'app/components/common/CommonA';
import { useTranslation } from 'react-i18next';
import { messages } from '../messages';

const Wrapper = styled.div`
  font-size: 14px;

  .title {
    font-size: 16px;
    font-weight: 600;
  }

  .fair-input {
    margin-bottom: 24px;
  }

  .game_select_input {
    margin-bottom: 16px;
  }
`;

interface Props {
  gameSlug: string | null;
}

const OverviewProvablyFair = ({ gameSlug }: Props) => {
  const { t } = useTranslation();
  const [gameSlugOverview, setGameSlugOverview] = useState(
    gameSlug || 'general',
  );

  const onGameSlugOverviewChange = (gameSlug: string) => {
    setGameSlugOverview(gameSlug);
  };

  const gameConfig = GAME_LIST.find(x => x.slug === gameSlugOverview);

  useEffect(() => {
    if (!gameSlug) return;
    setGameSlugOverview(gameSlug);
  }, [gameSlug]);
  return (
    <Wrapper>
      <GameSelectInput
        gameSlug={gameSlugOverview}
        gameSlugChange={onGameSlugOverviewChange}
        noLabel
        isOverviewPF
      />

      {gameSlugOverview === 'general' && (
        <>
          <div className="line">{t(...messages.overviewText1())}</div>
          <br />

          <div className="line">{t(...messages.overviewText2())}</div>
          <br />

          <div className="line">{t(...messages.overviewText3())}</div>
          <pre>{`fair result = operators input (hashed) + players input`}</pre>
          <br />

          <div className="title">{t(...messages.overviewText4())}</div>
          <br />

          <div className="line">{t(...messages.overviewText5())}</div>
          <div className="line">
            <CommonA href="https://www.devglan.com/online-tools/hmac-sha256-online">
              https://www.devglan.com/online-tools/hmac-sha256-online
            </CommonA>
          </div>
          <small>
            <div className="line">
              {t(...messages.overviewText6())} ClientSeed:GameNumber:RoundNumber
            </div>
            <div className="line">
              {t(...messages.example())}: gbdKqFMBjCjs:1:1
            </div>
          </small>
          <br />

          <div className="line">{t(...messages.overviewText7())}</div>
          <div className="line">
            <CommonA href="https://emn178.github.io/online-tools/sha256.html">
              https://emn178.github.io/online-tools/sha256.html
            </CommonA>
          </div>
          <small>
            <div className="line">{t(...messages.overviewText8())}</div>
          </small>
          <br />

          <div className="line">{t(...messages.overviewText9())}</div>
          <div className="line">
            <CommonA href="https://www.rapidtables.com/convert/number/hex-to-decimal.html">
              https://www.rapidtables.com/convert/number/hex-to-decimal.html
            </CommonA>
          </div>
          <br />

          <div className="line">{t(...messages.overviewText10())}</div>
        </>
      )}

      {gameSlugOverview === gameConfig?.slug && <gameConfig.overviewPF />}
    </Wrapper>
  );
};

export default OverviewProvablyFair;
