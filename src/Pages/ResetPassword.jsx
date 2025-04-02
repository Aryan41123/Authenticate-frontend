import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContent } from '../Context/AppContext';

const ResetPassword = () => {
  axios.defaults.withCredentials = true;
  const { backenUrl, setIslogin, getUserData } = useContext(AppContent)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newpass, setNewPass] = useState('')
  const inputRef = React.useRef([]);
  const [otp, setOtp] = useState('')
  const [isOtpSubmit, setIsOtpSubmit] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

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
  const handlemailSubmit = async (e) => {
    e.preventDefault();

    try {
      const otpArray = inputRef.current.map(e => e.value)
      const otp = otpArray.join('')
      console.log(otp);
      const res = await axios.post(backenUrl + '/api/auth/resetOtp', { email })
      if (res.data.success) {
        setIsEmailSent(true)
      } else {
        console.log(res.data.message);
      }

    } catch (error) {
      console.error(error);
    }
  }
  const handleOtpSubmmit = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRef.current.map(e => e.value)
      const otp = otpArray.join('')
      console.log(otp);
      setOtp(otp)
      setIsOtpSubmit(true)

    } catch (error) {
      console.error(error);
    }
  }

  const handlePassSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(backenUrl + '/api/auth/reset-pass', { email, newpass, otp })
      if (res.data.success) {
        console.log("password succesfully reset");
        alert("password succesfully reset");
        navigate('/login')
        setIslogin(false)
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
      {!isEmailSent &&
        <form onSubmit={handlemailSubmit} action="" className="bg-slate-900 rounded-lg shadow-lg w-96 text-sm p-8">
          <h1 className="text-white text-2xl mt-5 font-semibold mb-4 text-center">Reset Password</h1>
          <p className="text-center mb-6 text-indigo-300">Enter Your Registered Email</p>
          <div className="mb-4 border border-white text-white flex items-center w-full px-5 rounded-full py-2.5 gap-3 bg-[#333A5C">
            <img src={assets.mail_icon} alt="" />
            <input onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='Enter Email Address' value={email} className='outline-none' required />
          </div>
          <button class="text-white mt-2 w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 hover:from-indigo-700 hover:to-indigo-1100 active:scale-95 transform transition duration-200 ease-in-out">
            Send
          </button>

        </form>

      }

      {isOtpSubmit &&

        <form onSubmit={handlePassSubmit} action="" className="bg-slate-900 rounded-lg shadow-lg w-96 text-sm p-8">
          <h1 className="text-white text-2xl mt-5 font-semibold mb-4 text-center">Enter New Password</h1>
          <p className="text-center mb-6 text-indigo-300">Enter Password</p>
          <div className="mb-4 border border-white text-white flex items-center w-full px-5 rounded-full py-2.5 gap-3 bg-[#333A5C">
            <img src={assets.lock_icon} alt="" />
            <input onChange={(e) => { setNewPass(e.target.value) }} type="password" placeholder='Enter New Password' value={newpass} className='outline-none' required />
          </div>
          <button className='text-white mt-2 w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900'>Submit</button>
        </form>

      }
      {isEmailSent && !isOtpSubmit &&

        <form onSubmit={handleOtpSubmmit} className="bg-slate-900 rounded-lg shadow-lg w-96 text-sm p-8">
          <h1 className="text-white text-2xl mt-5 font-semibold mb-4 text-center"> Password Reset Otp</h1>
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
            Submit
          </button>
        </form>
      }

    </div>
  )
}

export default ResetPassword
