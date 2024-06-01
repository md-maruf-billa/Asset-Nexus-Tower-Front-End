import React from 'react';
import Dashboard from '../Dashboard';
import { Outlet } from 'react-router-dom';
import DashboardNav from '../../Common/DahsboardNav/DashboardNav';
import useCurrentUser from '../../Utils/Hooks/userCurrentUser';
import Loader from '../../Shared/Loader/Loader';

const DashboardLayout = () => {
    const {loading} = useCurrentUser();
    if(loading) return <Loader/>
    return (
        <> 
            <DashboardNav/>        
            <div className='flex container mx-auto gap-20'>

                <Dashboard />
                <Outlet />
            </div>
        </>
    );
};

export default DashboardLayout;