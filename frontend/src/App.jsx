import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './component/navBar'
import './App.css'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import ProtectedRoute from './component/ProtectedRoute'
import CheckOutPage from './pages/CheckOutPage'
import SuccessPage from './pages/SuccessPage'
import MyOrdersPage from './pages/MyOrdersPage'
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckOutPage />} />
          <Route path='/success' element={<SuccessPage />} />
          <Route path='/my-orders' element={<MyOrdersPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
