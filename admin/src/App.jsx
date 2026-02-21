import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
 import { ToastContainer} from 'react-toastify';
 import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react'

export const backEndUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'
const App = () => {
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');


useEffect(()=>{
   localStorage.setItem('token',token)
},[token])
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer/>
      {token === ""
      ? <Login setToken={setToken}/>:
      
      <>
      {/* Navbar */}
      <Navbar setToken={setToken}/>
      <hr className="border-gray-200" />

      {/* Main Layout */}
      <div className="flex">
        
        {/* Sidebar */}
        <div className="w-64 min-h-[calc(100vh-64px)] bg-white border-r shadow-sm">
          <Sidebar />
     
         
      
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Your main content goes here */}
             <Routes>
              <Route path='/add' element={<Add token={token}/>}/>
              <Route path='/list' element={<List token={token}/>}/>
              <Route path='/orders' element={<Orders token={token}/>}/>
            </Routes>
        </div>

      </div>
      </>
      }
    </div>
    
  )
}

export default App
