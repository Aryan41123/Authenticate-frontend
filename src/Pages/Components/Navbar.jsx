import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../../Context/AppContext';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, islogin, setIslogin, setUserData, getUserData, backenUrl } = useContext(AppContent);


  const senverifyOtp = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backenUrl + '/api/auth/send-verifyOtp')
      if (data.success) {
        navigate('/email-verify')
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(backenUrl + '/api/auth/logout')
      data.success && setIslogin(false)
      data.success && setUserData(false)
    } catch (error) {
      console.log(error.message);
    }


  };

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={assets.logo} alt="Logo" className='w-28 sm:w-32' />

      {userData ? (
        <div className='relative'>
          <div className='w-8 h-8 flex justify-center items-center rounded-full text-white bg-black group cursor-pointer'>
            {userData.name[0].toUpperCase()}

          
            <div className="absolute hidden group-hover:block top-10 right-0 z-10 text-black pt-2 rounded">
              <ul className='list-none m-0 p-2 bg-green-100 text-xs'>
                {!userData.isAccountVerified && <li onClick={senverifyOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>}
                <li
                  className='py-1 px-2 hover:bg-gray-200 cursor-pointer'
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-600 transition-all hover:bg-gray-100'>
          Login <img src={assets.arrow_icon} alt="Arrow" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
