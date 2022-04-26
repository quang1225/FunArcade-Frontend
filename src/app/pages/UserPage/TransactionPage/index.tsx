import { TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import CommonTable from 'app/components/common/CommonTable';
import ContentBox from 'app/components/ContentBox';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

const Wrapper = styled.div`
  .table_history_wrap {
    .MuiTableCell-root {
      padding: 16px;
    }
  }
`;

const TransactionPage = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Transaction</title>
        <meta name="description" content="Transaction" />
      </Helmet>

      <ContentBox title="Transaction" padding="0" secondHeader>
        <div className="table_history_wrap">
          <CommonTable loading={false}>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Date & Time</TableCell>
                <TableCell align="center">Action</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Currency</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(Array(5).keys()).map((x, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">5:20 PM 10/09/2020</TableCell>
                  <TableCell align="center">Deposith</TableCell>
                  <TableCell align="center">0,00200000</TableCell>
                  <TableCell align="center">USD</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </CommonTable>
        </div>
      </ContentBox>
    </Wrapper>
  );
};

export default TransactionPage;
