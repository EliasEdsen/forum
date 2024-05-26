import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './tests/reportWebVitals';
import store from './redux'
import { Provider } from 'react-redux';

import App from './components/App';

// const dayjs = require('dayjs')
// require('dayjs/locale/ru')
// dayjs.locale('ru')

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },

  enumerable: false
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  // {
  //   path: "comments/:commentId",
  //   element: <Comments />
  // },

  // {
  //   path: "users/:userId",
  //   element: <User />
  // },

  // {
  //   path: "users",
  //   element: <Users />,

  //   children: [
  //     {
  //       path: "users",
  //       element: <User />,
  //     },
  //   ],
  // },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
