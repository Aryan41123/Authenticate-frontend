import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials=true
    const backenUrl = import.meta.env.VITE_BACKEND_URL;
    const [islogin, setIslogin] = useState(false);
    const [userData, setUserData] = useState(false);

    // Get user data function
    const getUserData = async () => {
        try {
            console.log("Fetching user data...");
            const res = await axios.get(backenUrl + '/api/user/getUser');

            console.log("Response Data:", res.data); // Log response for debugging

            if (res.data.success) {
                setUserData(res.data.userData);
                setIslogin(true);  // Set login status to true
            } else {
                const errorMessage = res.data.message || 'Unknown error occurred';
                alert(errorMessage);
              
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('An error occurred while fetching user data.');
        }
    };
    const getUserAuth = async () => {
        try {
            const { data } = await axios.post(backenUrl + '/api/auth/userAuth')
            if (data.success) {
                setIslogin(true)
                getUserData()
            }

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        getUserAuth()
    }, [])

    // Context value to be passed down to components
    const value = {
        backenUrl,
        islogin,
        setIslogin,
        userData,
        setUserData,
        getUserData,
    };



    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );
}
