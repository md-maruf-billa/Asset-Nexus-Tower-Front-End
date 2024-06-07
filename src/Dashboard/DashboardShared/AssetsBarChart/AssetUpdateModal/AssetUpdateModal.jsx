import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../../Utils/Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Button from '../../../../Shared/Button/Button';
import userAxiosGlobal from '../../../../Utils/Hooks/userAxiosGlobal';
import Swal from 'sweetalert2';

const AssetUpdateModal = ({isOpenModal,setIsOpenModal,assetId,refetch}) => {
    const axiosGlobal = userAxiosGlobal();
    const { register, handleSubmit,reset } = useForm();
    const [assetImage , setAssetImage] = useState("");
    const [buttonLoading , setButtonLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const {data:asset,isLoading} = useQuery({
        queryKey:[`${assetId}`,"data"],
        queryFn: async ()=>{
                if(assetId === "") return;
                const result = await axiosSecure(`/single-asset/${assetId}`)
                return result.data;
            
        }
    })

    // UPLOADING ASSETS IMAGE
    const uploadAssetsImage = (e) => {
        setButtonLoading(true);
        const image = e.target.files[0];
        const imageFile = new FormData();
        imageFile.append("image", image);

        // UPLOAD 
        axiosGlobal.post(`${import.meta.env.VITE_IMAGEBBURL}?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, imageFile)
            .then(data => {
                setAssetImage(data?.data?.data?.display_url)
                setButtonLoading(false);
            })
    }

    // UPDATE ASSET
    const updateAsset =(info) =>{
        const finalData = {
            productName: info.productName || asset.productName,
            productType: info.productType || asset.productType,
            productQuantity: info.productQuantity || asset.productQuantity,
            assetImage : assetImage || asset.assetImage
            
        }


        // SENT DATA INTO SERVER
        axiosSecure.patch(`/update-asset/${asset._id}`,finalData)
        .then(res=> {
            if(res?.data?.modifiedCount>0){
                
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${ asset.productName +"is Updated" }`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                    setButtonLoading(false);
                    reset();
                
                setButtonLoading(false);
                setIsOpenModal(false);
                refetch()
            }
        })
    }




    if(isLoading) return <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2"></span>;
    return (
        <div  className={`${isOpenModal? "relative flex justify-center max-w-lg w-full": "hidden"}`}>
    <div x-show="isOpen" 
        x-transition:enter="transition duration-300 ease-out"
        x-transition:enter-start="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        x-transition:enter-end="translate-y-0 opacity-100 sm:scale-100"
        x-transition:leave="transition duration-150 ease-in"
        x-transition:leave-start="translate-y-0 opacity-100 sm:scale-100"
        x-transition:leave-end="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        className="fixed inset-0 z-10 overflow-y-auto" 
        aria-labelledby="modal-title" role="dialog" aria-modal="true"
    >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                        Update Now - {asset?.productName}
                    </h3>
                    

                    <form 
                    onSubmit={handleSubmit(updateAsset)}
                    className="mt-4 space-y-5" >
                        <label for="emails-list" className="text-sm text-gray-700 dark:text-gray-200">
                           Asset Name
                        </label>

                        <label className="block mt-3" for="email">
                            <input type="text" name="email" id="email" placeholder={asset?.productName} 
                            {...register("productName")}
                            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>
                        <label for="emails-list" className="text-sm text-gray-700 dark:text-gray-200">
                           Asset Type
                        </label>

                        <select
                                {...register("productType")}
                                required
                                className="select select-bordered w-full max-w-xs border-gray-200">
                                <option disabled selected>Select Product type</option>
                                <option>Non Returnable</option>
                                <option>Returnable</option>
                            </select>
                        <div className='flex gap-5'>
                        <div>
                        <label for="emails-list" className="text-sm text-gray-700 dark:text-gray-200">
                           Asset Quantity
                        </label>

                        <label className="block mt-3" for="email">
                            <input type="number" name="email" id="email" 
                            {...register("productQuantity")}
                            placeholder={asset?.productQuantity} className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>
                        </div>
                        <div>
                        <label htmlFor="company-logo" className="flex flex-col border-2 border-dashed items-center w-full max-w-sm py-2 mx-auto mt-2 text-center bg-white  cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 dark:text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>

                                <h2 className="mt-1 font-medium text-xs px-2 tracking-wide text-gray-700 dark:text-gray-200">Update Image</h2>

                                <input onChange={(e) => uploadAssetsImage(e)} id="company-logo" type="file" className="hidden" />
                            </label>
                        </div>
                        </div>



                        <div className="sm:flex justify-between ">
                            <p 
                            className='w-full md:w-1/2'
                            onClick={()=> setIsOpenModal(false)}>
                                <Button btnName={"Cancel"} iconStyle={"hidden"} style={"bg-red-400 hover:bg-red-600"}/>
                            </p>


                           <button 
                           onClick={()=> setButtonLoading(true)}
                           className='w-full md:w-1/2'>
                           <Button btnName={"Save Data"} spinner={buttonLoading}/>
                           </button>
                        </div>
                    </form>
                </div>
        </div>
    </div>
</div>
    );
};

export default AssetUpdateModal;