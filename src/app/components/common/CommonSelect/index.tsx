import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDown from '../../icons/DownArrow';

interface Props {
  onChange?: (x: string) => void;
  value?: string;
  icon?: any;
  placeholder?: any;
  label?: any;
  borderRadius?: number;
  hasBorder?: boolean;
  className?: string;
  style?: any;
  children: any;
  disabled?: boolean;
  readOnly?: boolean;
}

interface CssProps {
  $hasBorder?: boolean;
  $readOnly?: boolean;
  $borderRadius?: number;
}

const CustomFormControl = styled(FormControl)<CssProps>`
  display: flex !important;

  .MuiSelect-select {
    cursor: ${props => (props.$readOnly ? 'initial' : 'pointer')};
  }

  .MuiInputBase-root {
    background-color: var(--global--background-color-2);
    border: 2px solid var(--global--background-color-4);
    border-radius: ${props => props.$borderRadius || 8}px;
    color: white;
    height: ${props => (props.$hasBorder ? 40 : 42)}px;

    svg {
      display: ${props => (props.$readOnly ? 'none' : '')};
      position: absolute;
      right: 6px;
      top: 7px;
      pointer-events: none;
    }

    fieldset {
      border: 0;
    }
  }
`;

const CommonSelect = (props: Props) => {
  const {
    label,
    borderRadius,
    hasBorder,
    className,
    value = '',
    onChange,
    style,
    children,
    disabled,
    readOnly,
  } = props;

  const onChangeInput = (e: any) => {
    onChange?.(e.target.value + '');
  };

  return (
    <CustomFormControl
      variant="outlined"
      $borderRadius={borderRadius}
      $hasBorder={hasBorder}
      $readOnly={readOnly}
      className={className}
    >
      {label && <label>{label}</label>}
      <Select
        value={value}
        onChange={onChangeInput}
        readOnly={readOnly}
        IconComponent={ArrowDown}
        disabled={disabled}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: 'var(--global--background-color-2)',
              color: 'white',
              borderRadius: 8,
            },
          },
          MenuListProps: {
            style: {
              padding: 0,
              borderRadius: 8,
            },
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        }}
        style={style}
      >
        {children}
      </Select>
    </CustomFormControl>
  );
};

export default CommonSelect;
