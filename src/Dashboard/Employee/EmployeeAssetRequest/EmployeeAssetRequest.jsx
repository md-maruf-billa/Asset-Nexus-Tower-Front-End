import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import useEmployeeInfo from '../../../Utils/Hooks/useEmployeeInfo';

const EmployeeAssetRequest = () => {
    const axisSecure = useAxiosSecure();
    const employeeInformation = useEmployeeInfo();

    const { data: allAsset } = useQuery({
        queryKey: ["Load all asset under my hr"],
        queryFn: async () => {
            const result = await axisSecure(`/all-asset/${employeeInformation?.hrEmail}`);
            return result.data;
        }
    })
    return (
        <div className='w-full py-10'>
            <div className='flex items-center justify-between'>
                <h3 className='text-4xl mb-4'>Your Company Assets List :</h3>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Filter depend of stock</span>
                    </div>
                    <select className="select select-bordered">
                        <option disabled selected>Pick one</option>
                        <option>Star Wars</option>
                        <option>Harry Potter</option>
                        <option>Lord of the Rings</option>
                        <option>Planet of the Apes</option>
                        <option>Star Trek</option>
                    </select>
                </label>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Asset Image</th>
                            <th>Asset Name</th>
                            <th>Asset Types</th>
                            <th>Stock</th>
                            <th>Added On</th>
                            <th>Action</th>
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
                                    <td className={`font-bold ${asset.productQuantity == 0 ? "text-red-500" : ""}`}>{asset.productQuantity > 0 ? "In Stock" : "Out Of Stock"}</td>
                                    <td>{asset.addedTime}</td>
                                    <td>
                                        <button
                                            onClick={() => { setIsOpenModal(true), setAssetId(asset._id) }}
                                            className='btn btn-sm border-[#817f7f] bg-green-100'>
                                            Send Request
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

export default EmployeeAssetRequest;