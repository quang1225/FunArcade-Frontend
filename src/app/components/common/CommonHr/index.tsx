import styled from 'styled-components';

interface CssProps {
  color?: string;
  marginTop?: number | string;
  marginBottom?: number | string;
}

export default styled.hr<CssProps>`
  width: 100%;
  height: 2px;
  margin-top: ${props => props.marginTop || '0'}px;
  margin-bottom: ${props => props.marginBottom || '0'}px;
  background-color: ${props =>
    props.color || 'var(--global--background-color-2)'};
  border: none;
  flex: 0 0 auto;
`;
