import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './component/navBar'
import './App.css'
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
