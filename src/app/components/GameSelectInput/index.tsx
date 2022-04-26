import { MenuItem } from '@mui/material';
import styled from 'styled-components';
import { GAME_LIST } from 'utils/gameConfig';
import CommonSelect from '../common/CommonSelect';
import ProvablyFairIcon from 'app/images/icons/provably-fair.svg';
import { messages } from 'app/pages/ProvablyFairPage/messages';
import { useTranslation } from 'react-i18next';

interface Props {
  gameSlug: string;
  gameSlugChange: (gameSlug: string) => void;
  noLabel?: boolean;
  isOverviewPF?: boolean;
  disabled?: boolean;
}

const StyledMenuItem = styled(MenuItem)`
  img {
    margin-right: 8px;
  }
`;

const StyledCommonSelect = styled(CommonSelect)`
  .MuiSelect-select {
    img {
      margin-right: 8px;
    }
  }
`;

export function GameSelectInput(props: Props) {
  const { gameSlug, gameSlugChange, disabled, noLabel, isOverviewPF } = props;
  const { t } = useTranslation();

  const onChange = (value: string) => {
    gameSlugChange(value);
  };

  return (
    <StyledCommonSelect
      className="game_select_input"
      value={gameSlug}
      onChange={onChange}
      label={noLabel ? '' : 'Game'}
      disabled={disabled}
    >
      {isOverviewPF && (
        <StyledMenuItem value="general">
          <img src={ProvablyFairIcon} alt="Provably Fair Icon" />
          {t(...messages.generalOverview())}
        </StyledMenuItem>
      )}
      {GAME_LIST.filter(x => !x.isTest).map((x, index) => (
        <StyledMenuItem key={`${x.slug}_${index}`} value={x.slug}>
          <img src={x.icon} alt={x.name + ' Icon'} />
          {x.name}
        </StyledMenuItem>
      ))}
    </StyledCommonSelect>
  );
}

export default GameSelectInput;
