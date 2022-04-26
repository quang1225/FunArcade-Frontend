import styled from 'styled-components';
import Container from '@mui/material/Container';
import CommonTab from '../CommonTab';

interface Props {
  title: any;
  listTab?: string[];
  tab?: number;
  setTab?: any;
}

const HeaderWrap = styled.div`
  display: flex;
  height: 112px;
  background-color: var(--global--background-color-2);
  box-shadow: 0px 4px 20px rgb(0 0 0 / 25%);
  position: relative;
  flex-direction: column;
  color: white;
`;

const UserHeader = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 28px;
  }
`;

const CommonPageHeader = (props: Props) => (
  <HeaderWrap>
    <Container>
      <UserHeader>
        <div className="title">{props.title}</div>
        <CommonTab
          name="page-header"
          listTab={props.listTab || []}
          currentTab={props.tab}
          setTab={props.setTab}
          tabMargin={48}
        />
      </UserHeader>
    </Container>
  </HeaderWrap>
);

export default CommonPageHeader;
