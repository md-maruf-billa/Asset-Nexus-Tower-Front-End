import React from 'react';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';
import Lottie from 'lottie-react';
import noDataFound from '../../../assets/Animation/NoDataFound.json'
import { BsDot } from "react-icons/bs";
import Swal from 'sweetalert2';
const EmployeeRequestList = () => {
    const { currentUser } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const { data, isLoading,refetch } = useQuery({
        queryKey: ["load all request"],
        queryFn: async () => {
            const result = await axiosSecure(`/employee-request/${currentUser?.email}`);
            return result.data;
        }
    })

    // HANDEL REJECT-
    const handelReject = (id, name) => {
        const statusInfo = { status: "Reject" }
        axiosSecure.patch(`/update-employee-status/${id}`, statusInfo)
            .then(data => {
                if (data?.data?. modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${"Rejected " + name}`,
                        text: `${"This Employee request successfully rejected."}`,
                        showConfirmButton: false,
                        timer: 3000
                    });
                    refetch();
                }
            })
    }
    const handelAccept = (id, name) => {
        const statusInfo = { status: "Accepted" }
        axiosSecure.patch(`/update-employee-status/${id}`, statusInfo)
            .then(data => {
                if (data?.data?. modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${"Congratulation" + name}`,
                        text: `${"This Employee are successfully add your team."}`,
                        showConfirmButton: false,
                        timer: 3000
                    });
                    refetch();
                }
            })
    }

    if (isLoading) return <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2"></span>
    if (data.length == 0) return <div className='flex justify-center items-center w-full'><Lottie className='w-1/2' animationData={noDataFound} /></div>;

    return (
        <div>
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
                                        <button onClick={() => { handelAccept(employee._id, employee.employeeName) }} className='btn btn-sm  bg-green-300'>Accept</button>
                                        <button onClick={() => { handelReject(employee._id, employee.employeeName) }} className='btn btn-sm bg-red-400'>Reject</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeRequestList;