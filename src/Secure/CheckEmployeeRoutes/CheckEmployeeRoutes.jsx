import React from 'react';
import useAdminCheck from '../../Utils/Hooks/useAdminCheck';
import { Navigate } from 'react-router-dom';

const CheckEmployeeRoutes = ({children}) => {
    const userRole = useAdminCheck();

    if(!userRole) return <span className="loading loading-bars loading-lg top-1/2 left-1/2 text-pink-600"></span>;
    if(userRole == "Employee"){
        return children
    }
    // return <Navigate to={"/"}/>;
};

export default CheckEmployeeRoutes;