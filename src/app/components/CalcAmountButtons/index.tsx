import { CalcButton } from 'app/games/WheelGame/types';
import { selectToken } from 'app/redux/selectors';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TRANSITION_TIME } from 'utils/constants';

interface Props {
  setBetAmount: any;
  betAmount: number;
  className?: string;
  disabled?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .btn {
    background-color: var(--global--background-color-2);
    border-radius: 4px;
    color: white;
    border: none;
    height: 32px;
    padding: 0 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color ${TRANSITION_TIME}s;

    &:hover,
    &.Mui-selected {
      background-color: var(--global--background-color-3);
    }

    &.glow {
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
  }

  &.disabled {
    .btn {
      background-color: var(--global--text-color-2);
      pointer-events: none;
      animation: none;
    }
  }
`;

const CalcAmountButtons = (props: Props) => {
  const { setBetAmount, betAmount, className, disabled } = props;
  const token = useSelector(selectToken);

  const listCalcButtons: CalcButton[] = [
    {
      text: 'Clear',
      func: x => 0,
      isGlow: false,
    },
    {
      text: '+10',
      func: x => (x += 10),
      isGlow: Boolean(token),
    },
    {
      text: '+100',
      func: x => (x += 100),
      isGlow: Boolean(token),
    },
    {
      text: '+1k',
      func: x => (x += 1000),
      isGlow: Boolean(token),
    },
    {
      text: 'x2',
      func: x => (x *= 2),
      isGlow: Boolean(token && betAmount),
    },
  ];

  return (
    <Wrapper
      className={`calc_buttons ${className} ${disabled ? 'disabled' : ''}`}
    >
      {listCalcButtons.map(x => (
        <div
          key={`calc-btn-${x.text}`}
          className={`btn ${x.isGlow ? 'glow' : ''}`}
          onClick={() => setBetAmount(prev => x.func(prev))}
        >
          {x.text}
        </div>
      ))}
    </Wrapper>
  );
};

export default CalcAmountButtons;
