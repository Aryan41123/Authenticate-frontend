import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { AppContent } from '../Context/AppContext';
import { assets } from '../assets/assets';

const ChangePassword = () => {
    const { backenUrl, Email, otp } = useContext(AppContent);
    const navigate = useNavigate();
    const location = useLocation();


    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(`${backenUrl}/api/auth/reset-pass`, {
                email: Email,
                newpass: password,
                otp
            });
            setMessage(response.data.message);
            // Redirect to login page or success message
            navigate('/login');
        } catch (error) {
            console.error(error);
            setMessage("Failed to reset password. Try again.");
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
            <img onClick={()=>navigate('/')} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' src={assets.logo} alt="Logo" />
            <div className="bg-slate-800 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                <h2 className='text-3xl text-center font-semibold text-white mb-6'>Reset Password</h2>
                <form onSubmit={handleReset}>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
                        <img src={assets.lock_icon} alt="" />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-transparent outline-none w-full"
                        />
                    </div>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
                        <img src={assets.lock_icon} alt="" />
                        <input
                            type="password"
                            placeholder="Re-enter Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="bg-transparent outline-none w-full"
                        />
                    </div>
                    <button className="text-white mt-2 w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 hover:from-indigo-700 hover:to-indigo-1100 active:from-indigo-500 active:to-indigo-400 transition-all duration-300 ease-in-out">
                        Reset Password
                    </button>
                    {message && <p className="text-center text-sm mt-4 text-white">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
