import { BrowserRouter } from 'react-router-dom';

import RoutesList from './RoutesList';

const RoutesConfig = () => {
  return (
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
};

export default RoutesConfig;
