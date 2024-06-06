import React from 'react';
import useCurrentUser from '../../Utils/Hooks/userCurrentUser';
import { Navigate } from 'react-router-dom';

const CheckValidUser = ({children}) => {
    const {currentUser} = useCurrentUser();
    if(!currentUser.email) return <Navigate to="/login"/>
    else{
        return children;
    }
    
};

export default CheckValidUser;