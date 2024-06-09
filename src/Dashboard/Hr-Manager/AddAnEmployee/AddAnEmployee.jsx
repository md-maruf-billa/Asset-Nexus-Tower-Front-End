import React, { useState } from 'react';
import useUserInformation from '../../../Utils/Hooks/useUserInformation';
import userAxiosGlobal from '../../../Utils/Hooks/userAxiosGlobal';
import Button from '../../../Shared/Button/Button';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddAnEmployee = () => {
    const axiosGlobal = userAxiosGlobal();
    const axiosSecure = useAxiosSecure();
    const userInformation = useUserInformation();
    const [spinner, setSpinner] = useState(false);
    const [userImage, setUserImage] = useState("");


    // upload profile image
    const uploadProfileImage = (e) => {
        setSpinner(true);
        const file = e.target.files[0];
        const image = new FormData();
        image.append("image", file);
        axiosGlobal.post(`${import.meta.env.VITE_IMAGEBBURL}?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, image)
            .then(data => {
                setUserImage(data?.data?.data?.display_url)
                setSpinner(false);
            })
    }

    // upload employee in database
    const handelAddedEmployee = (e) => {
        setSpinner(true)
        e.preventDefault();
        const employeeName = e.target.employeeName.value;
        const employeeEmail = e.target.employeeEmail.value;


        const employeeInformation = {
            employeeName,
            employeeEmail,
            companyName: userInformation.companyName,
            hrEmail: userInformation.email,
            hrName: userInformation.name,
            employeeProfileImage: userImage,
            status: "Accepted",
            companyLogo: userInformation.companyProfileImage


        }

        axiosSecure.post("/register-team", employeeInformation)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully added !",
                        text: `You added  ${employeeName}  your team. `,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    e.target.reset();
                    setSpinner(false)
                }
            })
    }

    return (
        <div className='flex justify-center items-center h-[80vh]'>
            <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 class="text-2xl text-center font-semibold text-gray-700 capitalize dark:text-white">Add Employee Manually</h2>

                <form
                    onSubmit={handelAddedEmployee}
                    className='mt-8'>
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label class="text-gray-700 dark:text-gray-200" for="username">Employee Name</label>
                            <input
                                name='employeeName'
                                id="username"
                                placeholder='Name'
                                type="text"
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label class="text-gray-700 dark:text-gray-200" for="emailAddress">Employee Email</label>
                            <input
                                name='employeeEmail'
                                placeholder='Email'
                                id="emailAddress"
                                type="email"
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <fieldset className="w-full space-y-1 dark:text-gray-800">
                            <label htmlFor="files" className="block  font-medium">Profile Photo</label>
                            <div className="flex">
                                <input
                                    onChange={(e) => uploadProfileImage(e)}
                                    type="file"
                                    name="files"
                                    id="files"
                                    className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100" />
                            </div>
                        </fieldset>
                    </div>

                    <div class="flex justify-end mt-6">
                        <button type='submit'>
                            <Button btnName={"Add Now"} spinner={spinner} />
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddAnEmployee;




// companyName

// hrEmail

// hrName

// employeeEmail

// employeeName

// status

// employeeProfileImage
