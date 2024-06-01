import React, { useState } from 'react';
import Button from '../../../Shared/Button/Button';
import { Link } from 'react-router-dom';
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
    const { createAccountWithPassword } = useCurrentUser();
    // NECESSARY STATE HARE
    const [switchTab, setSwitchTab] = useState("Employee");
    const [birthDay, onChange] = useState(new Date());
    const [photoURL, setPhotURL] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [passErr, setPassErr] = useState('');
    const [strongPass, setStrongPass] = useState("");
    const [successPass, setSuccessPass] = useState("")
    const [eye, setEye] = useState(true);


    // UPLOAD PHOT IMAGE BB
    const handelUploadPhoto = (e) => {
        setSpinner(true);
        const image = e.target.files[0];
        const imageFile = new FormData();
        imageFile.append("image", image);

        // UPLOAD API
        axiosGlobal.post(`${import.meta.env.VITE_IMAGEBBURL}?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, imageFile)
            .then(data => {
                setPhotURL(data?.data?.data?.display_url)
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
        const companyName = formData.companyName?.value || "";
        const email = formData.email.value;
        const profileImage = photoURL;
        const dateOfBirth = birthDay;
        const userType = switchTab;

        const userAllInfo = { name, companyName, email, profileImage, dateOfBirth, userType }

        // REGISTER USER
        createAccountWithPassword(email, strongPass)
            .then(res => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoURL
                }).then(res => {
                    axiosGlobal.post("/user-info",userAllInfo)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${"welcome " + name}`,
                        text: `${"You are successfully logedIn as a " + userType}`,
                        showConfirmButton: false,
                        timer: 3000
                    });
                })
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
            <div className="hero min-h-screen bg-[url(/loginPageBg.png)]">
                <div className="hero-content flex-col lg:flex-row-reverse gap-20 w-full">

                    <div className="card shrink-0 w-full max-w-sm lg:max-w-lg shadow-2xl bg-base-100 bg-opacity-15">


                        <form onSubmit={handelPasswordBasedRegistration} className="card-body">
                            <h1 className="text-5xl text-center font-bold mb-5">Welcome to ANT</h1>
                            <div role="tablist" className="tabs tabs-boxed">
                                <a role="tab" onClick={() => setSwitchTab("Employee")} className={`tab ${switchTab == "Employee" && 'tab-active'}`}>Join as Employee</a>
                                <a role="tab" onClick={() => setSwitchTab("HR")} className={`tab ${switchTab == "HR" && 'tab-active'}`}>Join as HR</a>

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
                                switchTab == "HR" && <div className="form-control">
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



                            <div className="flex items-center gap-10">
                                <div>
                                    <label className='label'>
                                        <span className="label-text font-bold">Date of Birth</span>
                                    </label>
                                    <DatePicker onChange={onChange} value={birthDay} />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-bold">{switchTab ? "Profile Photo" : "Company Logo"}</span>
                                    </label>
                                    <input
                                        onChange={(e) => handelUploadPhoto(e)}
                                        type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs" required />
                                </div>
                            </div>



                            <div className="form-control mt-6">
                                <button className='w-full'>

                                    <Button style={"w-full"} btnName={"Register"} spinner={spinner} />
                                </button>
                            </div>
                            <p>Already Have an Account? <Link to="/login" className='underline text-white'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;