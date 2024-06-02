import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// BANNER IMAGE
import hrBanner from '../../assets/images/Banner/Hr banner.png'
import employeeBanner from '../../assets/images/Banner/Employee.png'
import Button from '../../Shared/Button/Button';
import { Link } from 'react-router-dom';

const Slider = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide
                className='min-h-[700px] bg-no-repeat px-5 md:px-20'
                style={{ backgroundImage: `url(${hrBanner})` }}>

                <div className='flex justify-end items-center min-h-[700px] '>
                    <div className='text-white flex flex-col gap-5 text-center'>
                        <h2 className='text-4xl lg:text-7xl font-bold text-center'>Welcome <br />  Asset Nexus Tower</h2>
                        <p className='text-xl'>
                            Unlocking Potential, Building Futures: Join the Team at Asset Nexus Tower
                        </p>

                        <Link to={"/registration"} ><Button btnName={"Join as Employee"} /></Link>
                    </div>
                </div>

            </SwiperSlide>
            <SwiperSlide
                className='min-h-[700px] bg-no-repeat px-5 md:px-20'
                style={{ backgroundImage: `url(${employeeBanner})` }}>

                <div className='flex justify-end items-center min-h-[700px] '>
                    <div className='text-black  flex flex-col gap-5  text-center'>
                        <h2 className='text-4xl lg:text-7xl font-bold text-center'>Welcome <br />  Asset Nexus Tower</h2>
                        <p className='text-xl'>
                            Unlocking Potential, Building Futures: Join the Team at Asset Nexus Tower
                        </p>

                        <Link to={"/registration"}><Button btnName={"Join as HR Manager"} /></Link>
                    </div>
                </div>

            </SwiperSlide>


            


        </Swiper>
    );
};

export default Slider;