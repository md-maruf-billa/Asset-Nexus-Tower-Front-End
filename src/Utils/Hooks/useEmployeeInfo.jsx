import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useCurrentUser from './userCurrentUser';

const useEmployeeInfo = () => {
    const axiosSecure = useAxiosSecure();
    const {currentUser} = useCurrentUser();
    const {data:employeeInformation=[] , isLoading} = useQuery({
        queryKey:["Employee Data"],
        queryFn: async()=>{
            const result = await axiosSecure(`/employee-info/${currentUser?.email}`);
            return result.data;
        }
    })
    if(isLoading) return;
    return employeeInformation;
};

export default useEmployeeInfo;