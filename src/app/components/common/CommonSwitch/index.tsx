import styled from 'styled-components';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface Props {
  name: string;
  checked: boolean;
  text?: any;
  onChange: any;
  disabled?: boolean;
}

const CustomSwitch = styled(Switch)`
  width: 50px !important;
  height: 24px !important;
  padding: 0 !important;

  .Mui-disabled {
    color: white !important;
  }

  .Mui-checked {
    .MuiSwitch-thumb {
      color: #00c242;
    }
  }

  .MuiSwitch-switchBase {
    top: -5px;
    left: -4px;
    &.Mui-checked {
      left: -9px;
    }
  }

  .MuiSwitch-thumb {
    width: 16px;
    height: 16px;
  }

  .MuiSwitch-track {
    opacity: 1 !important;
    background-color: var(--global--background-color) !important;
    width: 40px;
    height: 24px;
    border-radius: 48px;
  }
`;

const CustomFormControlLabel = styled(FormControlLabel)`
  .Mui-disabled {
    color: white !important;

    .MuiSwitch-thumb {
      background-color: gray;
    }
  }
`;

const CommonSwitch = (props: Props) => {
  const { name, checked, onChange, text, disabled } = props;

  return (
    <CustomFormControlLabel
      style={{ margin: 0 }}
      control={
        <CustomSwitch
          checked={checked}
          onChange={onChange}
          name={name}
          disableRipple
          disabled={disabled}
        />
      }
      label={text}
    />
  );
};

export default CommonSwitch;
