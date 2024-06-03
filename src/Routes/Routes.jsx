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
import AddAsset from '../Dashboard/Hr-Manager/AddAsset/AddAsset';
import CheckAdminRoutes from '../Secure/CheckAdminRutes/CheckAdminRoutes';
import EmployeeHome from '../Dashboard/Employee/EmployeeHome/EmployeeHome';
import CheckEmployeeRoutes from '../Secure/CheckEmployeeRoutes/CheckEmployeeRoutes';

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

            // FOR HR
            {
                path:"/dashboard",
                element:<CheckAdminRoutes><HrHome/></CheckAdminRoutes>
            },
            {
                path:"add-asset",
                element:<CheckAdminRoutes><AddAsset/></CheckAdminRoutes>
            },



            // FOR EMPLOYEE

            {
                path:"/dashboard/employee-home",
                element:<CheckEmployeeRoutes><EmployeeHome/></CheckEmployeeRoutes>
            }
        ]
    }
]);

export default Routes;