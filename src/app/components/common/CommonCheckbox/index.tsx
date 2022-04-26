import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import UncheckedCheckbox from '../../icons/UncheckedCheckbox';
import CheckedCheckbox from '../../icons/CheckedCheckbox';
import CommonFormLabel from '../CommonFormLabel';

interface Props {
  name: string;
  text?: any;
  onClick?: any;
  checked?: boolean;
  className?: string;
  onChange?: any;
  disabled?: boolean;
}

const CustomCheckbox = styled(Checkbox)`
  padding: 6px !important;
  margin-right: 4px !important;

  .MuiIconButton-label {
    width: 24px;
  }
`;

const CommonCheckbox = (props: Props) => {
  const { className, onChange, text, disabled, checked } = props;

  return (
    <CommonFormLabel
      className={className}
      control={
        <CustomCheckbox
          checked={checked}
          icon={<UncheckedCheckbox />}
          checkedIcon={<CheckedCheckbox />}
          disableRipple
          onChange={onChange}
          disabled={disabled}
        />
      }
      label={text}
    />
  );
};

export default CommonCheckbox;
