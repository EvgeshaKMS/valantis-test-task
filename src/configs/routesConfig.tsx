import { lazy } from 'react';
import { routingLinks } from './routingLinks';

const List = lazy(() => import('pages/List/List'));

export const routes = [
  {
    path: routingLinks.home,
    element: <List />,
  },
];
