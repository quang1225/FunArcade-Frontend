import styled from 'styled-components';
import { messages } from '../../pages/ProvablyFairPage/messages';
import CommonField from '../common/CommonField';
import { t } from 'i18next';
import { useState, useEffect } from 'react';
import { GAME_LIST, ROAD_LEVELS } from 'utils/gameConfig';
import GameSelectInput from '../GameSelectInput';
import { MenuItem } from '@mui/material';
import CommonSelect from '../common/CommonSelect';
import sha256 from 'crypto-js/sha256';

const MAX_ROUNDS = 50;

interface Props {
  gameSlug: string | null;
  gameSlugChange?: (x: string) => void;
  clientSeed: string | undefined | null;
  clientSeedChange?: (x: string) => void;
  serverSeed: string | undefined | null;
  serverSeedChange?: (x: string) => void;
  hashedServerSeed?: string | undefined;
  nonce: string | undefined | null;
  nonceChange?: (x: string) => void;
  gameLevel: string | undefined | null;
  gameLevelChange?: (x: string) => void;
  gameNumber: string | undefined | null;
  gameNumberChange?: (x: string) => void;
  round: string | undefined | null;
  roundChange?: (x: string) => void;
  hideBreakdown?: boolean;
  isRotateRequired?: boolean;
  loading?: boolean;
  gameDataRes?: any;
}

const Wrapper = styled.div`
  font-size: 14px;

  .MuiFormControl-root,
  .input-wrap,
  .custom-field,
  .fair_result_box,
  .text {
    margin-bottom: 24px;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .result {
    font-weight: bold;
    font-size: 18px;
    color: var(--global--background-color-3);
  }

  .hexToDec {
    .cal_line {
      display: flex;

      .left_side {
        display: flex;
        justify-content: space-between;
        width: 100px;
        margin-right: 30px;
        font-weight: bold;
      }
    }
  }
`;

export default function ProvablyFair(props: Props) {
  const {
    gameSlug,
    gameSlugChange,
    clientSeed = '',
    clientSeedChange,
    hashedServerSeed = '',
    serverSeed = '',
    serverSeedChange,
    nonce,
    nonceChange,
    gameLevel,
    gameLevelChange,
    gameNumber,
    gameNumberChange,
    round,
    roundChange,
    hideBreakdown,
    gameDataRes,
    isRotateRequired,
    loading,
  } = props;
  const [clientSeedValue, setClientSeedValue] = useState('');
  const [serverSeedValue, setServerSeedValue] = useState('');
  const [nonceValue, setNonceValue] = useState('');
  const [gameLevelValue, setGameLevelValue] = useState('');
  const [gameNumberValue, setGameNumberValue] = useState('');
  const [roundValue, setRoundValue] = useState('');

  const gameConfig = GAME_LIST.find(x => x.slug === gameSlug);

  const onGameSlugChange = (gameSlug: string) => {
    gameSlugChange?.(gameSlug);
  };

  const onClientSeedChange = e => {
    setClientSeedValue(e.target.value);
    clientSeedChange?.(e.target.value);
  };

  const onServerSeedChange = e => {
    setServerSeedValue(e.target.value);
    serverSeedChange?.(e.target.value);
  };

  const onNonceChange = e => {
    setNonceValue(e.target.value);
    nonceChange?.(e.target.value);
  };

  const onGameLevelChange = (value: string) => {
    setGameLevelValue(value);
    gameLevelChange?.(value);
  };

  const onGameNumberChange = e => {
    setGameNumberValue(e.target.value);
    gameNumberChange?.(e.target.value);
  };

  const onRoundChange = e => {
    let round = MAX_ROUNDS;
    if (e.target.value < MAX_ROUNDS) {
      round = e.target.value;
    }
    setRoundValue(round + '');
    roundChange?.(round + '');
  };

  useEffect(() => {
    setClientSeedValue(clientSeed || '');
  }, [clientSeed]);

  useEffect(() => {
    setServerSeedValue(serverSeed || '');
  }, [serverSeed]);

  useEffect(() => {
    setNonceValue(nonce || '');
  }, [nonce]);

  useEffect(() => {
    setGameLevelValue(gameLevel || '');
  }, [gameLevel]);

  useEffect(() => {
    setGameNumberValue(gameNumber || '');
  }, [gameNumber]);

  useEffect(() => {
    setRoundValue(round || '');
  }, [round]);

  return (
    <Wrapper>
      {gameSlugChange && (
        <GameSelectInput
          gameSlug={gameSlug || ''}
          gameSlugChange={onGameSlugChange}
        />
      )}
      <CommonField
        type="text"
        name="clientSeed"
        label={t(...messages.clientSeed())}
        value={clientSeedValue}
        onChange={onClientSeedChange}
        readonly={!Boolean(gameSlugChange)}
      />

      <CommonField
        type="text"
        name="serverSeed"
        label={`${t(...messages.serverSeed())} ${
          isRotateRequired ? `(${t(...messages.notRevealedYet())})` : ''
        }`}
        value={serverSeedValue}
        onChange={onServerSeedChange}
        readonly={!Boolean(gameSlugChange)}
      />

      {gameConfig?.isSingle && (
        <CommonField
          type="text"
          name="hashedServerSeed"
          label={t(...messages.hashedServerSeed())}
          value={serverSeed ? sha256(serverSeed) : hashedServerSeed}
          readonly
        />
      )}

      {(nonce || nonce === '') && (
        <CommonField
          type="text"
          name="nonce"
          label="Nonce"
          value={nonceValue}
          onChange={onNonceChange}
          readonly={!Boolean(gameSlugChange)}
        />
      )}

      {(gameNumber || gameNumber === '') && (
        <CommonField
          type="number"
          name="gameNumber"
          label="Game Number"
          value={gameNumberValue}
          onChange={onGameNumberChange}
          readonly={!Boolean(gameSlugChange)}
        />
      )}

      {(round || round === '') && (
        <CommonField
          type="number"
          name="round"
          label="Rounds"
          value={roundValue}
          onChange={onRoundChange}
          readonly={!Boolean(gameSlugChange)}
        />
      )}

      {(gameLevel || gameLevel === '') && (
        <CommonSelect
          value={gameLevelValue}
          onChange={onGameLevelChange}
          readOnly={!Boolean(gameSlugChange)}
          label="Game Level"
        >
          {ROAD_LEVELS.map((x, index) => (
            <MenuItem key={`level_${index + 1}`} value={index}>
              {x.value}
            </MenuItem>
          ))}
        </CommonSelect>
      )}

      {gameConfig && !isRotateRequired && (
        <div className="result_box">
          <gameConfig.resultBox
            hideBreakdown={hideBreakdown}
            clientSeed={clientSeedValue}
            serverSeed={serverSeedValue}
            gameLevel={gameLevelValue}
            gameNumber={gameNumberValue}
            round={roundValue}
            gameDataRes={gameDataRes}
            loading={loading}
          />
        </div>
      )}
    </Wrapper>
  );
}
