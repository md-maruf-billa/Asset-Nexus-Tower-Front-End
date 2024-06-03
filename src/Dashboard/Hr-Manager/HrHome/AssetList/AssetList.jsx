import React from 'react';
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from '../../../../Utils/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';



const AssetList = () => {
    const axiosSecure = useAxiosSecure();
    // LOAD ALL ASSET
    const { data: allAsset,isLoading } = useQuery({
        queryKey: ["load all asset"],
        queryFn: async () => {
            const res = await axiosSecure("/all-asset");
            return res.data;
        }


    })
    if(isLoading) return <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2"></span>
    return (
        <div>
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
                            allAsset.map((asset,idx) =>
                                <tr key={asset._id}>
                                    <th>{idx+1}</th>
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
                                        <span className={`${asset.productType == "Returnable"?"bg-yellow-100 p-2 rounded-lg":"bg-blue-100 p-2 rounded-lg"}`}>{asset.productType}</span>
                                        </td>
                                    <td className='font-bold'>{asset. productQuantity} Pic</td>
                                    <td>{asset.addedTime}</td>
                                    <td>
                                        <button className='p-2 border text-xl bg-green-400 hover:bg-green-600  hover:text-white rounded-lg'>
                                            <BiSolidEdit />
                                        </button>
                                    </td>
                                    <td>
                                        <button className='p-2 border text-xl bg-red-200 text-red-700 hover:bg-red-600  hover:text-white rounded-lg'>
                                            <RiDeleteBin6Line />
                                        </button>

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

export default AssetList;