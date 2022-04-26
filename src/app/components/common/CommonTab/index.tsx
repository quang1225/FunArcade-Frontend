import styled from 'styled-components';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

interface Props {
  currentTab: number | undefined;
  setTab: any;
  listTab: string[];
  devided?: boolean;
  tabMargin?: number;
  name: string;
}
interface CssProps {
  $tabMargin?: number;
}

const CustomTabs = styled(Tabs)<CssProps>`
  align-items: center;
  padding-bottom: 1px;
  min-height: unset !important;

  .MuiTab-root {
    text-transform: none;
    min-width: inherit;
    padding: 0;
    font-size: 16px;
    font-weight: bold;

    &:not(:last-child) {
      margin-right: ${props => props.$tabMargin ?? 12}px;
    }
  }

  .MuiTab-textColorPrimary {
    color: inherit;

    &:hover {
      color: var(--global--text-color);
    }
  }
  .MuiTab-textColorPrimary.Mui-selected {
    color: var(--global--text-color);
  }
  .MuiTabs-indicator {
    background-color: var(--global--text-color);
    min-width: inherit;
    height: 3px;
    border-radius: 4px;
  }
  .devided {
    background: var(--global--background-color-2);
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 3px;
  }

  @media (max-width: 768px) {
    .MuiTab-root {
      &:not(:last-of-type) {
        margin-right: ${props => props.$tabMargin ?? 24}px;
      }
    }
  }
`;

const CommonTab = (props: Props) => {
  const { currentTab, listTab, setTab, devided, tabMargin, name } = props;

  const onChange: any = (e: React.ChangeEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <CustomTabs
      value={currentTab}
      onChange={onChange}
      indicatorColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      $tabMargin={tabMargin}
    >
      {listTab?.map((label, index) => (
        <Tab key={`${name}-${index}`} disableRipple label={label} />
      ))}
      {devided && <div className="devided" />}
    </CustomTabs>
  );
};

export default CommonTab;
