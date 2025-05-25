import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import EmailVerify from './Pages/EmailVerify'
import ResetPassword from './Pages/ResetPassword'
import { AppContent } from './Context/AppContext'
import ForgotPassword from './Pages/Components/ForgetPassword'
import ResetVerifyOtp from './Pages/ResetVerifyOtp'
import ChangePassword from './Pages/ChnagePassword'


const App = () => {
  const { backenUrl, islogin,setIslogin, getUserData } = useContext(AppContent)
  console.log(islogin);
  return (
    <div className='text-4xl'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route 
          path='/email-verify' 
          element={islogin ? <EmailVerify /> : <Navigate to="/" />} 
        />
        <Route 
          path='/reset-password' 
          element={islogin ? <ResetPassword /> : <Navigate to="/" />} 
        />
        <Route path="/reset-pass" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-otp" element={<ResetVerifyOtp />} />
      </Routes>
    </div>
  )
}

export default App
