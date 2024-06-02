import React from 'react';
import { Outlet } from 'react-router-dom';
import useCurrentUser from '../../Utils/Hooks/userCurrentUser';
import Loader from '../../Shared/Loader/Loader';
import Nav from './../../Components/Nav/Nav';
import Footer from './../../Components/Footer/Footer';

const Layouts = () => {
    const { loading } = useCurrentUser();

    return (

        <>
            {
                loading ? <Loader /> :
                    <div>
                        <Nav />
                        <div className='min-h-screen'>
                            <Outlet />
                        </div>
                        <Footer />
                    </div>
            }
        </>

    );

};

export default Layouts;