import { RadioGroup } from '@mui/material';
import CommonButton from 'app/components/common/CommonButton';
import CommonField from 'app/components/common/CommonField';
import CommonHr from 'app/components/common/CommonHr';
import CommonRadio from 'app/components/common/CommonRadio';
import CommonSwitch from 'app/components/common/CommonSwitch';
import CommonTab from 'app/components/common/CommonTab';
import ContentBox from 'app/components/ContentBox';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { messages } from './messages';

const Wrapper = styled.div`
  width: 672px;

  .tab_content {
    padding: 16px 0;
  }

  .description {
    margin-bottom: 24px;
  }

  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 40px;
    row-gap: 24px;
  }

  .submit-btn {
    display: flex;
    margin: 0 auto;
  }

  .profile_tab {
    .gender-wrap {
      .gender-radio {
        flex-direction: row;
      }
    }
  }

  .security_tab {
    width: 50%;

    form {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  @media (max-width: 768px) {
    form {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

const SettingsPage = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const [secondFA, setSecondFA] = useState(false);

  const title = t(...messages.settings());

  const listWalletTab = [t(...messages.profile()), t(...messages.security())];

  return (
    <Wrapper>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <ContentBox noHeader padding="8px 24px">
        <CommonTab
          name="wallet-dialog"
          listTab={listWalletTab}
          currentTab={tab}
          setTab={setTab}
          devided
          tabMargin={24}
        />

        <div className="tab_content">
          {tab === 0 && (
            <div className="profile_tab">
              <div className="description">{t(...messages.profileDes())}</div>
              <form>
                <CommonField
                  type="text"
                  name="firstName"
                  label={t(...messages.firstName())}
                />
                <CommonField
                  type="text"
                  name="userName"
                  label={t(...messages.userName())}
                />
                <CommonField
                  type="text"
                  name="lastName"
                  label={t(...messages.lastName())}
                />
                <CommonField
                  type="text"
                  name="email"
                  label={t(...messages.email())}
                />
                <CommonField
                  type="number"
                  name="phoneNumber"
                  label={t(...messages.phoneNumber())}
                />
                <div className="gender-wrap">
                  <label htmlFor="gender">Gender</label>
                  <RadioGroup name="gender" className="gender-radio">
                    <CommonRadio value="male" text="Male" />
                    <CommonRadio value="female" text="Female" />
                  </RadioGroup>
                </div>
              </form>
            </div>
          )}

          {tab === 1 && (
            <div className="security_tab">
              <div className="description">{t(...messages.securityDes())}</div>
              <form>
                <CommonField
                  type="text"
                  name="newPassword"
                  label={t(...messages.oldPassword())}
                />
                <CommonField
                  type="text"
                  name="newPassword"
                  label={t(...messages.newPassword())}
                />
                <CommonField
                  type="text"
                  name="confirmNewPassword"
                  label={t(...messages.confirmNewPassword())}
                />
                <CommonSwitch
                  checked={secondFA}
                  text={t(...messages.enable2FA())}
                  name="2fa-check"
                  onChange={() => setSecondFA(!secondFA)}
                />
              </form>
            </div>
          )}

          <CommonHr marginTop="24" marginBottom="24" />

          <CommonButton
            className="submit-btn"
            text={t(...messages.submit())}
            width="160"
          />
        </div>
      </ContentBox>
    </Wrapper>
  );
};

export default SettingsPage;
