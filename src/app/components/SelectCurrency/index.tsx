import { MenuItem } from '@mui/material';
import { selectCurencies } from 'app/redux/selectors';
import { Dispatch } from 'react';
import { useSelector } from 'react-redux';
import CommonSelect from '../common/CommonSelect';
import styled from 'styled-components';

interface Props {
  currencyId?: number;
  setCurrencyId: Dispatch<React.SetStateAction<number | undefined>>;
}

const Wrapper = styled.div`
  .MuiInputBase-root {
    font-weight: bold;
    color: #ffe37e;
  }
`;

const StyledCurrencyMenuItem = styled(MenuItem)`
  font-weight: bold !important;
  color: #ffe37e !important;
`;

const SelectCurrency = (props: Props) => {
  const currencies = useSelector(selectCurencies);
  const { currencyId = currencies[0]?.id || 0, setCurrencyId } = props;

  const onChange = (value: string) => {
    setCurrencyId(Number(value));
  };

  return (
    <Wrapper>
      <CommonSelect
        value={currencyId + ''}
        onChange={onChange}
        className="select_currency"
      >
        {currencies.map(x => (
          <StyledCurrencyMenuItem key={x.id} value={x.id}>
            {x.shortname}
          </StyledCurrencyMenuItem>
        ))}
      </CommonSelect>
    </Wrapper>
  );
};

export default SelectCurrency;
