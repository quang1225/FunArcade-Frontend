import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { GAME_LIST } from 'utils/gameConfig';
import { GameProps } from 'app/appTypes';

const GamePlayerWrap = styled.div`
  overflow: hidden;
  border-radius: 8px;
`;

const GamePage = memo(() => {
  const { gameSlug } = useParams<any>();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameProps>();

  useEffect(() => {
    if (gameSlug) {
      const rs: any = GAME_LIST.find(x => x.slug === gameSlug);
      if (rs) {
        setGame(rs);
      } else {
        navigate('/');
      }
    }
  }, [gameSlug]);

  return <GamePlayerWrap>{game && <game.component />}</GamePlayerWrap>;
});

export default GamePage;
