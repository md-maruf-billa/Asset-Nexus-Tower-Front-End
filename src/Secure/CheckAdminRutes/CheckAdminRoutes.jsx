import React from 'react';
import useAdminCheck from '../../Utils/Hooks/useAdminCheck';
import { Navigate } from 'react-router-dom';

const CheckAdminRoutes = ({ children }) => {
    const userRole = useAdminCheck();
    if (userRole == "Employee") {
        return <Navigate to={"/"}></Navigate>
    }
    return children;
};

export default CheckAdminRoutes;