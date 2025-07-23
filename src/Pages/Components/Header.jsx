import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AppContent } from '../../Context/AppContext'

const Header = () => {
    const { userData, islogin } = useContext(AppContent)
    const [started, setStarted] = useState(false)

    return (
        <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
            {/* Always show the image */}
            <img src={assets.header_img} className='w-36 h-36 rounded-full mb-6' alt="" />

            {started ? (
                <p className='text-2xl sm:text-3xl font-semibold text-green-600'>
                    We are ready to serve you!
                </p>
            ) : (
                <>
                    <h1 className='flex items-center text-xl sm:text-3xl font-medium mb-2'>
                        Hey {userData ? userData.name : 'Developer'}
                        <img className='w-8 aspect-square ml-2' src={assets.hand_wave} alt="" />
                    </h1>
                    <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to Our app.</h2>
                    <button 
                        className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'
                        onClick={() => setStarted(true)}
                    >
                        Get Started
                    </button>
                </>
            )}
        </div>
    )
}

export default Header
