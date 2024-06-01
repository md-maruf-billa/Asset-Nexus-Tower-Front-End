import React, { useContext } from 'react';
import { userInfoContext } from '../../Pages/Firebase/UserAuth';

const useCurrentUser = () => {
    const userInfo = useContext(userInfoContext);
    return userInfo;
};

export default useCurrentUser;