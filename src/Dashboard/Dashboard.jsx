import React from 'react';
import { FaBookOpenReader, FaHouse, FaUsers } from 'react-icons/fa6';
import { AiFillProduct } from "react-icons/ai";
import { BsMicrosoftTeams } from "react-icons/bs";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { BiMessageSquareEdit } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { RiFunctionAddFill } from "react-icons/ri";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { MdAddBusiness } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
import { IoPersonAdd } from "react-icons/io5";

const Dashboard = () => {
    
    return (
        <div className='max-w-lg bg-gray-200 p-10'>
            {/* ----------DASHBOARD NAVBAR----- */}


            <>
                <NavLink to={"/dashboard"} end className="flex gap-2 items-center p-2 rounded-lg"><FaHouse /> Admin Home</NavLink>
                <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><AiFillProduct /> Assets List</NavLink>
                <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><RiFunctionAddFill />Add an Assets</NavLink>
                <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><BsChatSquareQuoteFill />All Request's</NavLink>
                <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><MdAddBusiness />Custom Requests List</NavLink>
                <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><GiTeamIdea />My Employee List</NavLink>
                <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><IoPersonAdd />Add an Employee</NavLink>
                
            </>

            {/* ------------------FOR EMPLOYEE------------------ */}
            <>
                <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><FaHouse /> Employee Home</NavLink>
                <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><AiFillProduct /> My Assets</NavLink>
                <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><BsMicrosoftTeams /> My Team</NavLink>
                <NavLink to={"/"} className="flex gap-2 items-center p-2 rounded-lg"><VscGitPullRequestGoToChanges /> Request an Assets</NavLink>

            </>

            {/* ---------COMMON LINK------------------------- */}
            <>
                <div className='divider'></div>
                <NavLink to={"student-home"} end className="flex gap-2 items-center p-2 rounded-lg"><BiMessageSquareEdit /> Edit Profile</NavLink>
                <NavLink to={"student-home"} end className="flex gap-2 items-center p-2 rounded-lg"><FiLogOut /> Log Out</NavLink>

            </>
        </div>
    );
};

export default Dashboard;