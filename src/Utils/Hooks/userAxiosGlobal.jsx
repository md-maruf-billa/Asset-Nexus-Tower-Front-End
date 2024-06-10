import React from 'react';
import axios from 'axios';



const userAxiosGlobal = () => {
    const axiosGlobal = axios.create({
        baseURL:import.meta.env.VITE_BASE_URL,
    })
    return axiosGlobal;
};

export default userAxiosGlobal;