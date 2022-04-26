import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { ChangeEvent, memo } from 'react';
import {
  CircularProgress,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from '@mui/material';
import { selectIsLoadingGame } from 'app/pages/GamePage/redux/selectors';
import { useSelector } from 'react-redux';

interface Props {
  HistoryHead?: any;
  children: any;
  page?: number;
  setPage?: any;
  rowsPerPage?: number;
  totalCount?: number;
  setRowsPerPage?: any;
  loading?: boolean;
}

const StyledTable = styled(TableContainer)`
  overflow: hidden;

  .MuiTablePagination-root {
    color: white;

    .MuiSelect-icon {
      color: white;
    }
  }

  .MuiTableCell-root {
    border-color: var(--global--background-color);
    border-width: 2px;
    padding: 8px;
    font-size: 14px;

    &:first-child {
      padding-left: 16px;
    }
    &:last-child {
      padding-right: 16px;
    }
  }

  .MuiTableCell-head {
    color: var(--global--text-color);
    font-weight: bold;
    font-size: 14px;
    background-color: var(--global--background-color-2);
    border: none;
    height: 56px;
  }

  .MuiTableCell-body {
    color: white;
  }

  .verify-btn {
    box-shadow: none;
    border: 2px solid var(--global--background-color-2);
    height: 32px;
    font-size: 14px;
  }

  .result-wheel {
    border-radius: 48px;
    width: 16px;
    height: 16px;
    display: inline-flex;
    margin-bottom: -3px;
  }

  @media (max-width: 768px) {
    .hideOnMobile {
      display: none;
    }
  }
`;

const CommonTable = memo((props: Props) => {
  const {
    HistoryHead,
    children,
    page,
    setPage,
    rowsPerPage = 10,
    totalCount = 0,
    setRowsPerPage,
    loading,
  } = props;
  const isLoadingGame = useSelector(selectIsLoadingGame);
  const tableLoading = loading !== undefined ? loading : isLoadingGame;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <StyledTable>
      <Table>
        {HistoryHead && <HistoryHead />}

        {!tableLoading && children}

        {tableLoading && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      {page !== undefined && page >= 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          rowsPerPage={rowsPerPage}
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </StyledTable>
  );
});

export default CommonTable;
