import { messages } from './messages';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: black;
`;

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <h1>{t(...messages.header())}</h1>
    </Wrapper>
  );
}
