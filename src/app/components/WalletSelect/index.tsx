import styled from 'styled-components';
import CommonSelect from '../common/CommonSelect';
import { formatAmount, getSelectedWalletLS } from 'utils/constants';
import { MenuItem } from '@mui/material';
import {
  selectCurrentWallet,
  selectToken,
  selectUserWallets,
} from 'app/redux/selectors';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserWallets,
  setCurrentWallet,
  setWalletBalance,
} from 'app/redux/actions';

const Wrapper = styled.div`
  display: flex;
  margin-right: 23px;

  .MuiInputBase-root {
    display: flex;
    border-radius: 24px;
    font-weight: bold;
    font-size: 16px;

    .symbol {
      margin-left: 8px;
      margin-right: 8px;
      color: #ffe37e;
    }
  }

  @media (max-width: 768px) {
    width: unset;
    margin-right: auto;
    margin-left: auto;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  font-weight: bold !important;
  font-size: 16px !important;

  .symbol {
    margin-left: 8px;
    color: #ffe37e;
  }
`;

export default function WalletSelect() {
  const dispatch = useDispatch();
  const userWallets = useSelector(selectUserWallets);
  const currentWallet = useSelector(selectCurrentWallet);
  const token = useSelector(selectToken);
  const [select, setSelect] = useState(0);

  useEffect(() => {
    if (userWallets?.[0]) {
      const selectedWalletLS = getSelectedWalletLS();
      setSelect(selectedWalletLS);
      const selectedWallet = selectedWalletLS ? +selectedWalletLS : 0;
      const tempCurrentWallet = userWallets[selectedWallet];
      dispatch(setCurrentWallet(tempCurrentWallet));
    }
  }, [userWallets]);

  useEffect(() => {
    if (currentWallet) {
      dispatch(
        setWalletBalance({
          walletId: currentWallet.walletObj.id,
          balance: currentWallet.walletObj.balance,
        }),
      );
    }
  }, [currentWallet]);

  useEffect(() => {
    if (token) {
      dispatch(getUserWallets());
    }
  }, [token]);

  const onChange = (value: string) => {
    setSelect(+value);
    localStorage.setItem('selected_wallet', value);
    dispatch(setCurrentWallet(userWallets[value]));
  };

  return (
    <Wrapper className="wallet_select">
      <CommonSelect value={select + ''} hasBorder onChange={onChange}>
        {userWallets.map((x, index) => (
          <StyledMenuItem key={`${x.walletObj.id}`} value={index}>
            <span className="amount">{formatAmount(x.walletObj.balance)}</span>
            <span className="symbol">{x.currencyObj.shortname}</span>
          </StyledMenuItem>
        ))}
      </CommonSelect>
    </Wrapper>
  );
}
