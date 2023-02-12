import { RouteObject } from 'react-router-dom';
import { App } from '../App';
import { Home, Login, NotFound } from '../pages';

export const routes: RouteObject = {
  element: <App />,
  hasErrorBoundary: true,
  children: [
    { path: '/', element: <Home /> },
    { path: '/home', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '*', element: <NotFound /> }
  ]
};
