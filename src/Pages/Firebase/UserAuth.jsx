import React, { createContext, useEffect, useState } from 'react';
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from 'firebase/auth'
import auth from './firebase.config';



// CONTEXT HARE
export const userInfoContext = createContext(null);


// SOCIAL ACCOUNT PROVIDER 

const googleProvider = new GoogleAuthProvider();




const UserAuth = ({children}) => {


    // NECESSARY STATE
    const [loading,  setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});

    //LOGIN WITH GOOGLE ACCOUNT
    const loginWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }






    // OBSERVER STATE 
    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            if(user){
                setCurrentUser(user);
            }
            setLoading(false);
        })
    },[loading])

    const userInfo = {
        currentUser,
        loginWithGoogle
    }
    return (
        <userInfoContext.Provider value={userInfo}>
            {children}
        </userInfoContext.Provider>
    );
};

export default UserAuth;