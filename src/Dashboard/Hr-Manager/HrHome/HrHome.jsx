import React from 'react';
import AccetsBarChart from '../../DashboardShared/AssetsBarChart/AccetsBarChart';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';
import useUserInformation from '../../../Utils/Hooks/useUserInformation';
import { RxCrossCircled } from "react-icons/rx";
import { Link } from 'react-router-dom';
import LinearChart from '../../../Components/StaticChart/LinearChart/LinearChart';
import PageTitle from '../../../Shared/PageTitle/PageTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import PieCharts from './../../../Components/StaticChart/PieChart/PieCharts';

const HrHome = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useCurrentUser();
    const userInformation = useUserInformation();

    // LOAD ALL REQUEST
    const { data } = useQuery({
        queryKey: ["loaded all request"],
        queryFn: async () => {
            const result = await axiosSecure(`/load-all-requested-length/${currentUser?.email}`);
            return result.data;
        }

    })
    const pendingRequest = data?.filter(req => req.status == "Pending")





    if (!userInformation) return <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2 text-pink-500"></span>


    return (
        <>
            <PageTitle title={"HR Dashboard"} />
            {
                userInformation?.packageInfo ?
                    <div className='px-4 mt-8'>
                        <div className='md:flex items-center gap-2 mb-8'>
                            <h3 className='text-xl md:text-3xl font-bold'>Good Day</h3>
                            <h3 className='font-bold text-xl md:text-3xl text-yellow-600'>{currentUser.displayName}</h3>
                        </div>

                        <div className='flex flex-col md:flex-row  justify-between items-center'>

                            <div
                                className='p-6 border space-y-2 bg-[#a42ef7] text-[#e7e4e4] rounded-2xl h-fit'>
                                <h3 className='text-3xl font-bold text-white'>Employee Request Status</h3>
                                <span className='flex gap-2'>
                                    <h2>Total Request:</h2>
                                    <h2 className='font-bold text-white'>{data?.length}</h2>

                                </span>
                                <span className='flex gap-2'>
                                    <h2>Pending Request:</h2>
                                    <h2 className='font-bold text-white'>{pendingRequest?.length}</h2>
                                </span>
                            </div>


                            <PieCharts />

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
                        <div className='w-full'>
                            {/* <LinearChart /> */}
                            <AccetsBarChart />


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