import React, { useState } from 'react';
import useAxiosSecure from '../../Utils/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useCurrentUser from '../../Utils/Hooks/userCurrentUser';
import noMatch from '../../assets/Animation/noMach.gif'
import { RxCrossCircled } from "react-icons/rx";
import SendRequestForAsset from '../Modal/SendRequestForAsset/SendRequestForAsset';
import useUserInformation from './../../Utils/Hooks/useUserInformation';

const DashboardNav = () => {
    const { currentUser } = useCurrentUser();
    const userInformation = useUserInformation();
    const axiosSecure = useAxiosSecure();
    const [onFocus, setOnFocus] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [assetId , setAssetId] = useState("");
    const { data, isLoading } = useQuery({
        queryKey: ["my data"],
        queryFn: async () => {
            const result = await axiosSecure.get(`/my-details/${currentUser?.email}`);
            return result.data
        }
    })
    if (isLoading) return;
    const search = (e) => {
        axiosSecure.get(`/search-data/${e.target.value}?email=${data?.hrEmail || currentUser.email}`)
            .then(res => setSearchResult(res.data))
    }




    return (

        <div className="navbar bg-[#cd5bcd] md:px-10 relative">
            <div className="flex-1">
                <div className='flex items-center gap-2'>
                    <img className='size-10 rounded-full' src={data?.companyLogo || userInformation?.companyProfileImage} alt="" />
                    <h3 className='text-xl md:text-3xl font-rancho text-[#382828]'>{data?.companyName || userInformation?.companyName}</h3>
                </div>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input
                        onChange={search}
                        onFocus={() => setOnFocus(true)}

                        type="text" placeholder="🔍 Search" className="input input-bordered w-32 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={data?.employeeProfileImage || userInformation?.profileImage} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><a>{data?.employeeName}</a></li>
                        <li><a>{data?.employeeEmail}</a></li>
                    </ul>
                </div>
            </div>


            {onFocus &&
                <div className="w-full md:w-3/4 lg:w-1/2 min-h-56 border bg-white shadow-2xl absolute left-1/2 -translate-x-1/2 top-16 z-[500]">
                    <div className='w-full'>
                        <span className='flex justify-end'>
                            <RxCrossCircled 
                            onClick={()=>setOnFocus(false)}
                            className='text-3xl cursor-pointer hover:text-red-600' />
                        </span>
                        {
                            searchResult?.length === 0 ?
                                <div className='flex justify-center items-center w-full'>
                                    <img className='w-1/2' src={noMatch} alt="" />
                                </div>
                                :

                                <>
                                    {
                                        searchResult?.map(asset =>

                                            <section class="container px-4 mx-auto max-w-3xl mb-4">

                                                <div class="flex flex-col mt-6">
                                                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                            <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                                                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                                    <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                                        <tr>
                                                                            <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                <div class="inline-flex items-center gap-x-3">

                                                                                    <div class="flex items-center gap-x-2">
                                                                                        <img class="object-cover w-10 h-10 rounded-full" src={asset.assetImage} alt="" />
                                                                                        <div>
                                                                                            <h2 class="font-medium text-gray-800 dark:text-white ">{asset.productName}</h2>
                                                                                            <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{asset.hrEmail}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                                                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                                                                    <h2 class="text-sm font-normal text-emerald-500">{asset.productType}</h2>
                                                                                </div>
                                                                            </td>
                                                                            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{asset.productQuantity > 0 ? "In Stock" : "Out Of Stock"}</td>

                                                                            <td class="px-4 py-4 text-sm whitespace-nowrap">
                                                                                <div class="flex items-center gap-x-6">
                                                                                    <button
                                                                                        onClick={() => {setOpenModal(true), setAssetId(asset._id),setOnFocus(false)}}
                                                                                        className='btn btn-xs btn-secondary btn-outline'>Send Request</button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>

                                                                    </tbody>

                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </section>
                                        )
                                    }
                                </>
                        }
                    </div>
                </div>}


                <SendRequestForAsset assetId={assetId} modalOpen={openModal} setModalOpen={setOpenModal} />
        </div>

    );
};

export default DashboardNav;