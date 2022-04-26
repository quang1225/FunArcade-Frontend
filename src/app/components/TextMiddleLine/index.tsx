import styled from 'styled-components';

interface Props {
  text: string;
  borderColor?: string;
  space?: number;
}

interface CssProps {
  $borderColor: string;
  $space: number;
}

const Wrapper = styled.div<CssProps>`
  overflow: hidden;
  text-align: center;
  margin: ${props => props.$space}px 0;

  :before,
  :after {
    background-color: ${props => props.$borderColor};
    content: '';
    display: inline-block;
    height: 2px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }

  :before {
    right: 1em;
    margin-left: -50%;
  }
  :after {
    left: 1em;
    margin-right: -50%;
  }
`;

export default function TextMiddleLine({
  text,
  borderColor = '#58708C',
  space = 24,
}: Props) {
  return (
    <Wrapper $borderColor={borderColor} $space={space}>
      <span>{text}</span>
    </Wrapper>
  );
}
