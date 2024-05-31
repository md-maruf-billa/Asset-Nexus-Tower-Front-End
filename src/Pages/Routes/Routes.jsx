import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import Layouts from '../Layouts/Layouts';
import Error from '../Error/Error';
import Login from '../Authentication/Login/Login';

const Routes = createBrowserRouter([
    {
        path:"/",
        element:<Layouts/>,
        errorElement:<Error/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/login",
                element:<Login/>
            }
        ]
    }
]);

export default Routes;