import styled from 'styled-components';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface Props {
  value?: any;
  onChange?: any;
  list: Item[];
  className?: string;
  disabled?: boolean;
}

interface CssProps {
  disabled?: boolean;
}

const BtnGroupWrap = styled(ToggleButtonGroup)<CssProps>`
  justify-content: space-between;
  width: 100%;

  button {
    background-color: ${props =>
      props.disabled
        ? 'var(--global--text-color-2)'
        : 'var(--global--background-color-2)'};
    border-radius: 4px !important;
    color: white !important;
    border: none;
    height: 40px;
    padding: 0 18px;

    &:hover,
    &.Mui-selected {
      background-color: var(--global--background-color-3) !important;
    }
  }

  &.glow button {
    animation: glowBorder 0.7s infinite alternate;
    @keyframes glowBorder {
      0% {
        border: 2px solid rgba(255, 218, 87, 0.5);
      }
      100% {
        border: 2px solid rgba(255, 218, 87, 1);
      }
    }
  }
`;

interface Item {
  id: string;
  value: string;
}

const CommonBtnGroup = (props: Props) => {
  const { disabled, className, value, list } = props;

  const handleChange = (
    e: React.MouseEvent<HTMLElement>,
    newValue: string | null,
  ) => {
    props.onChange(newValue);
  };

  return (
    <BtnGroupWrap
      className={className}
      value={value}
      exclusive
      onChange={handleChange}
      disabled={disabled}
    >
      {list.map((item: Item) => (
        <ToggleButton
          key={item.id}
          value={item.id}
          aria-label={item.value}
          disableRipple
          disabled={disabled}
        >
          {item.value}
        </ToggleButton>
      ))}
    </BtnGroupWrap>
  );
};

export default CommonBtnGroup;
