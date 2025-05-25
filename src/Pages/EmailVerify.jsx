import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContent } from '../Context/AppContext'
import axios from 'axios';
const EmailVerify = () => {
    axios.defaults.withCredentials = true
    const { backenUrl, setIslogin, getUserData, userData } = useContext(AppContent)
    const navigate = useNavigate();
    const inputRef = React.useRef([]);

    // Handle input change (shift focus automatically)
    const handleInput = (e, index) => {
        // If the user enters a value, move to the next input
        if (e.target.value && index < inputRef.current.length - 1) {
            inputRef.current[index + 1].focus();
        }
    };


    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };
    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('');
        pasteArray.forEach((e, index) => {
            if (inputRef.current[index]) {
                inputRef.current[index].value = e;
            }

        });
    }
    const onSubmitHnadler = async (e) => {
        e.preventDefault();
  
        try {
            const otpArray = inputRef.current.map(e => e.value)
            const otp = otpArray.join('')
            console.log(otp);
            const res = await axios.post(backenUrl + '/api/auth/verifyEmail', { otp })
            if (res.data.success) {
                alert('Verified')
                getUserData()
                navigate('/')
            } else {
                console.log(res.data.message);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to bg-purple-400">
            <img 
                className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
                onClick={() => { navigate('/'); }}
                src={assets.logo}
                alt="Logo"
            />
            <form onSubmit={onSubmitHnadler} className="bg-slate-900 rounded-lg shadow-lg w-96 text-sm p-8">
                <h1 className="text-white text-2xl mt-5 font-semibold mb-4 text-center">Email Verify Otp</h1>
                <p className="text-center mb-6 text-indigo-300">Enter 6 digit code sent to your email id</p>
                <div className="flex mb-6 justify-between">
                    {Array(6).fill(0).map((_, index) => (
                        <input
                            ref={e => inputRef.current[index] = e}
                            onInput={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)} // Added keydown handler
                            key={index}
                            onPaste={handlePaste}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 bg-[#333A5C] text-white text-xl text-center rounded-md"
                        />
                    ))}
                </div>
                <button
                    className="w-full py-3 text-white rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 mt-4 hover:bg-indigo-700 transition-all ease-in-out duration-300"
                >
                    Verify Email
                </button>
            </form>


           
        </div>
    );
};

export default EmailVerify;
