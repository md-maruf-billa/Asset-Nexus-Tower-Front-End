import React from 'react';
import Slider from '../../Components/Slider/Slider';
import Pricing from '../../Components/Pricing/Pricing';
import AboutUs from '../../Components/AboutUs/AboutUs';

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
            </div>
        </div>
    );
};

export default Home;