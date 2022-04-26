import styled from 'styled-components';
import Container from '@mui/material/Container';
import { HEADER_HEIGHT } from '../../../utils/constants';

interface Props {
  children?: any;
  width?: number;
  className?: string;
}

interface CssProps {
  width?: number;
}

const BodyWrap = styled.div<CssProps>`
  background: linear-gradient(
    180deg,
    var(--global--body-color) 0%,
    var(--global--body-color-2) 100%
  );
  flex: 1;
  padding: 40px 0;

  .MuiContainer-root {
    height: unset;
    display: flex;

    > div {
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    .MuiContainer-root {
      width: ${props => (props.width ? `${props.width}px` : 'unset')};
      padding: ${props => (props.width ? 0 : '')};
    }
  }

  @media (max-width: 768px) {
    padding: 24px 0;
    padding-bottom: ${HEADER_HEIGHT + 32}px;
  }
`;

const CustomBody = (props: Props) => {
  const { width, children, className = '' } = props;
  return (
    <BodyWrap width={width} className={`custom_body ${className}`}>
      <Container>{children}</Container>
    </BodyWrap>
  );
};

export default CustomBody;
