import lazyload from 'utils/loadable';
import { HEADER_HEIGHT } from 'utils/constants';

export default lazyload(() => import('./index'), {
  fallback: (
    <div
      style={{
        height: HEADER_HEIGHT,
        backgroundColor: 'var(--global--background-color)',
      }}
    />
  ),
});
