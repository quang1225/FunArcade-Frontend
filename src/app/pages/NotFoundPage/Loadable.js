import lazyload from 'utils/loadable';
import LoadingIndicator from 'app/components/LoadingIndicator';

export default lazyload(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
