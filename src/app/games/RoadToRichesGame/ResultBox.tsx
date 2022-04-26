import styled from 'styled-components';
import EasyImg from './assets/easy.svg';
import HardImg from './assets/hard.svg';
import CrazyImg from './assets/crazy.svg';
import BoardImg from './assets/board.svg';
import BoxImg from './assets/box.svg';
import FailBoxImg from './assets/fail_box.svg';
import { ROAD_LEVELS } from 'utils/gameConfig';
import { messages } from 'app/pages/ProvablyFairPage/messages';
import { useTranslation } from 'react-i18next';
import { spaceEvery2Char } from 'utils/constants';
import CommonSelect from 'app/components/common/CommonSelect';
import { MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';

interface Props {
  hideBreakdown: boolean;
  clientSeed: string;
  serverSeed: string;
  gameNumber: string;
  gameLevel: string;
}

const Wrapper = styled.div`
  .result_image {
    display: flex;
    justify-content: center;
    position: relative;

    .game_level {
      position: absolute;
      top: 0;
    }

    .game_board {
      height: 550px;
    }

    .game_result {
      display: grid;
      gap: 9px;
      position: absolute;
      top: 75px;

      img {
        width: 66px;
      }
    }
  }

  .round_result {
    display: grid;
    gap: 9px;
    justify-content: center;
  }
`;

const levelImgs = [EasyImg, HardImg, CrazyImg];

export const calRandomRoad = (hex: string) =>
  parseInt(hex.substring(0, 2), 16) / 256 ** 1 +
  parseInt(hex.substring(2, 4), 16) / 256 ** 2 +
  parseInt(hex.substring(4, 6), 16) / 256 ** 3 +
  parseInt(hex.substring(6, 8), 16) / 256 ** 4;

const ResultBox = (props: Props) => {
  const { clientSeed, serverSeed, hideBreakdown, gameLevel, gameNumber } =
    props;
  const { t } = useTranslation();
  const [round, setRound] = useState(1);
  const [hex, setHex] = useState('');
  const [bombIndexs, setBombIndexs] = useState<number[]>([]);

  const roadConfig = ROAD_LEVELS[gameLevel || 0].config;

  const hexArr = hex?.substring(0, 8).match(/.{1,2}/g);
  const calResult = Math.floor(calRandomRoad(hex) * roadConfig.collumns);

  const roundChange = (value: string) => {
    setRound(+value);
  };

  // 1 Round Result
  useEffect(() => {
    if (clientSeed && serverSeed && round && gameNumber && gameLevel) {
      const hmac = hmacSHA256(
        `${clientSeed}:${gameNumber}:${round}`,
        serverSeed,
      );
      setHex(hmac.toString(Hex));
    }
  }, [round, clientSeed, serverSeed, gameNumber, gameLevel]);

  // All Results
  useEffect(() => {
    if (clientSeed && serverSeed && gameNumber) {
      let roadResult: number[] = [];
      Array.from(Array(roadConfig.rows).keys()).forEach((x, index) => {
        const allHmac = hmacSHA256(
          serverSeed,
          `${clientSeed}:${gameNumber}:${index + 1}`,
        );
        const allHex = allHmac.toString(Hex);
        const random = calRandomRoad(allHex);
        const rs = Math.floor(random * roadConfig.collumns);
        roadResult.unshift(rs);
      });
      setBombIndexs(roadResult);
    }
  }, [clientSeed, serverSeed, gameNumber, gameLevel]);

  return (
    <Wrapper>
      <div className="title">{t(...messages.finalResult())}</div>
      <div className="text"></div>

      <div className="result_image">
        <img src={BoardImg} className="game_board" alt="game board" />
        <img
          className="game_level"
          src={levelImgs[gameLevel || 0]}
          alt="game level"
          width="128"
          height="40"
        />

        <div
          className="game_result"
          style={{
            gridTemplateColumns: `repeat(${roadConfig.collumns}, auto)`,
          }}
        >
          {Array.from(Array(roadConfig.rows).keys()).map(row =>
            Array.from(Array(roadConfig.collumns).keys()).map((column, index) =>
              bombIndexs?.[row] === column ? (
                <img
                  key={row + column + index + ''}
                  src={FailBoxImg}
                  className="game_box"
                  alt="fail game box"
                />
              ) : (
                <img
                  key={row + column + index + ''}
                  src={BoxImg}
                  className="game_box"
                  alt="game box"
                />
              ),
            ),
          )}
        </div>
      </div>

      {!hideBreakdown && (
        <div className="break_down">
          <div className="title">Round Number</div>
          <CommonSelect value={round + ''} onChange={roundChange}>
            {Array.from(Array(roadConfig.rows).keys()).map((x, index) => (
              <MenuItem key={`round_${index + 1}`} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </CommonSelect>

          <div className="title">{t(...messages.seedsToHex())}</div>
          <div className="text">
            HMAC_SHA256({' '}
            <strong>
              <i>serverSeed</i>
            </strong>
            ,{' '}
            <strong>
              <i>clientSeed:gameNumber:roundNumber</i>
            </strong>{' '}
            )
            <br />
            <strong>{spaceEvery2Char(hex.substring(0, 8))}</strong>{' '}
            {spaceEvery2Char(hex.substring(8))}
          </div>

          <div className="title">{t(...messages.hexToDec())}</div>
          <div className="text">
            random
            <br />={' '}
            {hexArr?.map((char, index) => (
              <>
                (<strong>{char}</strong> / (256 ^ {index + 1}))
                {index === hexArr.length - 1 ? '' : ' + '}
              </>
            ))}
            <br />= <strong>{calRandomRoad(hex)}</strong>
          </div>

          <div className="title">{t(...messages.rawToEdged())}</div>
          <div className="text">
            floor( random * number of game columns )
            <br />= floor( <strong>{calRandomRoad(hex)}</strong> *{' '}
            {roadConfig.collumns} )
            <br />= <strong>{calResult}</strong>
          </div>

          <div className="title">Result for round {round}</div>
          <div
            className="round_result"
            style={{
              gridTemplateColumns: `repeat(${roadConfig.collumns}, auto)`,
            }}
          >
            {Array.from(Array(roadConfig.collumns).keys()).map(column =>
              column === calResult ? (
                <img
                  src={FailBoxImg}
                  className="game_box"
                  alt="fail game box"
                />
              ) : (
                <img src={BoxImg} className="game_box" alt="game box" />
              ),
            )}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default ResultBox;
