import React from 'react';
import AccetsBarChart from '../../DashboardShared/AssetsBarChart/AccetsBarChart';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';

const HrHome = () => {
    const {currentUser} = useCurrentUser();
    return (
        <div>
            <div className='flex items-center gap-2 mb-8'>
                <h3 className='text-3xl font-bold'>Good Day</h3>
                <h3 className='font-bold text-3xl text-yellow-600'>{currentUser.displayName}</h3>
            </div>
            <div>

            </div>
            <AccetsBarChart />
        </div>
    );
};

export default HrHome;