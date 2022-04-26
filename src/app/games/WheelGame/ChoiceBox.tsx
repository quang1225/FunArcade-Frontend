import styled from 'styled-components';
import { LIST_CHOICE_WHEEL, LIST_COLOR_WHEEL } from 'utils/gameConfig';

interface Props {
  choice: number;
  small?: boolean;
}

interface CssProps {
  $choice: number;
  $small?: boolean;
}

const Wrapper = styled.div<CssProps>`
  margin-right: 12px;
  padding: 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => (props.$small ? 14 : 18)}px;
  font-weight: bold;
  color: ${props => LIST_COLOR_WHEEL[props.$choice]};
  border: 2px solid ${props => LIST_COLOR_WHEEL[props.$choice]};
  box-sizing: border-box;
  border-radius: 8px;
`;

const ChoiceBox = (props: Props) => {
  const { choice, small } = props;

  return (
    <Wrapper $choice={choice} $small={small} className="choice">
      {LIST_CHOICE_WHEEL[choice]}
    </Wrapper>
  );
};

export default ChoiceBox;
