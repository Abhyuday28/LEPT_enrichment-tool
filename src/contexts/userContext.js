// UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

// Create a context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for user on page load
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { accessToken, displayName, email, photoURL, uid } = user;
                setUser({ accessToken, displayName, email, photoURL, uid });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook to use user context
export const useUser = () => useContext(UserContext);
