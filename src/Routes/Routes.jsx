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
import AllCompanyJobs from '../Pages/AllCompanyJobs/AllCompanyJobs';
import EmployeeRequestList from '../Dashboard/Hr-Manager/EmployeeRequestList/EmployeeRequestList';
import EmployeeAssetList from '../Dashboard/Employee/EmployeeAssestList/EmployeeAssetList';
import EmployeeAssetRequest from '../Dashboard/Employee/EmployeeAssetRequest/EmployeeAssetRequest';
import TotalEmployeeList from '../Dashboard/Hr-Manager/TotalEmployeeList/TotalEmployeeList';
import AddAnEmployee from '../Dashboard/Hr-Manager/AddAnEmployee/AddAnEmployee';
import AllRequestAssets from '../Dashboard/Hr-Manager/AllRequestAssets/AllRequestAssets';
import UpdateProfile from '../Components/Update/UpdateProfile/UpdateProfile';

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Layouts />,
        errorElement: <Error />,
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
                element: <Registration />
            },
            {
                path: "/payment-confirm",
                element: <CheckValidUser><PaymentPage /></CheckValidUser>
            },
            {
                path: "/all-companies",
                element: <AllCompanyJobs />
            }
        ]
    },

    // // DASHBOARD ROUTES
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [

            // FOR HR
            {
                path: "/dashboard",
                element: <CheckHrRoutes><HrHome /></CheckHrRoutes>
            },
            {
                path: "add-asset",
                element: <CheckHrRoutes><AddAsset /></CheckHrRoutes>
            },
            {
                path: "asset-list",
                element: <CheckHrRoutes><AssetList /></CheckHrRoutes>
            },
            {
                path: "employee-request-list",
                element: <CheckHrRoutes><EmployeeRequestList /></CheckHrRoutes>
            },
            {
                path: "total-employee-list",
                element: <CheckHrRoutes><TotalEmployeeList /></CheckHrRoutes>
            },
            {
                path: "add-employee",
                element: <CheckHrRoutes><AddAnEmployee /></CheckHrRoutes>
            },
            {
                path: "all-asset-request-list",
                element: <CheckHrRoutes><AllRequestAssets /></CheckHrRoutes>
            }
            ,
            {
                path: "update-user-profile",
                element: <CheckValidUser><UpdateProfile /></CheckValidUser>
            }
            ,




            // FOR EMPLOYEE

            {
                path: "/dashboard/employee-home",
                element: <CheckEmployeeRoutes><EmployeeHome /></CheckEmployeeRoutes>
            },
            {
                path: "employee-asset-list",
                element: <CheckEmployeeRoutes><EmployeeAssetList /></CheckEmployeeRoutes>
            },
            {
                path: "employee-asset-request",
                element: <CheckEmployeeRoutes><EmployeeAssetRequest /></CheckEmployeeRoutes>
            }
        ]
    }
]);

export default Routes;