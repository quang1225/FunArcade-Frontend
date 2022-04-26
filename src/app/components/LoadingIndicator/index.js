import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px;
`;

const LoadingIndicator = () => (
  <Wrapper>
    <CircularProgress />
  </Wrapper>
);

export default LoadingIndicator;
