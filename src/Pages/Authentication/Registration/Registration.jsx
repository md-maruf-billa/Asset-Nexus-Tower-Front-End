import React, { useState } from 'react';
import Button from '../../../Shared/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import userAxiosGlobal from '../../../Utils/Hooks/userAxiosGlobal';
import { VscEye } from 'react-icons/vsc';
import { FaEyeSlash } from 'react-icons/fa6';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';
import Swal from 'sweetalert2'
import { updateProfile } from 'firebase/auth';
import auth from '../../Firebase/firebase.config';

const Registration = () => {
    const axiosGlobal = userAxiosGlobal();
    const { createAccountWithPassword, setLoading } = useCurrentUser();
    // NECESSARY STATE HARE
    const [switchTab, setSwitchTab] = useState("Employee");
    const [birthDay, onChange] = useState(new Date());
    const [photoURL, setPhotURL] = useState("");
    const [companyLogo, setCompanyLogo] = useState("")
    const [spinner, setSpinner] = useState(false);
    const [passErr, setPassErr] = useState('');
    const [strongPass, setStrongPass] = useState("");
    const [successPass, setSuccessPass] = useState("")
    const [eye, setEye] = useState(true);
    const navigate = useNavigate();


    // UPLOAD PHOTO IMAGE BB
    const uploadProfileImage = (e) => {
        setSpinner(true);
        const image = e.target.files[0];
        const imageFile = new FormData();
        imageFile.append("image", image);

        // UPLOAD 
        axiosGlobal.post(`${import.meta.env.VITE_IMAGEBBURL}?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, imageFile)
            .then(data => {
                setPhotURL(data?.data?.data?.display_url)
                setSpinner(false);
            })
    }


    const uploadCompanyLogo = (e) => {
        setSpinner(true);
        const image = e.target.files[0];
        const imageFile = new FormData();
        imageFile.append("image", image);

        // UPLOAD 
        axiosGlobal.post(`${import.meta.env.VITE_IMAGEBBURL}?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, imageFile)
            .then(data => {
                setCompanyLogo(data?.data?.data?.display_url)
                setSpinner(false);
            })

    }


    // HANDEL REGISTRATION AND SAVE DATA IN DATABASE

    const handelPasswordBasedRegistration = (event) => {
        // STOP RELOAD WHEN SUBMITTING
        event.preventDefault();

        // GET ALL DATA FORM FORM
        const formData = event.target;
        const name = formData.name.value;
        const companyName = formData.companyName?.value || null;
        const email = formData.email.value;
        const profileImage = photoURL;
        const companyProfileImage = companyLogo || null;
        const dateOfBirth = birthDay.toLocaleDateString();
        const userType = switchTab;
        const stablishAt = new Date().toLocaleDateString();

        const userAllInformation = { name, email, profileImage, dateOfBirth, userType, companyName, companyProfileImage, stablishAt };

        // REGISTER USER
        createAccountWithPassword(email, strongPass)
            .then(res => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoURL
                }).then(res => {
                    axiosGlobal.post("/user-info", userAllInformation)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${"welcome " + name}`,
                        text: `${"You are successfully logedIn as a " + userType}`,
                        showConfirmButton: false,
                        timer: 3000
                    });
                })
                setLoading(true)
                navigate("/")
            })
            .catch(err => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Opps! Something went wrong!!",
                    text: `${err.message}`,
                    showConfirmButton: false,
                    timer: 3000
                });
            })
    }

    // CHECKING PASSWORD 
    const managePassword = (e) => {
        const password = e.target.value;
        if (password.length < 6) {
            setPassErr("Password should be more then 6 character");
            return;
        }
        else if (!/(?=.*[a-z])/.test(password)) {
            setPassErr("Must be need a lower case");

            return;
        }
        else if (!/(?=.*[A-Z])/.test(password)) {
            setPassErr("Must be need a Upper case");
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setPassErr("Must be need a number");
            return;
        }
        else if (!/(?=.*[!@#$%^&*()])/.test(password)) {
            setPassErr("Need a special character (!@#$%^&*())");
            return;
        }


        else {
            setPassErr("");
            setSuccessPass("your password is too strong")
            setStrongPass(password)
        }

    }

    return (
        <div>
            <div className="hero min-h-screen bg-[#1d191923]">
                <div className="hero-content flex-col lg:flex-row-reverse gap-20 w-full">

                    <div className="card shrink-0 w-full max-w-sm lg:max-w-lg shadow-2xl bg-base-100 bg-opacity-15 ">


                        <form id='form' onSubmit={handelPasswordBasedRegistration} className="card-body bg-white rounded-md">
                            <h1 className="text-6xl text-center font-rancho font-bold mb-5 text-blue-400">Welcome to ANT</h1>
                            <div role="tablist" className="tabs tabs-boxed bg-transparent">
                                <a role="tab" onClick={() => setSwitchTab("Employee")} className={`tab  ${switchTab == "Employee" && 'border-b-2 border-blue-600 text-blue-600 font-bold '}`}>Join as Employee</a>
                                <a role="tab" onClick={() => setSwitchTab("HR Manager")} className={`tab ${switchTab == "HR Manager" && 'border-b-2 border-blue-600 text-blue-600 font-bold '}`}>Join as HR</a>

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Full Name</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                    <input type="text" className="grow" name='name' placeholder="Name" required />
                                </label>
                            </div>
                            {
                                switchTab == "HR Manager" && <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Company Name</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                        <input type="text" name='companyName' className="grow" placeholder="Company name" required />
                                    </label>
                                </div>
                            }

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                    <input type="text" name='email' className="grow" placeholder="Email" required />
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2 relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input onChange={(e) => managePassword(e)} type={eye ? "password" : "text"} className="grow" placeholder='* * * * * * *' required />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                        {
                                            eye ? <VscEye onClick={() => setEye(!eye)} className='text-2xl text-[#5a5a5a] cursor-pointer'></VscEye> :
                                                <FaEyeSlash onClick={() => setEye(!eye)} className='text-xl text-[#5a5a5a] cursor-pointer'></FaEyeSlash>
                                        }
                                    </div>
                                </label>
                            </div>
                            <label className="flex justify-between">
                                {
                                    passErr ? <small className='text-red-600'>{passErr}</small> :
                                        <small className='-mt-10 text-green-600'>{successPass}</small>
                                }
                                <a href="#" className="label-text font-alt  link link-hover">Forgot password?</a>
                            </label>



                            <div className="flex items-center justify-between gap-10">
                                <div>
                                    <label className='label w-full'>
                                        <span className="label-text font-bold">Date of Birth</span>
                                    </label>
                                    <DatePicker className={"w-full"} onChange={onChange} value={birthDay} />
                                </div>




                                <label htmlFor="profile-image" className="flex flex-col  items-center border-2 border-dashed justify-center  w-full max-w-lg p-2 mx-auto mt-2 text-center bg-white  cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 dark:text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                    </svg>

                                    <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">Profile Photo</h2>

                                    <input onChange={(e) => uploadProfileImage(e)} id="profile-image" type="file" className="hidden" />
                                </label>


                                {switchTab == "HR Manager" && <label htmlFor="company-logo" className="flex flex-col items-center w-full max-w-lg p-2 mx-auto mt-2 text-center bg-white border-2 border-dashed  cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 dark:text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                    </svg>

                                    <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">Company Logo</h2>

                                    <input onChange={(e) => uploadCompanyLogo(e)} id="company-logo" type="file" className="hidden" />
                                </label>}

                            </div>



                            <div className="form-control mt-6">
                                <button className='w-full'>

                                    <Button style={"w-full bg-blue-600 hover:bg-blue-500"} btnName={"Register"} spinner={spinner} />
                                </button>
                            </div>
                            <p className='text-center'>Already Have an Account? <Link to="/login" className='underline text-blue-600 '>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;