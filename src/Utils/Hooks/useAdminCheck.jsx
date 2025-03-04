import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import Loader from "../../Shared/Loader/Loader";


const useAdminCheck = () => {
    const axiosSecure = useAxiosSecure();
    const { data: role=[] , isLoading } = useQuery({
        queryKey: ["user role"],
        queryFn: async () => {
            const result = await axiosSecure(`/verify-role`);
            return result.data
        }
    })
    if (isLoading) {
        return <Loader />
    }
    const userRole = role.userType;
    return userRole;



};

export default useAdminCheck;

