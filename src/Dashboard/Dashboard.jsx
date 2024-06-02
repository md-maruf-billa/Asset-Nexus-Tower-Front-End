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

const Dashboard = () => {
    const userRole = useAdminCheck();
    const { logOut } = useCurrentUser();
    const navigate = useNavigate()




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
        <div className='max-w-lg min-h-[calc(100vh-80px)] bg-gray-200 p-10'>
            {/* ----------DASHBOARD NAVBAR----- */}


            {
                userRole === 'HR Manager' ?
                    <>
                        <NavLink to={"/dashboard"} end className="flex gap-2 items-center p-2 rounded-lg"><FaHouse /> HR Dashboard</NavLink>
                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><AiFillProduct /> Assets List</NavLink>
                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><RiFunctionAddFill />Add an Assets</NavLink>
                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><BsChatSquareQuoteFill />All Request's</NavLink>
                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><MdAddBusiness />Custom Requests List</NavLink>
                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><GiTeamIdea />My Employee List</NavLink>
                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><IoPersonAdd />Add an Employee</NavLink>

                    </>
                    :

                    <>
                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><FaHouse /> Employee Home</NavLink>
                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><AiFillProduct /> My Assets</NavLink>
                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><BsMicrosoftTeams /> My Team</NavLink>
                        <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><VscGitPullRequestGoToChanges /> Request an Assets</NavLink>

                    </>
            }
            {/* ---------COMMON LINK------------------------- */}
            <>
                <div className='divider'></div>
                <NavLink to={"/"} end className="flex gap-2 items-center p-2 rounded-lg"><FaHouse /> Home</NavLink>
                <NavLink to={"student-home"} end className="flex gap-2 items-center p-2 rounded-lg"><BiMessageSquareEdit /> Edit Profile</NavLink>
                <button onClick={handelLogout} className="flex gap-2 items-center p-2 rounded-lg"><FiLogOut /> Log Out</button>

            </>
        </div>
    );
};

export default Dashboard;