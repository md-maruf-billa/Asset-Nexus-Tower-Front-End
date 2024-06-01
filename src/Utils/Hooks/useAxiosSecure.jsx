import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: "http://localhost:7000/",
})

const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem("access-token");
        config.headers.access_token = token;
        return config;
    },
        err => {
            return Promise.reject(err);
        }
    )

    return axiosSecure;
};

export default useAxiosSecure;