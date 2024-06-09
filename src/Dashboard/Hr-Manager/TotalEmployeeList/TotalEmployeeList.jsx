import React from 'react';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';
import { useQuery } from '@tanstack/react-query';

const TotalEmployeeList = () => {
    const axiosSecure = useAxiosSecure();
    const {currentUser} = useCurrentUser();

    const {data,isLoading} = useQuery({
        queryKey:["loaded Employee by hr email"],
        queryFn: async ()=>{
            const result = await axiosSecure(`/current-hr-employee/${currentUser.email}`)
            return result.data;
        }
    })
    return (
        <div>
            <h1>{data?.length}</h1>
        </div>
    );
};

export default TotalEmployeeList;