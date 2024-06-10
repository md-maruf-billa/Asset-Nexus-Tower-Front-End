import React from 'react';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { VscTypeHierarchySuper } from "react-icons/vsc";

const MyTeamMember = () => {
    const { currentUser } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const { data, isLoading } = useQuery({
        queryKey: ["load my team"],
        queryFn: async () => {
            const result = await axiosSecure(`/loaded-my-team/${currentUser?.email}`);
            return result.data;
        }
    })

    if (isLoading) return <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2 text-pink-600"></span>

    console.log(data)
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-2 mt-4' >
                {
                    data.map(employee =>

                        <div class="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                            <img class="object-cover object-center w-full h-56" src={employee.employeeProfileImage} alt="avatar" />

                            <div class="flex items-center px-6 py-3 bg-gray-600">
                               <VscTypeHierarchySuper className='text-white'/>

                                <h1 class="mx-3 text-lg font-semibold text-white">Employee</h1>
                            </div>

                            <div class="px-6 py-4">
                                <h1 class="text-xl font-semibold text-gray-800 dark:text-white">{employee.employeeName}</h1>

                                

                               

                                <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                                    <svg aria-label="email icon" class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z" />
                                    </svg>

                                    <h1 class="px-2 text-sm">{employee.employeeEmail}</h1>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyTeamMember;