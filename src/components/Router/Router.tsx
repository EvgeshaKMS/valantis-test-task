import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { routes } from 'configs/routesConfig';

import LoaderPage from 'pages/LoaderPage/LoaderPage';

const Router = () => {
  const routing = useRoutes(routes);

  return <Suspense fallback={<LoaderPage />}>{routing}</Suspense>;
};

export default Router;
