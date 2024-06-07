import React, { useState } from 'react';
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import noDataFound from '../../../assets/Animation/NoDataFound.json'
import AssetUpdateModal from '../../DashboardShared/AssetsBarChart/AssetUpdateModal/AssetUpdateModal';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';


const AssetList = () => {
    const {currentUser} = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const [isOpenModal , setIsOpenModal] = useState(false); 
    const [assetId, setAssetId] = useState("");
    // LOAD ALL ASSET
    const { data: allAsset, isLoading, refetch } = useQuery({
        queryKey: ["load all asset"],
        queryFn: async () => {
            const res = await axiosSecure(`/all-asset/${currentUser?.email}`);
            return res.data;
        }


    })


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





    if (isLoading) return <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2"></span>
    if(allAsset.length==0) return <div className='flex justify-center items-center w-full'><Lottie animationData={noDataFound} /></div>;
    return (
        <div className='w-full py-10'>
            <h3 className='text-4xl mb-4'>Your All Assets List :</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
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
                                    <td className={`font-bold ${asset.productQuantity==0 ? "text-red-500" :""}`}>{asset.productQuantity>0?asset.productQuantity :"Out Of Stock"} Pic</td>
                                    <td>{asset.addedTime}</td>
                                    <td>
                                        <button 
                                        onClick={()=>{ setIsOpenModal(true),setAssetId(asset._id)}}
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
            </div>

            <AssetUpdateModal 
            isOpenModal={isOpenModal} 
            setIsOpenModal={setIsOpenModal} 
            assetId={assetId}
            refetch={refetch}
            />
        </div>
    );
};

export default AssetList;