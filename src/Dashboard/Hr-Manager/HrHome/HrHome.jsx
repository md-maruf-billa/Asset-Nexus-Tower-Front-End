import React from 'react';
import AccetsBarChart from '../../DashboardShared/AssetsBarChart/AccetsBarChart';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';
import useUserInformation from '../../../Utils/Hooks/useUserInformation';
import { RxCrossCircled } from "react-icons/rx";
import { Link } from 'react-router-dom';

const HrHome = () => {
    const { currentUser } = useCurrentUser();
    const userInformation = useUserInformation();
    if (!userInformation) return <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2 text-pink-500"></span>


    return (
        <>
            {
                userInformation?.packageInfo ? <div className='px-4'>
                    <div className='md:flex items-center gap-2 mb-8'>
                        <h3 className='text-xl md:text-3xl font-bold'>Good Day</h3>
                        <h3 className='font-bold text-xl md:text-3xl text-yellow-600'>{currentUser.displayName}</h3>
                    </div>
                    <div className='flex flex-col md:flex-row '>
                        <AccetsBarChart />
                        <div
                            className='p-6 border space-y-2 bg-[#a42ef7] text-[#e7e4e4] rounded-2xl h-fit'>
                            <h3 className='text-3xl font-bold text-white'>Package Details</h3>
                            <span className='flex gap-2'>
                                <h2>Package Name:</h2>
                                <h2 className='font-bold text-white'>{userInformation?.packageInfo?.subscriptionType}</h2>

                            </span>
                            <span className='flex gap-2'>
                                <h2>Max Employee:</h2>
                                <h2 className='font-bold text-white'>{userInformation?.packageInfo?.totalTeams}</h2>
                            </span>
                        </div>
                    </div>
                </div> :
                    <div className='flex flex-col items-center justify-center h-full gap-8'>
                        <h3 className='flex text-5xl items-center gap-5 text-red-600 font-bold'><RxCrossCircled /> Opps !!</h3>
                        <p>You Currently use free account. To get all features <Link to={"/payment-confirm"} className='text-blue-600 underline'>SubsCribe</Link> Now</p>
                    </div>
            }
        </>
    );
};

export default HrHome;