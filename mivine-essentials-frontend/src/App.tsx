import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'
import { Toaster } from "sonner"
import Login from './Pages/Login'
import RegisterPage from './Pages/RegisterPage'
import ProfilePage from './Pages/ProfilePage'
import CollectionPages from './Pages/CollectionPages'
import ProductDetails from './Components/Products/ProductDetails'
import CheckOut from './Components/Cart/CheckOut'
import OrderConfirmationPage from './Pages/OrderConfirmationPage'
import OrderDetailsPage from './Pages/OrderDetailsPage'
import MyOrderPage from './Pages/MyOrderPage'
import AdminLayout from './Components/Admin/AdminLayout'
import AdminHomePage from './Pages/AdminHomePage'
import UserManagement from './Components/Admin/UserManagement'
import ProductManagement from './Components/Admin/ProductManagement'
import EditProductPage from './Components/Admin/EditProductPage'
import OrderManagement from './Components/Admin/OrderManagement'

import { Provider } from 'react-redux'
import store from './Redux/Store'
import ProtectedRoute from './Components/Common/ProtectedRoute'

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Toaster position="top-right"/>
    <Routes>
      {/* User Layout */}
      <Route path='/login' element={<Login />} /> 
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/' element={<UserLayout />}> 
      <Route index element={<Home />} />
      <Route path='profile' element={<ProfilePage />} />
      <Route path='collections/:collection' element={<CollectionPages />} />
      <Route path='products/:id' element={<ProductDetails />} />
      <Route path='checkout' element={<CheckOut />} />
      <Route path='/order-confirmation/:id' element={<OrderConfirmationPage />} />
      <Route path='order/:id' element={<OrderDetailsPage />} />
      <Route path='my-orders' element={<MyOrderPage />} />
      </Route>
      {/* User Layout */}


      {/* Admin Layout */}
      <Route path='/admin' element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}> 
      <Route index element={<AdminHomePage />} />
      <Route path='users' element={<UserManagement />}/>
      <Route path='products' element={<ProductManagement />} />
      <Route path='products/:id/edit' element={<EditProductPage />} />
      <Route path='orders' element={<OrderManagement />} />
      </Route>
      {/* Admin Layout */}
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App