import React, { useState } from 'react'
import { backEndUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = ({setToken}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    const onSubmitHandler = async (e) => {
        try{
e.preventDefault();

const response = await axios.post(backEndUrl+'/api/user/admin',{email,password})
if(response.data.success){
  setToken(response.data.token);
 
}else{
  toast.error(response.data.message);
}
        }catch(err){
            console.log(err);
toast.error(err.response.data.message)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Admin Panel
        </h1>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
            onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
            onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium transition hover:bg-gray-800 active:scale-95"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  )
}

export default Login
