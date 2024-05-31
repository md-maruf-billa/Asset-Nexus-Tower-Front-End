import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../Common/Nav/Nav';
import Footer from '../../Common/Footer/Footer';

const Layouts = () => {
    return (
        <div>
            <Nav/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layouts;