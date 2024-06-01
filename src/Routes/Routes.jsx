import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layouts from './../Pages/Layouts/Layouts';
import Error from './../Pages/Error/Error';
import Home from './../Pages/Home/Home';
import Login from './../Pages/Authentication/Login/Login';
import Registration from '../Pages/Authentication/Registration/Registration';
import DashboardLayout from '../Dashboard/DashboardLayout/DashboardLayout';

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Layouts />,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/registration",
                element: <Registration/>
            }
        ]
    },

    // // DASHBOARD ROUTES
    {
        path:"/dashboard",
        element:<DashboardLayout/>
    }
]);

export default Routes;