import { useQuery } from 'app/hooks/useQuery';
import { Helmet } from 'react-helmet-async';
import DesktopChatBox from 'app/components/DesktopChatBox';

const ChatPage = () => {
  const query = useQuery();
  const gameSlug = query.get('game') || '';
  const title = `${gameSlug} Chat Box`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <DesktopChatBox gameSlug={gameSlug} />
    </>
  );
};

export default ChatPage;
