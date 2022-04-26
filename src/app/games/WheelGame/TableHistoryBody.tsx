import {
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from '@mui/material';
import CommonButton from 'app/components/common/CommonButton';
import ProvablyFairPopup from 'app/components/ProvablyFairPopup';
import { messages } from 'app/components/common/CommonTable/messages';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatAmount, ISOtoLocalDatetimeStr } from 'utils/constants';
import { WHEEL_GAME_SLUG } from 'utils/gameConfig';
import { useSelector } from 'react-redux';
import { UserHistory } from 'app/appTypes';
import { selectUserHistory, selectUserWallets } from 'app/redux/selectors';
import styled from 'styled-components';
import { WheelBetListWrap } from './RightMenuGame';
import ChoiceBox from './ChoiceBox';
import { WheelHistoryExtraData } from './types';

const JackpotButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 116px;
  height: 32px;
  background: linear-gradient(180deg, #ffe26f 0%, #ffbc08 100%);
  border-radius: 20px;
  font-weight: bold;
  color: black;
  margin: 0 auto;
`;

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#102a51',
    padding: 12,
  },
}));

const color0 = '#FFFEF8';
const color1 = '#e34133';
const color2 = '#1cbaff';
const color3 = '#ffc700';
const listColor = [color0, color1, color2, color3];

const JacportTooltipWrap = styled.div`
  .line {
    display: flex;
    /* width: 200px; */
    justify-content: space-between;
    font-size: 14px;

    :not(:last-child) {
      margin-bottom: 8px;
    }

    .text {
      margin-right: 24px;
    }

    .amount {
      font-weight: bold;
    }
  }
`;

const TableHistoryBody = () => {
  const { t } = useTranslation();
  const userHistory = useSelector(selectUserHistory);
  const userWallets = useSelector(selectUserWallets);
  const [verifyObj, setVerifyObj] = useState<UserHistory>();
  const [showFair, setShowFair] = useState(false);

  const clickVerify = (x: UserHistory) => {
    setVerifyObj(x);
    setShowFair(true);
  };

  const findWallet = (walletId: string) =>
    userWallets.find(x => x.walletObj.id === walletId);

  const BettedList = (betAmountList: number[] | undefined) => (
    <WheelBetListWrap>
      <ul>
        {betAmountList?.map((amount, index) => (
          <li key={`choice_bet_amount-${index}`}>
            <ChoiceBox choice={index} small />
            {formatAmount(amount)}
          </li>
        ))}
      </ul>
    </WheelBetListWrap>
  );

  const JackpotTooltip = (data: UserHistory) => (
    <JacportTooltipWrap>
      <div className="line">
        <div className="text">Total amount</div>
        <div className="amount">{formatAmount(data.jackpotTotalAmount)}</div>
      </div>
      <div className="line">
        <div className="text">Your share</div>
        <div className="amount">{formatAmount(data.jackpotWinAmount)}</div>
      </div>
    </JacportTooltipWrap>
  );

  return (
    <>
      <TableBody>
        {[...userHistory].map(x => (
          <TableRow key={x.gameNumber}>
            <TableCell component="th" scope="row" align="left">
              <span className="game_number" onClick={() => clickVerify(x)}>
                {x.gameNumber}
              </span>
            </TableCell>
            <TableCell
              align="center"
              style={{ letterSpacing: 1 }}
              className="hideOnMobile"
            >
              {x.time && ISOtoLocalDatetimeStr(x.time)}
            </TableCell>
            <TableCell align="center" className="hideOnMobile">
              {x.crash >= 0 && (
                <div
                  className="result-wheel"
                  style={{
                    backgroundColor: listColor[x.crash],
                  }}
                />
              )}
            </TableCell>
            <TableCell align="center" className="hideOnMobile">
              {x.isJackpot ? (
                <StyledTooltip title={JackpotTooltip(x)} placement="bottom">
                  <JackpotButton>Jackpot!</JackpotButton>
                </StyledTooltip>
              ) : (
                '-'
              )}
            </TableCell>
            <TableCell align="center" className="hideOnMobile">
              <StyledTooltip
                title={BettedList(
                  (x.extraGameData as WheelHistoryExtraData)?.betAmountList,
                )}
                placement="right"
              >
                <b style={{ color: '#0094FF' }}>{formatAmount(x.betAmount)}</b>
              </StyledTooltip>
            </TableCell>
            <TableCell align="center">
              <strong>
                {x.cashOut >= 0 ? formatAmount(x.cashOut) : 0}{' '}
                {findWallet(x.walletId)?.currencyObj.shortname}
              </strong>
            </TableCell>
            <TableCell align="right">
              <CommonButton
                className="verify-btn"
                onClick={() => clickVerify(x)}
                text={t(...messages.verify())}
                background="var(--global--background-color-2)"
                borderRadius={20}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <ProvablyFairPopup
        showFair={showFair}
        setShowFair={setShowFair}
        gameSlug={WHEEL_GAME_SLUG}
        userHistory={verifyObj}
        setVerifyObj={setVerifyObj}
      />
    </>
  );
};

export default TableHistoryBody;
