import FairResultGame from 'app/components/FairResultGame';
import Background from 'app/games/CrashGame/assets/fair_background.png';
import { messages } from 'app/pages/ProvablyFairPage/messages';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatAmount, spaceEvery2Char } from 'utils/constants';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';

interface Props {
  hideBreakdown: boolean;
  loading: boolean;
  clientSeed: string;
  serverSeed: string;
}

const ResultBox = (props: Props) => {
  const { clientSeed, serverSeed, hideBreakdown, loading } = props;
  const { t } = useTranslation();
  const [hex, setHex] = useState('');

  const hexTrim = hex.substring(0, 8);
  const hexArr = hexTrim.split('');
  const int = parseInt(hex.substring(0, 8), 16);
  // 0.01 will result in 1% house edge with a lowest crashpoint of 1
  const crashPoint = Math.max(1, (2 ** 32 / (int + 1)) * (1 - 0.01));
  const crashStrArr = (crashPoint + '').split('.');

  useEffect(() => {
    if (clientSeed && serverSeed) {
      const hmac = hmacSHA256(clientSeed, serverSeed);
      setHex(hmac.toString(Hex));
    }
  }, [clientSeed, serverSeed]);

  return (
    <>
      <FairResultGame image={Background} backgroundSize="160px 160px">
        {!loading && `${formatAmount(Math.floor(crashPoint * 100) / 100)}x`}
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
              ( {hexArr.join(', ')} ) = {parseInt(hexTrim, 16)}
            </div>
            <div className="hexToDec">
              {hexArr.map((char, index) => (
                <div key={char + index} className="cal_line">
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
                  <div className="number">{parseInt(hexTrim, 16)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="title">{t(...messages.rawToEdged())}</div>
          <div className="text">
            4294967296 / (<strong>{parseInt(hexTrim, 16)}</strong> + 1) * (1 -
            0.01)
            <br />={' '}
            <strong>{`${crashStrArr[0]}.${crashStrArr[1]?.substring(
              0,
              2,
            )}`}</strong>
            {crashStrArr[1]?.substring(2)}
          </div>
        </div>
      )}
    </>
  );
};

export default ResultBox;
