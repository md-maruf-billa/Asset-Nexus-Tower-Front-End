import React from 'react';
import useAxiosSecure from '../../Utils/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useCurrentUser from '../../Utils/Hooks/userCurrentUser';


const DashboardNav = () => {
    const { currentUser } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const { data, isLoading } = useQuery({
        queryKey: ["my data"],
        queryFn: async () => {
            const result = await axiosSecure.get(`/my-details/${currentUser?.email}`);
            return result.data
        }
    })
    if (isLoading) return;

    return (

        <div className="navbar bg-[#cd5bcd] md:px-10">
            <div className="flex-1">
                <div className='flex items-center gap-2'>
                    <img className='size-10 rounded-full' src={data?.companyLogo} alt="" />
                    <h3 className='text-xl md:text-3xl font-rancho text-[#382828]'>{data?.companyName}</h3>
                </div>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-32 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={data?.employeeProfileImage} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><a>{data?.employeeName}</a></li>
                        <li><a>{data?.employeeEmail}</a></li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default DashboardNav;