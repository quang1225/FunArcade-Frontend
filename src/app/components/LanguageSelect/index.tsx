import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  checkDefaultLang,
  LIST_LANGUAGE,
  TRANSITION_TIME,
} from '../../../utils/constants';
import styled from 'styled-components';
import Popover from '@mui/material/Popover';
import { messages } from '../Header/messages';
import { Tooltip } from '@mui/material';

const LanguageWrap = styled.li`
  list-style: none;

  .lang-wrapper {
    display: flex;
    color: white;
    list-style: none;
  }

  .icon {
    width: 24px;
    height: 24px;
    background: linear-gradient(
      180deg,
      var(--global--body-color) 0%,
      #327aff 100%
    );
    text-align: center;
    border-radius: 48px;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    cursor: pointer;
  }

  .text {
    margin-left: 12px;
  }
`;

const ListLangWrap = styled(Popover)`
  .MuiPaper-root {
    background-color: var(--global--background-color-2);
    color: white;
    border-radius: 8px;
    border: 2px solid var(--global--button-color);

    ul {
      margin: 0;

      li {
        cursor: pointer;
        padding: 8px;
        transition: background-color ${TRANSITION_TIME}s;
        border-radius: 8px;

        &:hover,
        .active {
          background-color: var(--global--button-color);
        }
      }
    }
  }
`;

interface Props {
  showText?: boolean;
  isGameChat?: boolean;
}

export function LanguageSelect(props: Props) {
  const { t } = useTranslation();
  const { showText, isGameChat } = props;
  const { i18n } = useTranslation();
  const [value, setValue] = useState(checkDefaultLang(i18n.language));
  const [elLang, setElLang] = useState<null | HTMLElement>(null);

  const setLang = value => {
    setElLang(null);
    if (isGameChat) return;

    setValue(value);
    i18n.changeLanguage(value);
  };

  return (
    <>
      <Tooltip title={t(...messages.language()) + ''}>
        <LanguageWrap
          className="select-language"
          onClick={e => setElLang(e.currentTarget)}
        >
          <div className="lang-wrapper">
            <div className="icon">
              {value?.toLocaleUpperCase().substring(0, 2)}
            </div>
            {showText && (
              <div className="text">{t(...messages.language())}</div>
            )}
          </div>
        </LanguageWrap>
      </Tooltip>

      <ListLangWrap
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ zIndex: 1401 }}
        id="customized-menu"
        anchorEl={elLang}
        open={Boolean(elLang)}
        onClose={() => setElLang(null)}
      >
        <ul>
          {LIST_LANGUAGE.map(x => (
            <li key={x.value} onClick={() => setLang(x.value)}>
              {x.name}
            </li>
          ))}
        </ul>
      </ListLangWrap>
    </>
  );
}

export default LanguageSelect;
