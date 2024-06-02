import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layouts from './../Pages/Layouts/Layouts';
import Error from './../Pages/Error/Error';
import Home from './../Pages/Home/Home';
import Login from './../Pages/Authentication/Login/Login';
import Registration from '../Pages/Authentication/Registration/Registration';
import DashboardLayout from '../Dashboard/DashboardLayout/DashboardLayout';
import AdminHome from '../Dashboard/Admin/AdminHome/AdminHome';
import HrHome from '../Dashboard/Hr-Manager/HrHome/HrHome';

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
        element:<DashboardLayout/>,
        children:[
            {
                path:"/dashboard",
                element:<HrHome/>
            }
        ]
    }
]);

export default Routes;