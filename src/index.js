import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './tests/reportWebVitals';

import App      from './components/App';
import Comments from './components/Comments';
import User     from './components/User';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "comments/:commentId",
    element: <Comments />
  },

  {
    path: "users/:userId",
    element: <User />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
