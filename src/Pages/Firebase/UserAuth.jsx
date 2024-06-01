import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import auth from './firebase.config';
import userAxiosGlobal from './../../Utils/Hooks/userAxiosGlobal';



// CONTEXT HARE
export const userInfoContext = createContext(null);


// SOCIAL ACCOUNT PROVIDER 

const googleProvider = new GoogleAuthProvider();




const UserAuth = ({ children }) => {
    // LOADED API
    const axiosGlobal = userAxiosGlobal();

    // NECESSARY STATE
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState([]);

    //LOGIN WITH GOOGLE ACCOUNT
    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    // CREATE WITH EMAIL AND PASSWORD
    const createAccountWithPassword = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // LOGIN WITH EMAIL AND PASSWORD
    const loginWithPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // LOG OUT USER
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }



    // OBSERVER STATE 
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const data = { email: user.email }
                setCurrentUser(user);
                axiosGlobal.post("/verify-user", data)
                    .then(data => {
                        localStorage.setItem("access-token", data?.data?.token);
                        setLoading(false);

                    })
            }
            else {
                setCurrentUser([])
                setLoading(false)
            }

        })
    }, [loading])

    const userInfo = {
        currentUser,
        loginWithGoogle,
        createAccountWithPassword,
        loginWithPassword,
        logOut,
        loading

    }
    return (
        <userInfoContext.Provider value={userInfo}>
            {children}
        </userInfoContext.Provider>
    );
};

export default UserAuth;