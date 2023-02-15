import { RouteObject } from 'react-router-dom';
import { App } from 'App';
import { Home, Login, NotFound, About, Charts } from 'pages';

export const routes: RouteObject = {
  element: <App />,
  hasErrorBoundary: true,
  children: [
    { path: '/', element: <Home /> },
    { path: '/home', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/about', element: <About />},
    { path: '/charts', element: <Charts />},
    { path: '*', element: <NotFound /> }
  ]
};
