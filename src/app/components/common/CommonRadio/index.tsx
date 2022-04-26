import styled from 'styled-components';
import UncheckedCheckbox from '../../icons/UncheckedCheckbox';
import CheckedCheckbox from '../../icons/CheckedCheckbox';
import Radio from '@mui/material/Radio';
import CommonFormLabel from '../CommonFormLabel';

interface Props {
  text?: any;
  value: string;
  checked?: boolean;
  labelPlacement?: 'top' | 'bottom' | 'start' | 'end';
}

const CustomRadio = styled(Radio)`
  padding: 6px !important;
  margin-right: 9px !important;

  .MuiIconButton-label {
    width: 24px;
  }
`;

const CommonRadio = (props: Props) => (
  <CommonFormLabel
    value={props.value}
    control={
      <CustomRadio
        icon={<UncheckedCheckbox />}
        checkedIcon={<CheckedCheckbox />}
        disableRipple
      />
    }
    label={props.text}
  />
);

export default CommonRadio;
