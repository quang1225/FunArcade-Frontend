import { Collapse, useMediaQuery } from '@mui/material';
import HeaderRightMenu from 'app/components/game-page/HeaderRightMenu';
import { selectExpandMobile } from 'app/pages/GamePage/redux/selectors';
import { selectToken } from 'app/redux/selectors';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { messages } from 'app/pages/GamePage/messages';
import CommonButton from 'app/components/common/CommonButton';
import { clickLoginCommon, MOBILE_QUERY } from 'utils/constants';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div``;

const RightMenuGame = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const expandMobile = useSelector(selectExpandMobile);
  const token = useSelector(selectToken);

  const clickLoginBtn = () => {
    clickLoginCommon();
    return;
  };

  return (
    <Wrapper>
      <Collapse in={expandMobile || !isMobile}>
        <HeaderRightMenu hideAutobet={isMobile} hideHr />

        {!token && (
          <CommonButton
            className="btn-action glow"
            text={t(...messages.loginToPlay())}
            background={!token ? 'var(--global--button-color)' : '#00C242'}
            fontWeight={700}
            height={40}
            onClick={clickLoginBtn}
          />
        )}
      </Collapse>
    </Wrapper>
  );
};

export default RightMenuGame;
