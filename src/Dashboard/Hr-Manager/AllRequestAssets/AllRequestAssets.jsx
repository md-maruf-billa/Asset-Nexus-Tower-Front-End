import React, { useEffect, useState } from 'react';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import noData from '../../../assets/Animation/NoDataFound.json';
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import Swal from 'sweetalert2';
import PageTitle from '../../../Shared/PageTitle/PageTitle';


const AllRequestAssets = () => {
    const { currentUser } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const [requestLength, setRequestLength] = useState([]);
    const dataParePage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const pages = [];
    const totalPage = Math.ceil(requestLength.length / dataParePage);
    for (let i = 1; i < totalPage + 1; i++) {
        pages.push(i)
    }
    const { data, isLoading, refetch } = useQuery({
        queryKye: ["load all request list"],
        queryFn: async () => {
            const result = await axiosSecure(`/load-all-requested/${currentUser.email}?page=${currentPage - 1}&size=${dataParePage}`);
            return result.data;
        }
    })
    useEffect(()=>{refetch()},[currentPage])
    // LOAD REQUEST LENGTH
    useEffect(() => {
        axiosSecure(`/load-all-requested-length/${currentUser.email}`)
            .then(res => setRequestLength(res.data))
    }, [])
    // update current status
    const updateStatus = (id, status) => {
        const time = new Date().toLocaleDateString();
        axiosSecure.patch(`/update-request-status/${id}`, { status: status, acceptedDate: time })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successful",
                        text: "You accepted this asset request.",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    refetch();
                }
            })
    }

    if (isLoading) return refetch;
    if (data.length === 0) return <div className='flex justify-center items-center h-[90vh]'>
        <Lottie className='w-1/2' animationData={noData}></Lottie>
    </div>


    return (
        <div>
            <PageTitle title={"all-requests"} />
            <section className="container px-4 mx-auto mt-5">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Total Request</h2>

                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{requestLength?.length}</span>
                </div>

                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <span>Assets Name</span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Status</span>

                                                    <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                        <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                        <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                                    </svg>
                                                </button>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Assets Type</span>

                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" stroke:inejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                    </svg>
                                                </button>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Requester  Email</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Requester  Name</th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Requested for</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Requested Quantity</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Accept</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Reject</th>


                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {
                                            data.map(assets =>

                                                <tr>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">

                                                            <div className="flex items-center gap-x-2">
                                                                <img className="object-cover w-10 h-10 rounded-full" src={assets.assetImage} alt="" />
                                                                <div>
                                                                    <h2 className="font-medium  text-gray-800 dark:text-white ">{assets.productName}</h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                                            <h2 className={`text-sm font-normal  ${assets.status == "Pending" ? "text-yellow-700" : assets.status == "Rejected" ? "text-red-700" : "text-emerald-500"}`}>{assets.status}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{assets.productType}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{assets.employeeEmail}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{assets.employeeName}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{assets.requestedDate.startDate} To {assets.requestedDate.endDate}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{assets.requestQuantity}</td>

                                                    <td >
                                                        <button
                                                            onClick={() => updateStatus(assets._id, "Accepted")}
                                                            disabled={assets.status == "Accepted"} className='btn btn-sm bg-green-300'><IoCheckmarkCircleOutline /> Accept</button>

                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => updateStatus(assets._id, "Rejected")}
                                                            disabled={assets.status == "Accepted" || assets.status == "Rejected"} className='btn btn-sm bg-red-300'> <MdCancel /> Reject</button>
                                                    </td>
                                                </tr>


                                            )

                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center mt-6">


                    <div className="join">
                        {
                            pages.map(page =>

                                <input
                                    onChange={(e) => {setCurrentPage(e.target.value)}}
                                    className="join-item btn btn-square"
                                    type="radio"
                                    name="options"
                                    value={page}
                                    aria-label={page}
                                    checked={currentPage == page} />

                            )
                        }
                    </div>


                </div>
            </section>
        </div>
    );
};

export default AllRequestAssets;