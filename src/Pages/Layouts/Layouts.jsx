import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../Common/Nav/Nav';
import Footer from '../../Common/Footer/Footer';
import useCurrentUser from '../../Utils/Hooks/userCurrentUser';
import Loader from '../../Shared/Loader/Loader';

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