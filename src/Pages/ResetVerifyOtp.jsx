import React, { useRef, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../assets/assets';
import { AppContent } from '../Context/AppContext';

const ResetVerifyOtp = () => {
    const navigate = useNavigate();
    const { backenUrl, Email, setOtp } = useContext(AppContent);
    const location = useLocation(); // to get email passed from previous step
    const inputRef = useRef([]);
    const [resendMessage, setResendMessage] = useState('');


    const handleInput = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = value;
        if (value && index < 5) inputRef.current[index + 1].focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text').replace(/\D/g, '');
        paste.split('').forEach((char, index) => {
            if (inputRef.current[index]) inputRef.current[index].value = char;
        });
    };

    const isOtpComplete = () =>
        inputRef.current.every((input) => input?.value?.trim() !== '');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!isOtpComplete()) return alert('Please enter the full OTP');

        const otp = inputRef.current.map((e) => e.value).join('');

        try {
            console.log(Email);
            console.log(otp);
            const res = await axios.post(`${backenUrl}/api/auth/verify-resOp`, { email: Email, otp });
            console.log(res.data);
            setOtp(otp)
            if (res.data.success) {
                navigate('/reset-pass');
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error.message);
            alert('Verification failed.');
        }
    };

    const resendOtp = async () => {
        try {
            const res = await axios.post(`${backenUrl}/api/auth/resetOtp`, { email: Email });
            setResendMessage(res.data.message || 'OTP resent.');
        } catch (err) {
            setResendMessage('Failed to resend OTP.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
            <img
                className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
                src={assets.logo}
                onClick={() => navigate('/')}
                alt="Logo"
            />
            <form onSubmit={onSubmitHandler} className="bg-slate-900 rounded-lg shadow-lg w-96 text-sm p-8">
                <h1 className="text-white text-2xl font-semibold mb-4 text-center">Verify OTP</h1>
                <p className="text-center mb-6 text-indigo-300">Enter the 6-digit OTP sent to your email</p>

                <div className="flex mb-6 justify-between">
                    {Array(6).fill(0).map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => inputRef.current[index] = el}
                            onInput={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 bg-[#333A5C] text-white text-xl text-center rounded-md"
                        />
                    ))}
                </div>

                <button

                    disabled={!isOtpComplete()}
                    className={`w-full py-3 text-white rounded-full mt-4 transition-all duration-300
                        ${isOtpComplete()
                            ? 'bg-gradient-to-r from-indigo-500 to-indigo-900 hover:bg-indigo-700'
                            : 'bg-gray-400 cursor-not-allowed'}
                    `}
                >
                    Verify OTP
                </button>

                <p className="text-center text-sm text-indigo-300 mt-4">
                    Didn’t receive the code?{' '}
                    <span onClick={resendOtp} className="text-blue-400 underline cursor-pointer">
                        Resend OTP
                    </span>
                </p>
                {resendMessage && <p className="text-center mt-2 text-sm text-white">{resendMessage}</p>}
            </form>
        </div>
    );
};

export default ResetVerifyOtp;
