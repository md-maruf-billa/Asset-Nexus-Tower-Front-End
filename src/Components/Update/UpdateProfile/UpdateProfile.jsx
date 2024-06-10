import React, { useState } from 'react';
import useCurrentUser from './../../../Utils/Hooks/userCurrentUser';
import useUserInformation from './../../../Utils/Hooks/useUserInformation';
import { FaEdit } from "react-icons/fa";
import Button from '../../../Shared/Button/Button';
import userAxiosGlobal from '../../../Utils/Hooks/userAxiosGlobal';
import { updateProfile } from 'firebase/auth';
import auth from '../../../Pages/Firebase/firebase.config';
import Swal from 'sweetalert2';
import PageTitle from '../../../Shared/PageTitle/PageTitle';

const UpdateProfile = () => {
    const axiosGlobal = userAxiosGlobal();
    const { currentUser, setLoading } = useCurrentUser();
    const userInformation = useUserInformation();
    const [spinner, setSpinner] = useState(false);
    const [profileImage, setProfileImage] = useState();

    // upload profile image
    const uploadImage = (e) => {
        setSpinner(true)
        const file = e.target.files[0];
        const image = new FormData();
        image.append("image", file);

        axiosGlobal.post(`${import.meta.env.VITE_IMAGEBBURL}?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, image)
            .then(data => {
                setProfileImage(data?.data?.data?.display_url)
                setSpinner(false);
            })
    }

    // update profile hare
    const handelProfileUpdate = (e) => {
        e.preventDefault();
        const name = e.target.name.value || e.target.name.placeholder;

        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: profileImage || currentUser.photoURL
        }).then(() => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Successful`,
                text: `Your profile update to date.`,
                showConfirmButton: false,
                timer: 1000
            });
            setLoading(true);
        })

    }



    return (
        <div className='flex justify-center items-center h-full'>
            <PageTitle title={"Update Profile"}/>
            <div className="flex flex-col justify-center w-full max-w-lg p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">
                <img src={currentUser?.photoURL} alt="" className="size-40 mx-auto object-center rounded-full dark:bg-gray-500 aspect-square" />
                <div className="space-y-4 divide-y dark:divide-gray-300 flex flex-col items-center  justify-center">
                    <div className="my-2 space-y-1 ">
                        <h2 className="text-xl font-semibold sm:text-2xl">{currentUser?.displayName}</h2>
                        <p className=" text-xs sm:text-base dark:text-gray-600"><span className='text-[#FF76CE] font-bold'>Profile Type: </span> {userInformation?.userType}</p>
                        <p className=" text-xs sm:text-base dark:text-gray-600"><span className='text-[#FF76CE] font-bold'>Email: </span> {currentUser?.email}</p>
                    </div>
                    <div>
                        <button
                            onClick={() => document.getElementById('my_modal_3').showModal()}
                            className='btn btn-sm mt-8 btn-outline btn-secondary'><FaEdit /> Update Now</button>
                    </div>
                </div>
            </div>


            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handelProfileUpdate}>
                        <div
                            className='min-h-[calc(100vh-325px)] mt-[68px] mb-10 md:mb-0 mx-auto container flex  justify-center items-center px-2 md:px-0'>
                            <div className=' rounded-lg px-8' >
                                <div >
                                    <h3 className='font-rancho text-4xl md:text-6xl text-[#FF76CE]'>Update Your Profile</h3>
                                    <div className='flex justify-center items-center mt-8'>
                                        <img className='size-[150px] rounded-full' src={profileImage || currentUser.photoURL} alt="" />
                                    </div>
                                    <div className='flex gap-1 flex-col mt-8'>
                                        <p className='font-semibold text-[#FF76CE]'>Name</p>
                                        <input name='name' type="text" className='bg-transparent outline-none border-b-2' placeholder={currentUser?.displayName} />
                                    </div>
                                    <div className='flex gap-1 flex-col mt-6'>
                                        <span className='flex items-center gap-2'>
                                            <p className='font-semibold text-[#FF76CE]'>Email</p>
                                            <small className='text-red-600'>(Not changeable)</small>
                                        </span>
                                        <input name='email' type="text" className='bg-transparent outline-none border-b-2' readOnly value={currentUser?.email || 'Email Not Public'} />
                                    </div>
                                    <div className='flex gap-1 flex-col mt-6'>
                                        <p className='font-semibold text-[#FF76CE]'>Profile Photo</p>
                                        <div>
                                            <label for="dropzone-file" class="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-500 dark:text-gray-400">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                                </svg>

                                                <h2 class="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">Upload image</h2>

                                                <p class="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">Upload or darg & drop your file SVG, PNG, JPG or GIF. </p>

                                                <input onChange={(e) => uploadImage(e)} id="dropzone-file" type="file" class="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center mt-10'>
                                        <button type='submit'>
                                            <Button
                                                btnName={"Update Now"}
                                                style={"bg-[#FF76CE] hover:bg-[#eb55be]"}
                                                spinner={spinner} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default UpdateProfile;