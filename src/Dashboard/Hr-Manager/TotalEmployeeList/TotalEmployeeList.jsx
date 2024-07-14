import React from 'react';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';
import { useQuery } from '@tanstack/react-query';
import useUserInformation from '../../../Utils/Hooks/useUserInformation';
import Swal from 'sweetalert2';
import { FaUsers } from 'react-icons/fa6';
import PageTitle from '../../../Shared/PageTitle/PageTitle';

const TotalEmployeeList = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useCurrentUser();
    const userInformation = useUserInformation();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["loaded Employee by hr email"],
        queryFn: async () => {
            const result = await axiosSecure(`/current-hr-employee/${currentUser.email}`)
            return result.data;
        }
    })

    // HANDEL DELETE A USER
    const handelRemoveEmployee = (email,name) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Employee !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/current-hr-employee/${email}`)
                    .then(res => {
                        if (res.data.deletedCount > 1) {
                            Swal.fire({
                                title: "Deleted!",
                                text: `${name} + "is remove from your team."`,
                                icon: "success"
                            });
                        }
                        refetch();
                    })

            }
        });

    }




    if (isLoading) return <span className="loading absolute top-1/2 left-1/2 loading-bars loading-lg"></span>
    return (
        <div className='mt-4'>
            <PageTitle title={"my-employees"}/>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <h3 className='text-sm md:text-2xl font-semibold'>Total Employee Limit : </h3>
                    <span className='text-sm md:text-2xl px-4 py-1 bg-[#dbeafe] rounded-2xl'>{userInformation?.packageInfo?.totalTeams}</span>
                </div>
                <div className='flex items-center gap-3'>
                    <h3 className='text-sm md:text-2xl font-semibold'>Current Employee : </h3>
                    <span className='text-sm md:text-2xl px-4 py-1 bg-[#dbeafe] rounded-2xl'>{data?.length}</span>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10'>
                {
                    data?.map(employee =>
                        <div className=" overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                            <img className="object-cover w-full h-56" src={employee.employeeProfileImage} alt="avatar" />

                            <div className="p-5 flex items-center justify-between">
                                <span>
                                    <h3 className="block text-xl font-bold text-gray-800 dark:text-white" tabindex="0" role="link">{employee.employeeName}</h3>
                                    <span className="text-sm text-gray-700 dark:text-gray-200">{employee.employeeEmail}</span>
                                    <p className='text-sm flex  items-center gap-2'>
                                        <FaUsers/>
                                        Type : Employee
                                    </p>
                                </span>
                                <button 
                                onClick={()=>handelRemoveEmployee(employee.employeeEmail,employee.employeeName)}
                                className='btn btn-sm bg-[#af2b745c] hover:bg-[#af2b74dc] hover:text-white'>
                                    Remove
                                </button>
                            </div>
                        </div>

                    )
                }
            </div>
        </div>
    );
};

export default TotalEmployeeList;