import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import useEmployeeInfo from '../../../Utils/Hooks/useEmployeeInfo';
import Lottie from 'lottie-react';
import noDataFound from '../../../assets/Animation/NoDataFound.json'
import SendRequestForAsset from '../../../Components/Modal/SendRequestForAsset/SendRequestForAsset';
import PageTitle from '../../../Shared/PageTitle/PageTitle';
const EmployeeAssetRequest = () => {
    const axisSecure = useAxiosSecure();
    const employeeInformation = useEmployeeInfo();
    const [filterData, setFilterData] = useState("");
    const [sortData, setSortData] = useState("");
    const [assetId, setAssetId] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const dataParePage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAsset, setTotalAsset] = useState([]);


    // FETCH ALL DATA HARE-------------
    useEffect(() => {
        axisSecure(`/all-asset-length/${employeeInformation?.hrEmail}`)
            .then(res => {
                setTotalAsset(res?.data)
            })
    }, [])


    const { data: allAsset, isLoading, refetch } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const result = await axisSecure(`/all-asset/${employeeInformation?.hrEmail}?stock=${filterData}&sort=${sortData}&page=${currentPage - 1}&size=${dataParePage}`);
            return result.data;
        }
    })


    useEffect(() => {
        refetch()
    }, [filterData, sortData,currentPage])

    if (isLoading) return <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2"></span>
    // MAINTAIN PAGINATION---------
    const totalPage = Math.ceil(totalAsset?.length / dataParePage);
    const pages = []
    for (let i = 1; i < totalPage + 1; i++) {
        pages.push(i)
    }



    return (
        <div className='w-full py-10'>
            <PageTitle title={"Employee Requests"} />
            <h3 className='text-2xl  md:text-6xl text-[#cd5bcd] font-rancho mb-4 text-center'>Your Company Assets List :</h3>
            <div className='flex items-center justify-between'>


                <label className="form-control w-full max-w-[200px]">
                    <div className="label">
                        <span className="label-text">Short by stock</span>
                    </div>
                    <select
                        onChange={(e) => setSortData(e.target.value)}
                        className="select select-bordered">
                        <option disabled selected>Select on</option>
                        <option>Low to High</option>
                        <option>High to Low</option>

                    </select>
                </label>
                <label className="form-control w-full max-w-[200px]">
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
                allAsset.length === 0 ?
                    <div className='flex justify-center items-center'>
                        <Lottie className='w-1/2' animationData={noDataFound} />
                    </div> :
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
                                            <td className={`font-bold ${asset.productQuantity == 0 ? "text-red-500" : ""}`}>{asset.productQuantity} {asset.productQuantity > 0 ? "In Stock" : "Out Of Stock"}</td>
                                            <td>{asset.addedTime}</td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        setModalOpen(true),
                                                            setAssetId(asset._id)
                                                    }}
                                                    className={`btn btn-sm border-[#817f7f] bg-green-100 ${asset.productQuantity == 0 && "btn-disabled"}`}>
                                                    Send Request
                                                </button>

                                            </td>
                                        </tr>
                                    )


                                }



                                <SendRequestForAsset assetId={assetId} modalOpen={modalOpen} setModalOpen={setModalOpen} />
                            </tbody>
                        </table>
                    </div>
            }
            <div className='mt-8 flex justify-center items-start '>
                <div className="join">
                    {
                        pages?.map(page =>


                            <input
                                onClick={(e) => setCurrentPage(e.target?.value)}
                                className="join-item btn btn-square"
                                type="radio"
                                name="options"
                                aria-label={page}
                                value={page}
                                checked={currentPage == page} />
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default EmployeeAssetRequest;