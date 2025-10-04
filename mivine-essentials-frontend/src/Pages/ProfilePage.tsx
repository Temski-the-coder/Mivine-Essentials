import { useDispatch, useSelector } from 'react-redux'
import MyOrderPage from './MyOrderPage'
import type { AppDispatch, RootState } from '../Redux/Store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { clearCart } from '../Redux/Slices/cartSlice'
import { logout } from '../Redux/Slices/authSlice'

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login")
  }
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow mx-auto w-full md:max-w-full p-4 md:p-6'>
        <div className='flex flex-col md:flex-row space-y-6 md:space-x-6 md:space-y-0'>
            {/* left section */}
            <div className='w-full md:w-1/3 lg:w-1/4 rounded-lg shadow-md rouded-lg p-6 space-y-5'>
                <h1 className='text-2xl md:text-3xl font-bold mb-4'>{user?.name}</h1>
                <p className='text-lg text-gray-600 mb-4'>{user?.email}</p>
                <button className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300'>
                    Edit Profile
                </button>

                 <button onClick={handleLogout} className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300'>
                    Logout
                </button>
            </div>

            {/* right section */}
            <div className='flex-1 overflow-hidden'>
               <MyOrderPage />
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage