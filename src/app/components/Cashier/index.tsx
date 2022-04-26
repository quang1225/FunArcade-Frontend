import CommonTab from 'app/components/common/CommonTab';
import styled from 'styled-components';
import { messages } from './messages';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatAmount, TRANSITION_TIME } from 'utils/constants';
import { selectUserWallets } from 'app/redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyCoinSvg from 'app/images/icons/currency-coin.svg';
import LeftArrow from '../icons/LeftArrow';
import CommonButton from '../common/CommonButton';
import CommonField from '../common/CommonField';
import TextMiddleLine from '../TextMiddleLine';
import { setToast } from 'app/redux/actions';
import CopyIcon from '../icons/CopyIcon';

const Wrapper = styled.div`
  padding-bottom: 12px;

  .bank_title {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 8px;

    :not(:first-child) {
      margin-top: 16px;
    }
  }

  .currency_detail {
    .title {
      font-weight: bold;
      text-align: center;
      font-size: 16px;

      span {
        position: relative;
        svg {
          position: absolute;
          left: -40px;
          cursor: pointer;
          margin-right: 12px;
          transition: stroke ${TRANSITION_TIME}s;

          :hover {
            path {
              stroke: var(--global--text-color);
            }
          }
        }
      }
    }

    .fees {
      font-weight: bold;
    }
  }

  ul.banks {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 64px;
      height: 64px;
      border-radius: 8px;
      background-image: url(${CurrencyCoinSvg});
      font-weight: bold;
      color: black;
      font-size: 16px;
      cursor: pointer;
      transition: filter ${TRANSITION_TIME}s;

      :hover {
        filter: brightness(85%);
      }
    }
  }

  ul.balance {
    font-weight: 600;
    font-size: 16px;
    background-color: #102a51;
    padding: 16px;
    border-radius: 8px;

    li {
      display: flex;
      justify-content: space-between;

      :not(:last-child) {
        margin-bottom: 8px;
      }

      .currency {
        color: #ffe26f;
      }
    }
  }

  .MuiFormControl-root,
  .input_wrap,
  .MuiTabs-root {
    margin-bottom: 24px;
  }

  .label-wallet {
    margin-bottom: 8px;
  }

  .MuiTabs-flexContainer {
    justify-content: space-between;
  }

  .currency {
    display: flex;
    justify-content: space-between;

    .MuiFormControl-root {
      width: 128px;
    }

    .moneyRange-input {
      width: 200px;
    }
  }

  .submit-btn {
    display: flex;
    margin: 0 auto 8px auto;
  }
`;

const NETWORK_NAME = 'Polygon';

