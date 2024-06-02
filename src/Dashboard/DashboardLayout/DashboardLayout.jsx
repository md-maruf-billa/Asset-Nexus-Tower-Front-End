import React from 'react';
import Dashboard from '../Dashboard';
import { Outlet } from 'react-router-dom';
import useCurrentUser from '../../Utils/Hooks/userCurrentUser';
import Loader from '../../Shared/Loader/Loader';
import DashboardNav from '../../Components/DahsboardNav/DashboardNav';

const DashboardLayout = () => {
    const {loading} = useCurrentUser();
    if(loading) return <Loader/>
    return (
        <> 
            <DashboardNav/>        
            <div className='flex gap-20'>

                <Dashboard />
                <Outlet />
            </div>
        </>
    );
};

export default DashboardLayout;