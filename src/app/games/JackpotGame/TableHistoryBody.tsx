import { TableRow, TableCell, TableBody } from '@mui/material';
import CommonButton from 'app/components/common/CommonButton';
import ProvablyFairPopup from 'app/components/ProvablyFairPopup';
import { messages } from 'app/components/common/CommonTable/messages';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatAmount, ISOtoLocalDatetimeStr } from 'utils/constants';
import { useSelector } from 'react-redux';
import { UserHistory } from 'app/appTypes';
import { selectUserHistory } from 'app/redux/selectors';
import { JACKPOT_GAME_SLUG } from 'utils/gameConfig';

const TableHistoryBody = () => {
  const { t } = useTranslation();
  const userHistory = useSelector(selectUserHistory);
  const [verifyObj, setVerifyObj] = useState<UserHistory>();
  const [showFair, setShowFair] = useState(false);

  const clickVerify = (x: UserHistory) => {
    setVerifyObj(x);
    setShowFair(true);
  };

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
              {x.crash >= 0 && `${x.crash}x`}
            </TableCell>
            <TableCell align="center" className="hideOnMobile">
              {formatAmount(x.betAmount)}
            </TableCell>
            <TableCell align="center">
              {x.cashOut >= 0
                ? `${formatAmount(x.cashOut)} (${formatAmount(
                    x.cashOut / x.betAmount,
                  )}x)`
                : ''}
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
        gameSlug={JACKPOT_GAME_SLUG}
        userHistory={verifyObj}
        setVerifyObj={setVerifyObj}
      />
    </>
  );
};

export default TableHistoryBody;
