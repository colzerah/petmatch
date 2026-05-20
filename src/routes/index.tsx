import React from 'react';

import { TabRoutes as AuthRoutes } from './AuthRoutes/tab.routes';
import { AppRoutes } from './AppRoutes/app.route';

const Routes: React.FC = () => {
  const loggedin = true;
  return !loggedin ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
