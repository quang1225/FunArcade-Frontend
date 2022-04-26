import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import CustomBody from 'app/components/CustomBody';
import NotFoundPage from 'app/pages/NotFoundPage';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import CashierPage from '../CashierPage/Loadable';
import GameHistoryPage from '../GameHistoryPage/Loadable';
import SettingsPage from '../SettingsPage/Loadable';
import TransactionPage from '../TransactionPage/Loadable';
import { Container } from '@mui/material';

export const USER_PATH = '/user';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .custom_body {
    overflow-y: auto;
  }

  .MuiContainer-root {
    justify-content: center;
  }

  .save-btn {
    display: flex;
    margin: 40px auto 0 auto;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  background-color: var(--global--background-color-2);
  box-shadow: 0px 4px 20px rgb(0 0 0 / 25%);
  position: relative;
  flex-direction: column;
  color: white;

  .MuiContainer-root {
    height: 80px;
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-weight: bold;
    font-size: 24px;

    li {
      cursor: pointer;

      &:hover,
      &.active {
        color: #387eff;
      }

      &:not(:first-child):before {
        content: '|';
        margin: 0 16px;
        color: #58708c;
      }
    }
  }

  @media (max-width: 768px) {
    height: 80px;

    ul {
      font-size: 14px;

      li {
        &:not(:first-child):before {
          margin: 0 4px;
        }
      }
    }
  }
`;

const UserLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const listTab = [
    {
      label: t(...messages.cashier()),
      path: '/cashier',
    },
    {
      label: t(...messages.transaction()),
      path: '/transaction',
    },
    {
      label: t(...messages.gameHistory()),
      path: '/game-history',
    },
    {
      label: t(...messages.settings()),
      path: '/settings',
    },
  ];

  const onClickTab = (path: string) => {
    navigate(USER_PATH + path);
  };

  return (
    <Wrapper>
      <HeaderWrap>
        <Container>
          <ul>
            {listTab.map(x => (
              <li
                key={x.path}
                className={`global_transition ${
                  location.pathname.includes(USER_PATH + x.path) ? 'active' : ''
                }`}
                onClick={() => onClickTab(x.path)}
              >
                {x.label}
              </li>
            ))}
          </ul>
        </Container>
      </HeaderWrap>

      <CustomBody>
        <Routes>
          <Route path="/cashier/*" element={<CashierPage />} />
          <Route path="/transaction/*" element={<TransactionPage />} />
          <Route path="/game-history/*" element={<GameHistoryPage />} />
          <Route path="/settings/*" element={<SettingsPage />} />
          <Route path="" element={<NotFoundPage />} />
        </Routes>
      </CustomBody>
    </Wrapper>
  );
};

export default UserLayout;
