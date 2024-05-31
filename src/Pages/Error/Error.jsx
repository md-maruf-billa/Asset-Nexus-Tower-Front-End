import React from 'react';
import Lottie from "lottie-react";
import animation1 from '../../assets/Animation/animation1.json'
import Button from '../../Shared/Button/Button';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='h-screen flex justify-center items-center flex-col gap-10'>
            <Lottie animationData={animation1}></Lottie>
            <Link to="/"> <Button btnName={"Go Back"} /></Link>
        </div>
    );
};

export default Error;