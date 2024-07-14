import React, { useEffect, useState } from 'react';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';
import Button from '../../../Shared/Button/Button';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, DateRangePicker } from 'react-date-range';
import Swal from 'sweetalert2';


const SendRequestForAsset = ({ assetId ,modalOpen,setModalOpen}) => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useCurrentUser();
    const [needQuantity , setNeedQuantity] = useState(1);

    const { data: asset, isLoading, refetch } = useQuery({
        queryKey: ["single asset Data"],
        queryFn: async () => {
            const result = await axiosSecure(`/single-asset/${assetId}`);
            return result.data;
        }
    });
    useEffect(() => { refetch() }, [assetId]);
    const [state, setState] = useState([
        {
            startDate: new Date().toLocaleDateString(),
            endDate: addDays(new Date().toLocaleDateString(), 7),
            key: 'selection'
        }
    ]);


    const submitAssetRequest =()=>{
        const productName = asset.productName;
        const employeeEmail = currentUser.email;
        const productType = asset.productType;
        const requestedDate = {
            startDate: state[0].startDate.toLocaleDateString(),
            endDate : state[0].endDate.toLocaleDateString()
        };
        const hrEmail = asset.hrEmail;
        const hrName = asset.hrName;
        const employeeName = currentUser.displayName;
        const requestQuantity = needQuantity;
        const assetImage = asset.assetImage;
        const status = "Pending"

        const requestDetails = {productName,employeeEmail,employeeName,productName,productType,requestedDate,hrEmail,hrName,requestQuantity,assetImage,status};

        axiosSecure.post("/save-request-data",requestDetails)
        .then(res=>{
            if(res.data.insertedId){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully Saved",
                    text: "Your Asset request is successfully save. Wait for HR confirmation.",
                    showConfirmButton: false,
                    timer: 1500
                });
                setModalOpen(false)
            }
        })
        

    }




    if (isLoading) return
    return (
        <div class={`${modalOpen ? "relative flex justify-center":"hidden"}`}>

            <div  
                x-transition:enter="transition duration-300 ease-out"
                x-transition:enter-start="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
                x-transition:enter-end="translate-y-0 opacity-100 sm:scale-100"
                x-transition:leave="transition duration-150 ease-in"
                x-transition:leave-start="translate-y-0 opacity-100 sm:scale-100"
                x-transition:leave-end="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
                class="fixed inset-0 z-10 overflow-y-auto" 
                aria-labelledby="modal-title" role="dialog" aria-modal="true"
            >
                <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

                        <div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 w-full max-w-sm md:max-w-lg sm:p-6 sm:align-middle">
                        <form >
                            <h3 className="font-bold text-3xl text-center">Asset Request Form</h3>

                            <div className='flex flex-col md:flex-row gap-4 mt-8'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Product Name</span>
                                    </div>
                                    <input
                                        name='companyName'
                                        disabled
                                        value={asset?.productName}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />

                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Product Type</span>
                                    </div>
                                    <input
                                        name='hrName'
                                        disabled
                                        value={asset?.productType}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />

                                </label>

                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Employee Email</span>
                                    </div>
                                    <input
                                        name='employeeEmail'
                                        disabled
                                        value={currentUser.email}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />

                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Employee Name</span>
                                    </div>
                                    <input
                                        name='employeeName'
                                        disabled
                                        value={currentUser?.displayName}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />

                                </label>

                            </div>
                            <div className='flex justify-center items-center my-5'>
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setState([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={state}
                                />
                            </div>

                            <div className='flex flex-col md:flex-row md:justify-between gap-4 md:items-end'>
                                <label className="form-control w-full md:w-1/2 max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Quantity</span>
                                    </div>
                                    <input
                                        onChange={(e)=> setNeedQuantity(e.target.value)}
                                        type="number"
                                        defaultValue={needQuantity}
                                        className="input input-bordered w-full max-w-xs" />

                                </label>

                            </div>

                            <div className="mt-6 flex items-center justify-between  sm:-mx-2">
                            <button 
                            className='btn btn-error text-white'
                            type="button"
                            onClick={()=>setModalOpen(false)}
                            >
                                Cancel
                            </button>

                            <button 
                            className='btn btn-success text-white'
                            onClick={submitAssetRequest}
                            type="button" >
                                Send Request
                            </button>
                        </div>
                        </form>
                            
                        </div>
                </div>
            </div>
        </div>

    );
};

export default SendRequestForAsset;


