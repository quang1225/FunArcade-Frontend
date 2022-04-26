import FairResultGame from 'app/components/FairResultGame';
import styled from 'styled-components';
import LowerIcon from 'app/images/games/hilo-game/lower.svg';
import HigherIcon from 'app/images/games/hilo-game/higher.svg';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';
import { spaceEvery2Char } from 'utils/constants';
import { MenuItem } from '@mui/material';
import CommonSelect from 'app/components/common/CommonSelect';
import { calRandomRoad } from '../RoadToRichesGame/ResultBox';
import { messages } from 'app/pages/ProvablyFairPage/messages';
import { HiloVerifyDataRes } from 'app/components/ProvablyFairPopup/types';
import { HiloCardImgs } from 'utils/gameConfig';

interface Props {
  hideBreakdown: boolean;
  clientSeed: string;
  serverSeed: string;
  gameNumber: string;
  round: string;
  cardResult: number[];
  gameDataRes?: HiloVerifyDataRes;
}

const HiloFairWrap = styled.div`
  .result_wrap {
    display: flex;
    align-items: center;
    padding: 16px;
    overflow-x: auto;
    height: 100%;
  }

  .fair-result-image {
    overflow-y: auto;
    justify-content: unset;
    padding: 0 12px;
  }

  .title-fair {
    font-weight: normal;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .start-card {
    margin-top: -46px;
    display: flex;
    flex-direction: column;
  }

  .round {
    margin-left: 24px;
  }

  .cards {
    display: flex;
    .card-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      &:not(:last-child) {
        margin-right: 8px;
      }
      img {
        &.active {
          border: 4px solid #00c242;
          border-radius: 8px;
          box-sizing: content-box;
          margin-top: -4px;
          margin-bottom: 12px;
        }
      }
    }
  }

  .single_result {
    margin-top: 8px;
    justify-content: center;
  }
`;

export const genCard = (subHash: string) => {
  const random =
    parseInt(subHash.substring(0, 2), 16) / 256 ** 1 +
    parseInt(subHash.substring(2, 4), 16) / 256 ** 2 +
    parseInt(subHash.substring(4, 6), 16) / 256 ** 3 +
    parseInt(subHash.substring(6, 8), 16) / 256 ** 4;
  return Math.floor(random * 52) + 1;
};
export const genCards = (hex: string) => {
  let cards: number[] = [];
  cards.push(genCard(hex.substring(0, 8)));
  cards.push(genCard(hex.substring(8, 16)));
  cards.push(genCard(hex.substring(16, 24)));

  return cards;
};

const ResultBox = (props: Props) => {
  const { t } = useTranslation();
  const {
    clientSeed,
    serverSeed,
    hideBreakdown,
    gameNumber,
    round,
    gameDataRes,
  } = props;
  const [roundBreakdown, setRoundBreakdown] = useState(1);
  const [hex, setHex] = useState('');
  const [totalResult, setTotalResult] = useState<number[][]>([]);

  const hexArr = hex?.substring(0, 24).match(/.{1,8}/g);

  const roundChange = (value: string) => {
    setRoundBreakdown(+value);
  };

  // 1 Round Result
  useEffect(() => {
    if (clientSeed && serverSeed && roundBreakdown && gameNumber) {
      const hmac = hmacSHA256(
        serverSeed,
        `${clientSeed}:${gameNumber}:${roundBreakdown}`,
      );
      setHex(hmac.toString(Hex));
    }
  }, [roundBreakdown, clientSeed, serverSeed, gameNumber]);

  // All Results
  useEffect(() => {
    if (clientSeed && serverSeed && gameNumber && typeof round === 'string') {
      const totalRound = gameDataRes?.rounds?.length || round || 0;
      let result: number[][] = [];

      Array.from(Array(Number(totalRound)).keys()).forEach((x, index) => {
        const roundHmac = hmacSHA256(
          serverSeed,
          `${clientSeed}:${gameNumber}:${index + 1}`,
        );
        const roundHex = roundHmac.toString(Hex);
        const rs = genCards(roundHex);
        result.push(rs);
      });
      setTotalResult(result);
    }
  }, [round, clientSeed, serverSeed, gameNumber]);

  return (
    <HiloFairWrap className="hilo-fair-result">
      <FairResultGame>
        <div className="result_wrap">
          {gameDataRes?.startCard && (
            <div className="start-card">
              <div className="title-fair">Start</div>
              <img
                src={HiloCardImgs[`${gameDataRes.startCard}.svg`]}
                alt="Start Card"
                width="50"
                height="80"
              />
            </div>
          )}
          {totalResult.map((roundCards, roundIndex) => (
            <div key={`roundCards_${roundIndex}`} className="round">
              <div className="title-fair">Round {roundIndex + 1}</div>
              <div className="cards">
                {roundCards.map((cardNumber, cardIndex) => (
                  <div key={`cardNumber_${cardIndex}`} className="card-wrap">
                    <img
                      className={
                        cardIndex ===
                        gameDataRes?.rounds[roundIndex].selectedPosition
                          ? 'active'
                          : ''
                      }
                      src={HiloCardImgs[`${cardNumber}.svg`]}
                      alt="Round Card"
                      width="50"
                      height="80"
                    />
                    {cardIndex ===
                      gameDataRes?.rounds[roundIndex].selectedPosition && (
                      <img
                        className="selection"
                        src={
                          gameDataRes?.rounds[roundIndex].guess ===
                          'HigherEqual'
                            ? HigherIcon
                            : LowerIcon
                        }
                        alt="Selection"
                        width="30"
                        height="30"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FairResultGame>

      {!hideBreakdown && (
        <div className="break_down">
          <div className="title">Round Number</div>
          <CommonSelect value={roundBreakdown + ''} onChange={roundChange}>
            {Array.from(Array(totalResult.length).keys()).map((x, index) => (
              <MenuItem key={`round_${index + 1}`} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </CommonSelect>

          <div className="title">{t(...messages.seedsToHex())}</div>
          <div className="text">
            HMAC_SHA256( <i>serverSeed</i>,{' '}
            <i>clientSeed:gameNumber:roundNumber</i> )
            <br />
            <strong>{spaceEvery2Char(hex.substring(0, 24))}</strong>{' '}
            {spaceEvery2Char(hex.substring(24))}
          </div>

          <div className="title">{t(...messages.hexToDec())}</div>
          {hexArr?.map((cardHex, index) => (
            <div key={`cardHex_${index}`} className="text">
              random {index + 1}
              <br />={' '}
              {cardHex.match(/.{1,2}/g)?.map((char, index) => (
                <span key={char + index + ''}>
                  (<strong>{char}</strong> / (256 ^ {index + 1}))
                  {index === hexArr.length - 1 ? '' : ' + '}
                </span>
              ))}
              <br />= <strong>{calRandomRoad(hex)}</strong>
            </div>
          ))}

          <div className="title">{t(...messages.rawToEdged())}</div>
          {hexArr?.map((cardHex, index) => (
            <div key={cardHex + index + ''} className="text">
              Card {index + 1} = floor( random {index + 1} * 52 ) + 1 ={' '}
              <strong>{genCard(cardHex)}</strong>
            </div>
          ))}

          <div className="title">Result for round {roundBreakdown}</div>
          <div className="single_result cards">
            {totalResult[roundBreakdown - 1]?.map((cardNumber, index) => (
              <div key={cardNumber + index + ''} className="card-wrap">
                <img
                  src={HiloCardImgs[`${cardNumber}.svg`]}
                  alt="Round Card"
                  width="50"
                  height="80"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </HiloFairWrap>
  );
};

export default ResultBox;
