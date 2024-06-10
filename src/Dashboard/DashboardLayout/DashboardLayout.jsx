import React from 'react';
import Dashboard from '../Dashboard';
import { Outlet } from 'react-router-dom';
import useCurrentUser from '../../Utils/Hooks/userCurrentUser';
import Loader from '../../Shared/Loader/Loader';
import DashboardNav from '../../Components/DahsboardNav/DashboardNav';

const DashboardLayout = () => {
    const { loading } = useCurrentUser();
    if (loading) return <Loader />
    return (
        <>
            <DashboardNav />
            <div className='flex flex-col md:flex-row md:gap-10'>

                <div className='flex -mt-4'>
                    <Dashboard />
                </div>

                <div className=' w-full md:container mr-10 '>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;