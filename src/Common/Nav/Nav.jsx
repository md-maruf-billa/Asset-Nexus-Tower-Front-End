import React from 'react';
import { NavLink , Link} from 'react-router-dom'
const Nav = () => {






    // COMMON NAV LINK
    const navLink = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/h">Join Us</NavLink></li>
        <li><NavLink to="/s">HELE</NavLink></li>
        <li><NavLink to="/f">BEBE</NavLink></li>
    </>
    return (
        <div className='container mx-auto'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLink}
                        </ul>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img className='size-[60px]' src="/logo.png" alt="" />
                        <a className="text-3xl">ANT</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLink}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to="/login" className="btn">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Nav;