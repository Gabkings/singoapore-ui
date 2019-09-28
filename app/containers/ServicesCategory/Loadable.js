/**
 * Asynchronously loads the component for HomePage
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => {
    const result = import('./ServicesCategory');
    return result;
  },
  loading: () => null,
});
