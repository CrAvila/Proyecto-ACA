import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './routing';
import { RouterProvider } from 'react-router-dom';
import { store } from './state';
import { Provider } from 'react-redux';
import * as THREE from 'three'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
