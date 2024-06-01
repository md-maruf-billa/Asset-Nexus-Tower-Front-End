import React from 'react';
import Dashboard from '../Dashboard';
import { Outlet } from 'react-router-dom';
import DashboardNav from '../../Common/DahsboardNav/DashboardNav';

const DashboardLayout = () => {
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