const Cashier = () => {
  const dispatch = useDispatch();
  const userWallets = useSelector(selectUserWallets);
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const [selectedToken, setSelectedToken] = useState('');

  const listWalletTab = [
    t(...messages.deposit()),
    t(...messages.withdraw()),
    t(...messages.balance()),
    t(...messages.staking()),
    t(...messages.rewards()),
  ];

  const copyWalletAddress = () => {
    navigator.clipboard.writeText('abc123');

    dispatch(
      setToast({
        msg: t(...messages.walletAddressCopied()),
        type: 'success',
      }),
    );
  };

  useEffect(() => {
    setSelectedToken('');
  }, [tab]);

  return (
    <Wrapper>
      <CommonTab
        name="wallet-dialog"
        listTab={listWalletTab}
        currentTab={tab}
        setTab={setTab}
        devided
      />

      {tab === 0 && (
        <div className="deposit_tab">
          {!selectedToken && (
            <>
              <div className="bank_title">
                {t(...messages.cryptocurrency())}
              </div>
              <ul className="banks">
                {userWallets.map(x => (
                  <li
                    key={x.currencyObj.shortname}
                    onClick={() => setSelectedToken(x.currencyObj.shortname)}
                  >
                    {x.currencyObj.shortname}
                  </li>
                ))}
              </ul>
            </>
          )}
          {selectedToken && (
            <div className="currency_detail">
              <div className="title">
                <span onClick={() => setSelectedToken('')}>
                  <LeftArrow />
                </span>{' '}
                {t(...messages.deposit())} {selectedToken.toLocaleUpperCase()}
              </div>

              <CommonField
                type="text"
                name="amountWallet"
                label={t(...messages.amount())}
                rightTextOrIcon={selectedToken.toLocaleUpperCase()}
              />

              <CommonButton
                className="submit-btn"
                text={`${t(...messages.deposit())} ${t(...messages.via())} ${t(
                  ...messages.wallet(),
                )}`}
                width="160"
              />

              <TextMiddleLine text={t(...messages.orSendTo())} />

              <CommonField
                type="text"
                name="walletAddress"
                label={`${t(...messages.walletAddress())}`}
                rightTextOrIcon={<CopyIcon />}
                onClickRightTextOrIcon={copyWalletAddress}
                value={'abc123'}
                readonly
              />

              <div className="notice_text">
                <p>
                  {t(...messages.network())}: {NETWORK_NAME}
                </p>
                <p>
                  {t(...messages.depositNoticeText1())} {selectedToken}{' '}
                  {t(...messages.depositNoticeText2())} {NETWORK_NAME}{' '}
                  {t(...messages.depositNoticeText3())}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 1 && (
        <div className="withdraw_tab">
          {!selectedToken && (
            <>
              <div className="bank_title">
                {t(...messages.cryptocurrency())}
              </div>
              <ul className="banks">
                {userWallets.map(x => (
                  <li
                    key={x.currencyObj.shortname}
                    onClick={() => setSelectedToken(x.currencyObj.shortname)}
                  >
                    {x.currencyObj.shortname}
                  </li>
                ))}
              </ul>
            </>
          )}
          {selectedToken && (
            <div className="currency_detail">
              <div className="title">
                <span onClick={() => setSelectedToken('')}>
                  <LeftArrow />
                </span>
                {t(...messages.withdraw())} {selectedToken.toLocaleUpperCase()}
              </div>

              <CommonField
                type="text"
                name="amountWallet"
                label={t(...messages.amount())}
                rightTextOrIcon={selectedToken.toLocaleUpperCase()}
              />

              <CommonButton
                className="submit-btn"
                text={`${t(...messages.withdraw())} ${t(...messages.via())} ${t(
                  ...messages.wallet(),
                )}`}
                width="160"
              />

              <TextMiddleLine text={t(...messages.orSendTo())} />

              <CommonField
                type="text"
                name="amountSend"
                label={t(...messages.amount())}
                rightTextOrIcon={selectedToken.toLocaleUpperCase()}
              />

              <CommonField
                type="text"
                name="walletAddress"
                label={`${t(...messages.walletAddress())}`}
              />

              <div className="fees">
                <p>
                  {t(...messages.networkFee())}: 1,000{' '}
                  {selectedToken.toLocaleUpperCase()}
                </p>
                <p>
                  {t(...messages.youWillReceive())}: 1,000{' '}
                  {selectedToken.toLocaleUpperCase()}
                </p>
              </div>

              <CommonButton
                className="submit-btn"
                text={`${t(
                  ...messages.send(),
                )} ${selectedToken.toLocaleUpperCase()}`}
                width="160"
              />

              <div className="notice_text">
                <p>{t(...messages.network())}: Polygon</p>
                <p>
                  {t(...messages.withdrawNoticeText1())} {selectedToken}{' '}
                  {t(...messages.withdrawNoticeText2())} {NETWORK_NAME}{' '}
                  {t(...messages.withdrawNoticeText3())}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 2 && (
        <div className="balance_tab">
          <ul className="balance">
            {userWallets.map(x => (
              <li key={x.currencyObj.shortname}>
                <div className="amount">
                  {formatAmount(x.walletObj.balance)}
                </div>
                <div className="currency">{x.currencyObj.shortname}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 3 && <div className="staking_tab"></div>}
      {tab === 4 && <div className="reward_tab"></div>}
    </Wrapper>
  );
};

export default Cashier;
