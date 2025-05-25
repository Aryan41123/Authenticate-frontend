import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../Context/AppContext'
import axios from 'axios'
import { data, useNavigate } from 'react-router-dom'

const Login = () => {

    const { backenUrl, setIslogin, getUserData } = useContext(AppContent)
    const [state, setState] = useState('sign up')
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onSubmitHandle = async (e) => {
        try {

            e.preventDefault();
            if (state == 'sign up') {
                const { data } = await axios.post(backenUrl + '/api/auth/register', { name, email, password })
                if (data.success) {
                    setIslogin(true)
                    getUserData()
                    navigate('/')

                } else {
                    alert(data.message)
                }
            }
            else {
                const res = await axios.post(backenUrl + '/api/auth/login', { email, password })

                if (res.data.success) {
                    setIslogin(true);
                    getUserData();
                    navigate('/');
                } else {
                    console.log("hello");
                    alert(res.data.message);
                }
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
            <img onClick={()=>navigate('/')} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' src={assets.logo} alt="" />
            <div className="bg-slate-800 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                <h2 className='text-3xl text-center font-semibold text-white'>{state === 'sign up' ? 'Create  account' : 'login'}</h2>
                <p className='text-center text-sm mb-6'>{state === 'sign up' ? 'Create your account' : 'login to your account'}</p>
                <form action="" onSubmit={onSubmitHandle}>
                    {state === 'sign up' && (
                        <>

                            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c] ">
                                <img src={assets.person_icon} alt="" />
                                <input onChange={(e) => setName(e.target.value)} className='bg-transparent outline-none' type="text" placeholder='Full Name' value={name} required />
                            </div>
                        </>
                    )}
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c] ">
                        <img src={assets.mail_icon} alt="" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-transparent outline-none' type="text" placeholder='E-mail' required />
                    </div>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c] ">
                        <img src={assets.lock_icon} alt="" />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-transparent outline-none' type="text" placeholder='Password' required />
                    </div>
                    <p onClick={() => navigate('/forgot-password')} className='text-end cursor-pointer'>Forgot Password?</p>
                    <button className="text-white mt-2 w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 hover:from-indigo-700 hover:to-indigo-1100 active:from-indigo-500 active:to-indigo-400 transition-all duration-300 ease-in-out">
                        {state}
                    </button>

                    {state == 'sign up' ? (<p className='text-gray-400 text-center text-xs mt-4'>Already Have an account?{' '}
                        <span onClick={() => { setState('login') }} className='text-blue-400 cursor-pointer underline'>Login Here</span>
                    </p>) : (<p onClick={() => { setState('sign up') }} className='text-center text-gray-400 text-xs mt-4'>Dont't Have an account?{' '}
                        <span className='text-blue-400 cursor-pointer underline'>Sign up</span>
                    </p>)}

                </form>
            </div>
        </div>

    )
}

export default Login
