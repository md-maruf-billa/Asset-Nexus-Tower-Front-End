import React from 'react';
import useAdminCheck from '../../Utils/Hooks/useAdminCheck';

const CheckHrRoutes = ({children}) => {
    const userRole = useAdminCheck();
    if (userRole == "Employee") {
        return <Navigate to={"/"}></Navigate>
    }
    return children;
};

export default CheckHrRoutes;