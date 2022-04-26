import { useMediaQuery } from '@mui/material';
import {
  setClickConfirmAutobet,
  setShowAutobetPopup,
} from 'app/pages/GamePage/redux/actions';
import { selectShowAutobetPopup } from 'app/pages/GamePage/redux/selectors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MOBILE_QUERY } from 'utils/constants';
import CommonButton from '../common/CommonButton';
import CommonDialog from '../common/CommonDialog';
import CommonSwitch from '../common/CommonSwitch';
import { messages } from './messages';

interface Props {
  text: string;
  localStorageName: string;
  container: () => HTMLDivElement | null;
}

const ContentWrapper = styled.div`
  .text,
  label {
    margin-bottom: 18px !important;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
`;

const AutobetConfirmPopup = (props: Props) => {
  const { text, localStorageName, container } = props;
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [notRemind, setNotRemind] = useState(false);
  const showAutobetPopup = useSelector(selectShowAutobetPopup);

  const onRemindChange = e => setNotRemind(e.currentTarget.checked);

  const clickProceed = () => {
    if (notRemind) {
      localStorage.setItem(localStorageName, 'true');
    } else {
      localStorage.removeItem(localStorageName);
    }

    dispatch(setClickConfirmAutobet(true));
  };

  const onClickCancel = () => dispatch(setShowAutobetPopup(false));

  const onExited = () => {
    setNotRemind(false);
  };

  return (
    <CommonDialog
      onClose={onClickCancel}
      onExited={onExited}
      open={showAutobetPopup}
      headerTitle={t(...messages.autobetConfirm())}
      width={520}
      container={container}
      style={{
        position: !isMobile ? 'absolute' : 'fixed',
        zIndex: 1400,
      }}
      backdropProps={{
        style: {
          position: !isMobile ? 'absolute' : 'fixed',
        },
      }}
    >
      <ContentWrapper>
        <div className="text">{text}</div>

        <CommonSwitch
          checked={notRemind}
          text={t(...messages.doNotRemind())}
          name="not-remind-check"
          onChange={onRemindChange}
        />

        <div className="buttons">
          <CommonButton
            text="Cancel"
            background="#102A51"
            fontWeight={700}
            height={40}
            width={220}
            onClick={onClickCancel}
          />
          <CommonButton
            text="Proceed"
            background="#1659D4"
            fontWeight={700}
            height={40}
            width={220}
            onClick={clickProceed}
          />
        </div>
      </ContentWrapper>
    </CommonDialog>
  );
};

export default AutobetConfirmPopup;
