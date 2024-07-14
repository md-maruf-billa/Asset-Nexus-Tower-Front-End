import React, { useEffect, useState } from 'react';
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import noDataFound from '../../../assets/Animation/NoDataFound.json'
import AssetUpdateModal from '../../DashboardShared/AssetsBarChart/AssetUpdateModal/AssetUpdateModal';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';
import PageTitle from '../../../Shared/PageTitle/PageTitle';


const AssetList = () => {
    const { currentUser } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [assetId, setAssetId] = useState("");
    const [filterData, setFilterData] = useState("");
    const [sortData, setSortData] = useState("");
    const dataParePage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDataLength, setTotalDataLength] = useState([]);
    const totalPage = Math.ceil(totalDataLength.length / dataParePage);
    const pages = [];
    for (let i = 1; i < totalPage + 1; i++) {
        pages.push(i)
    }


    // LOAD ALL ASSET
    const { data: allAsset, isLoading, refetch } = useQuery({
        queryKey: ["load all asset"],
        queryFn: async () => {
            const res = await axiosSecure(`/all-asset/${currentUser?.email}?stock=${filterData}&sort=${sortData}&page=${currentPage-1}&size=${dataParePage}`);
            return res.data;
        }


    })

    // LOAD DATA LENGTH FOR PAGINATION
    useEffect(() => {
        axiosSecure(`/all-asset-length/${currentUser?.email}`)
            .then(res => {
                setTotalDataLength(res.data)
            })
    }, [])
    useEffect(() => {
        refetch()
    }, [filterData, sortData,currentPage])
    if (isLoading) return <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2"></span>



    // DELETE ASSET
    const handleDelete = (id, itemName) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {



            if (result.isConfirmed) {
                const response = await axiosSecure.delete(`/delete-asset/${id}`)
                if (response?.data?.deletedCount > 1) {

                    Swal.fire({
                        title: "Deleted!",
                        text: `${itemName} + "is Deleted."`,
                        icon: "success"
                    });

                }
                refetch();
            }

        });

    }





    return (
        <div className='w-full py-10 px-2'>
            <PageTitle title={"assets"} />
            <h3 className='text-5xl font-rancho mb-8 text-center text-[#cd5bcd]'>Your All Assets List :</h3>
            <div className='flex justify-between gap-3 mb-10'>

                <label className="form-control ">
                    <div className="label">
                        <span className="label-text">Sort on Quantity</span>
                    </div>
                    <select
                        onChange={(e) => setSortData(e.target.value)}
                        className="select select-bordered">
                        <option disabled selected>Select on</option>
                        <option>Low to High</option>
                        <option>High to Low</option>

                    </select>
                </label>
                <label className="form-control ">
                    <div className="label">
                        <span className="label-text">Filter depend of stock</span>
                    </div>
                    <select
                        onChange={(e) => setFilterData(e.target.value)}
                        className="select select-bordered">
                        <option disabled selected>Select on</option>
                        <option>In Stock</option>
                        <option>Out of Stock</option>

                    </select>
                </label>
            </div>
            {
                allAsset.length === 0 ? <div className='flex justify-center items-center w-full'><Lottie className='w-1/2' animationData={noDataFound} /></div> :
                    <div className="overflow-x-auto w-full">
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Asset Image</th>
                                    <th>Asset Name</th>
                                    <th>Asset Types</th>
                                    <th>Quantity</th>
                                    <th>Added On</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allAsset.map((asset, idx) =>
                                        <tr key={asset._id}>
                                            <th>{idx + 1}</th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={asset.assetImage} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='font-bold'>{asset.productName}</td>
                                            <td>
                                                <span className={`${asset.productType == "Returnable" ? "bg-yellow-100 p-2 rounded-lg" : "bg-blue-100 p-2 rounded-lg"}`}>{asset.productType}</span>
                                            </td>
                                            <td className={`font-bold ${asset.productQuantity == 0 ? "text-red-500" : ""}`}>{asset.productQuantity > 0 ? asset.productQuantity : "Out Of Stock"} Pic</td>
                                            <td>{asset.addedTime}</td>
                                            <td>
                                                <button
                                                    onClick={() => { setIsOpenModal(true), setAssetId(asset._id) }}
                                                    className='p-2 border text-xl bg-green-400 hover:bg-green-600  hover:text-white rounded-lg'>
                                                    <BiSolidEdit />
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleDelete(asset._id, asset.productName)}
                                                    className='p-2 border text-xl bg-red-200 text-red-700 hover:bg-red-600  hover:text-white rounded-lg'>
                                                    <RiDeleteBin6Line />
                                                </button>

                                            </td>
                                        </tr>
                                    )
                                }


                            </tbody>
                        </table>
                    </div>}

            <AssetUpdateModal
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                assetId={assetId}
                refetch={refetch}
            />


            <div className='flex justify-center items-center mt-10'>
                <div className="join">
                    {
                        pages.map(page =>

                            <input 
                            onChange={(e)=>setCurrentPage(e.target.value)}
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
        </div>
    );
};

export default AssetList;