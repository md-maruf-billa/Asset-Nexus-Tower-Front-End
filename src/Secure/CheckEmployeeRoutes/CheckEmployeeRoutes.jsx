import React from 'react';
import useAdminCheck from '../../Utils/Hooks/useAdminCheck';
import { Navigate } from 'react-router-dom';

const CheckEmployeeRoutes = ({children}) => {
    const userRole = useAdminCheck();
    if(userRole == "Employee"){
        return children
    }
    return <Navigate to={"/"}/>;
};

export default CheckEmployeeRoutes;