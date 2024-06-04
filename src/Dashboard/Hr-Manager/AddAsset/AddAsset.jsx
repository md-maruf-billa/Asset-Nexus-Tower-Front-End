import React, { useState } from 'react';
import Button from '../../../Shared/Button/Button';
import userAxiosGlobal from '../../../Utils/Hooks/userAxiosGlobal';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';

const AddAsset = () => {
    const { register, handleSubmit,reset } = useForm()
    const axiosGlobal = userAxiosGlobal();
    const axiosSecure = useAxiosSecure();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [assetImage, setAssetImage] = useState("");
    const {currentUser} = useCurrentUser();

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

    const submitAsset = (data) => {
        const addedTime = new Date().toLocaleDateString();
        const assetInfo = { ...data, assetImage ,addedTime,hrEmail:currentUser?.email}

        // SAVE DATA INTO DATABASE
        axiosSecure.post("/add-asset", assetInfo)
            .then(res => {
                if (res?.data?.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${ data.productName +"is Saved into database" }`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                    setButtonLoading(false);
                    reset();
                }
            })
    }




    return (
        <div className='flex items-center justify-center w-full h-full'>
            <section class=" p-6 mx-auto bg-white rounded-md shadow-md ">
                <h2 class="text-4xl text-center font-semibold text-gray-700 capitalize">Add Your Assets</h2>

                <form onSubmit={handleSubmit(submitAsset)}>
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label class="text-gray-700 dark:text-gray-200" for="username">Product Name</label>
                            <input
                                {...register("productName")}
                                required
                                id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label class="text-gray-700 dark:text-gray-200" for="emailAddress">Product Type</label>

                            <select
                                {...register("productType")}
                                required
                                className="select select-bordered w-full max-w-xs border-gray-200">
                                <option disabled selected>Select Product type</option>
                                <option>Returnable</option>
                                <option>Non Returnable</option>
                            </select>
                        </div>

                        <div>
                            <label class="text-gray-700 dark:text-gray-200" for="password">Product Quantity</label>
                            <input
                                {...register("productQuantity")}
                                required
                                id="password" type="number" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label htmlFor="company-logo" className="flex flex-col border-2 border-dashed items-center w-full max-w-sm py-2 mx-auto mt-2 text-center bg-white  cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 dark:text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>

                                <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">Product Image</h2>

                                <input onChange={(e) => uploadAssetsImage(e)} id="company-logo" type="file" className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div class="flex justify-end mt-6">
                        <button onClick={() => setButtonLoading(true)}>
                            <Button btnName={"Save"} spinner={buttonLoading} />
                        </button>
                    </div>
                </form>
            </section>



        </div>
    );
};

export default AddAsset;