import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Loader, LogOut } from 'lucide-react';
import { auth } from '../firebase';
import { useUser } from '../contexts/userContext';
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";

const LoginBtn = () => {
    const { user, loading } = useUser(); // Update this to destructure user from the context

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                toast.success(`Logged in as ${user.displayName}.`);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(`${errorCode}: ${errorMessage}`);
            });
    };

    const logOut = () => {
        signOut(auth)
            .then(() => {
                toast.success("Logged out successfully.");
            })
            .catch((error) => {
                toast.error(`Logout failed: ${error.message}`);
            });
    };

    return (
        loading ?
            <button disabled className='flex items-center bg-gray-500 px-4 py-2 rounded-lg text-gray-100 shadow-md'>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Please wait...
            </button>
            :
            user ? (
                <div className='flex gap-2 items-center'>
                    <img src={user?.photoURL} alt={user.displayName} title={user.displayName} className='w-8 h-8 rounded-full bg-gray-100 shadow-md' />
                    <button onClick={logOut} className='flex items-center bg-red-500 px-4 py-2 rounded-lg text-white shadow-md'>
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <button onClick={googleLogin} className='flex items-center gap-2 px-4 py-3 rounded-lg backdrop-blur-sm border text-gray-700 shadow-md hover:shadow-inner'>
                Continue with
                    <FcGoogle />
                </button>
            )
    );
};

export default LoginBtn;
