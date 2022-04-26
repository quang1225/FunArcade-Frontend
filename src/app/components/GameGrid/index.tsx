import { GameProps } from 'app/appTypes';
import styled from 'styled-components';
import CommonLink from '../common/CommonLink';

interface Props {
  gameList: GameProps[];
}

const GameList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 160px);
  gap: 16px;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;

  img {
    border-radius: 24px;
    box-shadow: 0px 10px 30px rgba(38, 62, 147, 0.3);
    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 158px);
    gap: 24px;
  }
`;

const GameGrid = (props: Props) => (
  <GameList>
    {props.gameList
      .filter(x => !x.isTest)
      .map(item => (
        <CommonLink key={item.url} to={item.url}>
          <img
            width={160}
            height={200}
            className="global_transition"
            src={item.cardImage}
            alt={item.name}
          />
        </CommonLink>
      ))}
  </GameList>
);

export default GameGrid;
