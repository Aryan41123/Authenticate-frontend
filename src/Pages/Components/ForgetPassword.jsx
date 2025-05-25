import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { AppContent } from '../../Context/AppContext';

const ForgotPassword = () => {
    const { backenUrl, Email, setEmail } = useContext(AppContent);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backenUrl}/api/auth/resetOtp`, { email: Email });
            setMessage(response.data.message);
            navigate('/verify-reset-otp');
        } catch (error) {
            setMessage('Something went wrong. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
            <img onClick={()=>navigate('/')} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' src={assets.logo} alt="" />
            <div className="bg-slate-800 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                <h2 className='text-3xl text-center font-semibold text-white mb-6'>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
                        <img src={assets.mail_icon} alt="" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-transparent outline-none w-full"
                        />
                    </div>
                    <button className="text-white mt-2 w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 hover:from-indigo-700 hover:to-indigo-1100 active:from-indigo-500 active:to-indigo-400 transition-all duration-300 ease-in-out">
                        Send Reset Link
                    </button>
                    {message && <p className="text-center text-sm mt-4 text-white">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
