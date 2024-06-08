import React from 'react';
import Slider from '../../Components/Slider/Slider';
import Pricing from '../../Components/Pricing/Pricing';
import AboutUs from '../../Components/AboutUs/AboutUs';
import AllCompany from '../../Components/AllCompany/AllCompany';
import Button from '../../Shared/Button/Button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* BANNER */}
            <Slider />


            <div className='px-2'>
                {/* ABOUT SECTION */}
                <AboutUs />



                {/* PACKAGE SECTION */}
                <Pricing />

                {/* ALL COMPANY */}
                <AllCompany />
                <div className='flex justify-center items-center mt-8'>
                    
                    <Link >
                        <Button btnName={"See All Company"} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;