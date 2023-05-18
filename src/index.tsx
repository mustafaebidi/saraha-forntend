import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import Home from './page/Home';
import Login from './page/Login';
import Registration from './page/Registration';
import ForgetPassword from './page/forgetPassword';

import { Provider } from 'react-redux'



import {store} from "./store/index"
import Public from './components/routes/public';
import About from './page/about';
import Massage from './page/massage';
import SendMassage from './page/SendMassage';
import Prefetch from './components/routes/prefetch';
import Private from './components/routes/private';
import UserSetting from './page/UserSettings';
import ChangePassword from './page/ChangePassword';
import AfterDisply from './components/wrapper/AfterDisply';


import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools()



const router = createBrowserRouter([
  {
    path: "/",
    element: <AfterDisply><App/></AfterDisply>,
    children:[

      {
        index: true,
        element: <Home />
        
      },

      {
        path: "/about",
        element: <About />
        
      },

      {
        element: <Public />,
        children:[
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/registration",
            element: <Registration />,
          },
          {
            path: "/forget-password",
            element: <ForgetPassword />,
          },

          {
            path: "/forgetPassword/:id/:token",
            element: <ChangePassword />,
          },

        ]
      },
      {
        element:<SendMassage/>,
        path:"sendMassage/:id",

      },
      {
        element:<Private/>,
        children:[
          {
            element:<Prefetch/>,
            children:[
              {
                element:<Massage/>,
                path:"massage"
              },
              {
                element:<UserSetting/>,
                path:"manage"
              },

            ]
          },
        ]
      },


    ]
  },

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </StrictMode>

);

