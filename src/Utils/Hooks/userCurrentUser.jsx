import React, { useContext } from 'react';
import { userInfoContext } from '../../Pages/Firebase/UserAuth';

const userCurrentUser = () => {
    const userInfo = useContext(userInfoContext);
    return userInfo;
};

export default userCurrentUser;