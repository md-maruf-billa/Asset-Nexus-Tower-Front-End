import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layouts from './../Pages/Layouts/Layouts';
import Error from './../Pages/Error/Error';
import Home from './../Pages/Home/Home';
import Login from './../Pages/Authentication/Login/Login';
import Registration from '../Pages/Authentication/Registration/Registration';
import DashboardLayout from '../Dashboard/DashboardLayout/DashboardLayout';
import HrHome from '../Dashboard/Hr-Manager/HrHome/HrHome';
import CheckAdminRoutes from '../Secure/CheckHrRutes/CheckHrRoutes';
import EmployeeHome from '../Dashboard/Employee/EmployeeHome/EmployeeHome';
import CheckEmployeeRoutes from '../Secure/CheckEmployeeRoutes/CheckEmployeeRoutes';
import CheckHrRoutes from '../Secure/CheckHrRutes/CheckHrRoutes';
import PaymentPage from '../Components/PaymentPage/PaymentPage';
import CheckValidUser from '../Secure/CheckValidUser/CheckValidUser';
import AddAsset from './../Dashboard/Hr-Manager/AddAsset/AddAsset';
import AssetList from '../Dashboard/Hr-Manager/AssetList/AssetList';

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
            },
            {
                path:"/payment-confirm",
                element:<CheckValidUser><PaymentPage/></CheckValidUser>
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
                element:<CheckHrRoutes><HrHome/></CheckHrRoutes>
            },
            {
                path:"add-asset",
                element:<CheckHrRoutes><AddAsset/></CheckHrRoutes>
            },
            {
                path:"asset-list",
                element:<CheckHrRoutes><AssetList/></CheckHrRoutes>
            }
            
            ,
            



            // FOR EMPLOYEE

            {
                path:"/dashboard/employee-home",
                element:<CheckEmployeeRoutes><EmployeeHome/></CheckEmployeeRoutes>
            }
        ]
    }
]);

export default Routes;