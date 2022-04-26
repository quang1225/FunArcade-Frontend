import { useTranslation } from 'react-i18next';
import { messages } from './messages';

const CallbackRoute = () => {
  const { t } = useTranslation();

  return (
    <div style={{ color: 'black', padding: 16, fontSize: 18, fontWeight: 500 }}>
      {t(...messages.redirecting())}...
    </div>
  );
};

export default CallbackRoute;
