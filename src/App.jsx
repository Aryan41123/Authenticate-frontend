import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import EmailVerify from './Pages/EmailVerify'
import ResetPassword from './Pages/ResetPassword'
import { AppContent } from './Context/AppContext'


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
      </Routes>
    </div>
  )
}

export default App
