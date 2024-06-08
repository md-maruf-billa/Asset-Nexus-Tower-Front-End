import React from 'react';
import { FaHouse } from 'react-icons/fa6';
import { AiFillProduct } from "react-icons/ai";
import { BsMicrosoftTeams } from "react-icons/bs";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { BiMessageSquareEdit } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from 'react-router-dom';
import { RiFunctionAddFill } from "react-icons/ri";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { MdAddBusiness } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
import { IoPersonAdd } from "react-icons/io5";
import useAdminCheck from '../Utils/Hooks/useAdminCheck';
import Swal from 'sweetalert2';
import useCurrentUser from '../Utils/Hooks/userCurrentUser';
import { FaBars } from "react-icons/fa6";
import useUserInformation from '../Utils/Hooks/useUserInformation';
import useEmployeeInfo from '../Utils/Hooks/useEmployeeInfo';

const Dashboard = () => {
    const userRole = useAdminCheck();
    const { logOut } = useCurrentUser();
    const navigate = useNavigate()
    const userInformation = useUserInformation();
    const employeeInformation = useEmployeeInfo();




    // LOGOUT USER
    const handelLogout = () => {
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
    return (
        <div className='lg:max-w-lg  p-4 z-50'>
            {/* ----------DASHBOARD NAVBAR----- */}

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden"><FaBars /></label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        {
                            userRole === 'HR Manager' ?
                                <>
                                    <NavLink to={"/dashboard"} end className="flex gap-2 items-center p-2 rounded-lg"><FaHouse /> HR Dashboard</NavLink>
                                    {userInformation?.packageInfo && <>
                                        <NavLink to={"asset-list"} className="flex gap-2 items-center p-2 rounded-lg"><AiFillProduct /> Assets List</NavLink>
                                        <NavLink to={"add-asset"} className="flex gap-2 items-center p-2 rounded-lg"><RiFunctionAddFill />Add an Assets</NavLink>
                                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><BsChatSquareQuoteFill />All Request's</NavLink>
                                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><MdAddBusiness />Employee Requests List</NavLink>
                                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><GiTeamIdea />My Employee List</NavLink>
                                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><IoPersonAdd />Add an Employee</NavLink>
                                    </>}

                                </>
                                :

                                <>
                                    <NavLink to={"/dashboard/employee-home"} className="flex gap-2 items-center p-2 rounded-lg"><FaHouse /> Employee Home</NavLink>
                                    {
                                        !employeeInformation?.status == "Requested" && <>

                                            <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><AiFillProduct /> My Assets</NavLink>
                                            <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><BsMicrosoftTeams /> My Team</NavLink>
                                            <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><VscGitPullRequestGoToChanges /> Request an Assets</NavLink>
                                        </>
                                    }

                                </>
                        }
                        {/* ---------COMMON LINK------------------------- */}
                        <>
                            <div className='divider'></div>
                            <NavLink to={"/"} end className="flex gap-2 items-center p-2 rounded-lg"><FaHouse /> Home</NavLink>
                            <NavLink to={"student-home"} end className="flex gap-2 items-center p-2 rounded-lg"><BiMessageSquareEdit /> Edit Profile</NavLink>
                            <button onClick={handelLogout} className="flex gap-2 items-center p-2 rounded-lg"><FiLogOut /> Log Out</button>

                        </>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;