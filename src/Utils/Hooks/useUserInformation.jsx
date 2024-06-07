import React from 'react';
import useCurrentUser from './userCurrentUser';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserInformation = () => {
    const { currentUser } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const { data: userInformation, isLoading } = useQuery({
        queryKey: ["Get user all information"],
        queryFn: async () => {
            const result = await axiosSecure.get(`/user-info/${currentUser?.email}`);
            return result.data;
        }
    })
    if (isLoading) return;
    return userInformation;

};

export default useUserInformation;