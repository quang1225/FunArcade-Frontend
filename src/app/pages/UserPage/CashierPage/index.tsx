import Cashier from 'app/components/Cashier';
import ContentBox from 'app/components/ContentBox';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { messages } from './messages';

export const CASHIER_WIDTH = 550;

const Wrapper = styled.div`
  width: ${CASHIER_WIDTH}px !important;

  @media (max-width: 768px) {
    width: 100% !important;
  }
`;

const CashierPage = () => {
  const { t } = useTranslation();

  const title = t(...messages.cashier());

  return (
    <Wrapper>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <ContentBox title={title} padding="8px 16px">
        <Cashier />
      </ContentBox>
    </Wrapper>
  );
};

export default CashierPage;
