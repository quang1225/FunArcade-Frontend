import { TableHead, TableRow, TableCell } from '@mui/material';
import { messages } from 'app/components/common/CommonTable/messages';
import { useTranslation } from 'react-i18next';

const TableHistoryHead = () => {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell align="left">{t(...messages.gameId())}</TableCell>
        <TableCell align="center" className="hideOnMobile">
          {t(...messages.time())}
        </TableCell>
        <TableCell align="center" className="hideOnMobile">
          {t(...messages.difficulty())}
        </TableCell>
        <TableCell align="center" className="hideOnMobile">
          {t(...messages.betAmount())}
        </TableCell>
        <TableCell align="center">{t(...messages.cashOut())}</TableCell>
        <TableCell align="right">{t(...messages.verification())}</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHistoryHead;
