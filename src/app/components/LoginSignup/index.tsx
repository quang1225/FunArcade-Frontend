import CommonField from 'app/components/common/CommonField';
import CommonTab from 'app/components/common/CommonTab';
import styled from 'styled-components';
import { messages } from './messages';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CommonButton from '../common/CommonButton';
import MetamaskButton from 'app/images/wallets/metamask-button.svg';
import TrustWalletButton from 'app/images/wallets/trust_wallet-button.svg';
import CoinbaseButton from 'app/images/wallets/coinbase-button.svg';
import { MOBILE_QUERY, TRANSITION_TIME } from 'utils/constants';
import TextMiddleLine from '../TextMiddleLine';
import { useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { connectWallet } from 'app/redux/actions';

const Wrapper = styled.div`
  padding-bottom: 12px;

  .MuiFormControl-root,
  .input_wrap,
  .MuiTabs-root,
  .forgot_password,
  .submit-btn {
    margin-bottom: 16px;
  }

  .forgot_password {
    display: inline-block;
    color: #ffbc57;
    cursor: pointer;
    transition: color ${TRANSITION_TIME}s;

    :hover {
      color: #f89500;
    }
  }

  .submit-btn {
    display: flex;
    margin-top: 0px;
    margin-right: auto;
    margin-left: auto;
  }

  .wallet_buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    img {
      cursor: pointer;
      width: 200px;
      height: 64px;
      transition: filter ${TRANSITION_TIME}s;

      :hover {
        filter: brightness(85%);
      }
    }
  }
`;

const LoginSignup = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const clickConnectWallet = (provider: string) => {
    dispatch(connectWallet(provider, isMobile));
  };

  return (
    <Wrapper>
      <CommonTab
        name="wallet-dialog"
        listTab={['Signup', 'Login']}
        currentTab={tab}
        setTab={setTab}
        tabMargin={40}
        devided
      />

      <div className="bank_info_tab">
        <CommonField
          type="text"
          name="username"
          label={t(...messages.username())}
        />
        <CommonField
          type="text"
          name="password"
          label={t(...messages.password())}
        />
        {tab === 1 && (
          <span className="forgot_password">
            {t(...messages.forgotPassword())}
          </span>
        )}
        {tab === 0 && (
          <CommonField
            type="text"
            name="email"
            label={`${t(...messages.email())} ${t(...messages.optional())}`}
          />
        )}

        <CommonButton
          className="submit-btn"
          text={tab === 0 ? t(...messages.signup()) : t(...messages.login())}
          width="160"
        />

        <TextMiddleLine text={t(...messages.orConnectWith())} />

        <div className="wallet_buttons">
          <img
            src={MetamaskButton}
            alt="Metamask Button"
            onClick={() => clickConnectWallet('metamask')}
          />
          <img
            src={TrustWalletButton}
            alt="Trust Wallet Button"
            onClick={() => clickConnectWallet('trust-wallet')}
          />
          <img
            src={CoinbaseButton}
            alt="Coinbase Button"
            onClick={() => clickConnectWallet('coinbase-wallet')}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginSignup;
