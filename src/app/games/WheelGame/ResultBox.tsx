import FairResultGame from 'app/components/FairResultGame';
import WheelDarkPng from 'app/games/WheelGame/assets/wheel_dark.svg';
import { messages } from 'app/pages/ProvablyFairPage/messages';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { spaceEvery2Char } from 'utils/constants';
import {
  LIST_CHOICE_WHEEL,
  LIST_COLOR_WHEEL,
  WHEEL_RESULT,
} from 'utils/gameConfig';
import { getResultIndexWheel } from '.';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';
import styled from 'styled-components';
import JackpotIcon from 'app/images/icons/jackpot-icon.svg';

interface Props {
  hideBreakdown: boolean;
  loading: boolean;
  clientSeed: string;
  serverSeed: string;
}

const JackpotWrap = styled.div`
  .title {
    display: flex;
    align-items: center;
    justify-content: center;

    .line {
      display: inline-block;
      background-color: white;
      width: 100px;
      height: 2px;
      border-radius: 48px;
    }

    .jackpot_title {
      margin: 0 14px;
    }
  }

  p {
    margin: 0;
    padding: 12px;
    border-radius: 8px;
    position: relative;

    &.active {
      background-color: #1659d4;
    }

    .jackpot_icon {
      right: 12px;
      position: absolute;
    }
  }
`;

const COMPARE_JACKPOT = [144000, 147000, 156250, 937500];

const ResultBox = (props: Props) => {
  const { clientSeed, serverSeed, hideBreakdown, loading } = props;
  const { t } = useTranslation();
  const [hex, setHex] = useState('');

  const hexTrim = hex.substring(0, 8);
  const decimalResult = parseInt(hexTrim, 16);
  const hexArr = hexTrim.split('');
  const int = parseInt(hex.substring(0, 8), 16);
  const wheelResult = int % 54;
  const resultIndex = getResultIndexWheel(wheelResult);

  useEffect(() => {
    if (clientSeed && serverSeed) {
      const hmac = hmacSHA256(clientSeed, serverSeed);
      setHex(hmac.toString(Hex));
    }
  }, [clientSeed, serverSeed]);

  return (
    <>
      <FairResultGame image={WheelDarkPng} backgroundSize="160px 160px">
        {!loading && (
          <span style={{ color: LIST_COLOR_WHEEL[resultIndex] }}>
            {LIST_CHOICE_WHEEL[resultIndex]}
          </span>
        )}
      </FairResultGame>

      {!hideBreakdown && (
        <div className="break_down">
          <div className="title">{t(...messages.seedsToHex())}</div>
          <div className="text">
            HMAC_SHA256( <i>serverSeed</i>, <i>clientSeed</i> ) =
            <br />
            <strong>{spaceEvery2Char(hexTrim)}</strong>{' '}
            {spaceEvery2Char(hex.substring(8))}
          </div>

          <div className="title">{t(...messages.hexToDec())}</div>
          <div className="text">
            <div className="first_line">
              ( {hexArr.join(', ')} ) = {decimalResult}
            </div>
            <div className="hexToDec">
              {hexArr.map((char, index) => (
                <div className="cal_line">
                  <div className="left_side">
                    <div className="sign">{index === 0 ? '' : '+'}</div>
                    <div className="number">
                      {parseInt(char, 16) *
                        Math.pow(16, hexArr.length - index - 1)}
                    </div>
                  </div>
                  <div className="right_side">
                    ({char} * (16 ^ {hexArr.length - index - 1}))
                  </div>
                </div>
              ))}
              <div className="cal_line">
                <div className="left_side">
                  <div className="sign">=</div>
                  <div className="number">{decimalResult}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="title">{t(...messages.rawToEdged())}</div>
          <div className="text">
            <strong>{decimalResult}</strong> % 54 ={' '}
            <strong>{decimalResult % 54}</strong>
          </div>

          <div className="title">{t(...messages.finalResult())}</div>
          <div className="text">
            {LIST_CHOICE_WHEEL.map((choice, index) => (
              <p>
                <strong style={{ color: LIST_COLOR_WHEEL[index] }}>
                  {choice}
                </strong>{' '}
                = [ {WHEEL_RESULT[index].join(', ')} ]
              </p>
            ))}
          </div>
          <div className="text">
            <strong>{decimalResult % 54}</strong> {` => `}
            <strong
              style={{ color: LIST_COLOR_WHEEL[resultIndex], fontSize: 24 }}
            >
              {LIST_CHOICE_WHEEL[resultIndex]}
            </strong>
          </div>

          <JackpotWrap>
            <div className="title">
              <div className="line" />
              <div className="jackpot_title">
                {t(...messages.luckyJackpot())}
              </div>
              <div className="line" />
            </div>

            <div className="text">
              <p>
                Jackpot Raw result = <strong>{decimalResult}</strong>
              </p>
              {LIST_CHOICE_WHEEL.map((choice, index) => (
                <p className={resultIndex === index ? 'active' : ''}>
                  <strong style={{ color: LIST_COLOR_WHEEL[index] }}>
                    {choice}
                  </strong>{' '}
                  = (<strong>{decimalResult}</strong> % 1000000000) {'<'}{' '}
                  {COMPARE_JACKPOT[index]}
                  <br />
                  <span style={{ marginLeft: 20 }}>
                    = {decimalResult % 1000000000} {'<'}{' '}
                    {COMPARE_JACKPOT[index]}
                  </span>
                  <br />
                  <span style={{ marginLeft: 20 }}>
                    ={' '}
                    {decimalResult % 1000000000 < COMPARE_JACKPOT[index]
                      ? 'true'
                      : 'false'}
                  </span>
                  {resultIndex === index && (
                    <img
                      className="jackpot_icon"
                      src={JackpotIcon}
                      alt="Jackpot Icon"
                    />
                  )}
                </p>
              ))}
            </div>
          </JackpotWrap>
        </div>
      )}
    </>
  );
};

export default ResultBox;
