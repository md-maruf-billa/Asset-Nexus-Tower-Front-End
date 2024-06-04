import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom'
import useCurrentUser from '../../Utils/Hooks/userCurrentUser';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query'
import userAxiosGlobal from '../../Utils/Hooks/userAxiosGlobal';
import useAdminCheck from '../../Utils/Hooks/useAdminCheck';
import { useForm } from "react-hook-form"



const Nav = () => {
    const userRole = useAdminCheck();
    const { currentUser, logOut } = useCurrentUser();
    const axiosGlobal = userAxiosGlobal();
    const navigate = useNavigate();

    // HANDEL LOGOUT
    const handelLogOut = () => {
        logOut()
            .then(res => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "I hope come Back Again!!",
                    text: "You are successfully log Out.",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/")
            })
    }

    // GET USER TYPE INFO FROM DATABASE
    const { data: userInfo } = useQuery({
        queryKey: ["current user role"],
        queryFn: async () => {
            const result = await axiosGlobal(`/user-info/${currentUser.email}`);
            return result.data;
        }
    })

    // COMMON NAV LINK
    const navLink = <>
        <li><NavLink to="/">Home</NavLink></li>
        {
            currentUser.email ?
                <li><Link to={`${userRole == "HR Manager" ? "/dashboard" : "/dashboard/employee-home"}`}>Go Your Dashboard</Link></li> :
                <li><NavLink to="/registration">Join as Employee</NavLink></li>}


    </>
    return (
        <div className='container mx-auto'>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm  z-[100] dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navLink}
                        </ul>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img className='size-[60px]' src="/logo.png" alt="" />
                        <a className="text-3xl">ANT</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 ">
                        {navLink}
                    </ul>
                </div>
                <div className="navbar-end z-50">
                    {!currentUser.email ?
                        <Link to="/login" className="btn">Login</Link> :
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={currentUser.photoURL || "https://icon-library.com/images/generic-user-icon/generic-user-icon-9.jpg"} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        {userInfo?.userType}
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><Link to={`${userRole == "HR Manager" ? "/dashboard" : "/dashboard/employee-home"}`}>Dashboard</Link></li>
                                <li onClick={handelLogOut}><a>Logout</a></li>
                            </ul>
                        </div>

                    }
                </div>
            </div>
        </div>
    );
};

export default Nav;


