import React from 'react';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';
import Lottie from 'lottie-react';
import noDataFound from '../../../assets/Animation/NoDataFound.json'
import { BsDot } from "react-icons/bs";
import Swal from 'sweetalert2';
import useUserInformation from '../../../Utils/Hooks/useUserInformation';
import { Link } from 'react-router-dom';
import PageTitle from '../../../Shared/PageTitle/PageTitle';
const EmployeeRequestList = () => {
    const { currentUser } = useCurrentUser();
    const userInformation = useUserInformation();
    const axiosSecure = useAxiosSecure();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["load all request"],
        queryFn: async () => {
            const result = await axiosSecure(`/employee-request/${currentUser?.email}`);
            return result.data;
        }
    })
    const { data:employee ,refetch:reload} = useQuery({
        queryKey: ["loaded Employee by hr email"],
        queryFn: async () => {
            const result = await axiosSecure(`/current-hr-employee/${currentUser.email}`)
            return result.data;
        }
    })
    // HANDEL REJECT-
    const handelReject = (id, name) => {
        const statusInfo = { status: "Reject" }
        axiosSecure.patch(`/update-employee-status/${id}`, statusInfo)
            .then(data => {
                if (data?.data?.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${"Rejected " + name}`,
                        text: `${"This Employee request successfully rejected."}`,
                        showConfirmButton: false,
                        timer: 3000
                    });
                    refetch();
                    reload();
                }
            })
    }
    const handelAccept = (id, name) => {
        const statusInfo = { status: "Accepted" }
        axiosSecure.patch(`/update-employee-status/${id}`, statusInfo)
            .then(data => {
                if (data?.data?.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${"Congratulation" + name}`,
                        text: `${"This Employee are successfully add your team."}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    reload();
                }
            })
    }
    const condition = userInformation?.packageInfo?.totalTeams == employee?.length;
    if (isLoading) return <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2"></span>
    if (data.length == 0) return <div className='flex justify-center items-center w-full'><Lottie className='w-1/2' animationData={noDataFound} /></div>;

    return (
        <div>
            <PageTitle title={"employee-request"}/>
            <div className='flex justify-between'>
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Total Requests</h2>

                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{data?.length} </span>
                </div>
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Total Employee Limit</h2>

                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{userInformation?.packageInfo?.totalTeams} </span>
                </div>
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Already in Team</h2>

                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{employee?.length} </span>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Employee Photo</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((employee, idx) =>
                                <tr key={employee._id}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={employee.employeeProfileImage} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{employee.employeeName}</td>
                                    <td>{employee.employeeEmail}</td>
                                    <td ><span className='bg-purple-200 p-2 rounded-md flex justify-center w-fit items-center'><BsDot className='text-xl' /> {employee.status}</span></td>
                                    <td className='space-x-4'>
                                        <button 
                                        disabled={condition}
                                        onClick={() => { handelAccept(employee._id, employee.employeeName) }} className='btn btn-sm  bg-green-300'>Accept</button>
                                        <button onClick={() => { handelReject(employee._id, employee.employeeName) }} className='btn btn-sm bg-red-400'>Reject</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                {
                    condition && <p className='text-red-600 absolute bottom-8 left-1/2'>Your maximum employee limit is over. <Link className='text-blue-400' to="/payment-confirm">Upgrade Now</Link></p>
                }
            </div>
        </div>
    );
};

export default EmployeeRequestList;