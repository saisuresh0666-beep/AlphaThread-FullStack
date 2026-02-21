import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'
const Login = () => {

  const [currentState, setCurrentstate] = useState('Login')
  
  const navigate = useNavigate();  // ✅ correct
  const { token, setToken, backendUrl } = useContext(ShopContext)

  const[name,setName] = useState('')
  const[password,setPassword] = useState('')
  const[email,setEmail] = useState('')
  

const onSubmitHandler = async (event) =>{

  event.preventDefault();
  try{
if(currentState=== "Sign Up"){

  const response = await axios.post(backendUrl+"/api/user/register/",{name,email,password})
if(response.data.success){
  setToken(response.data.token)
  localStorage.setItem("token",response.data.token)
}else{
  toast.error(response.data.message)
}
}else{
  const response = await axios.post(backendUrl+"/api/user/login/",{email,password})
  if(response.data.success){
    setToken(response.data.token)
  localStorage.setItem("token",response.data.token)
  }else{
    toast.error(response.data.message)
  }
}
  }catch(err){
    console.log(err)
    toast.error(err.message)
  }
  

}
useEffect(()=>{
  if(token){
    navigate('/')
  }

},[token])

  return (
    <form onSubmit={onSubmitHandler}  className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl font-semibold'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? "" : (
        <input onChange={(e)=>setName(e.target.value)}
          type='text' 
          className='w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400' 
          placeholder='Name' 
          required 
        />
      )}
      
      <input onChange={(e)=>setEmail(e.target.value)}
        type='email' 
        className='w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400' 
        placeholder='Email' 
        required 
      />
      
      <input onChange={(e)=>setPassword(e.target.value)}
        type='password' 
        className='w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400' 
        placeholder='Password' 
        required 
      />

      <div className='w-full flex justify-between text-sm mt-[-8px] text-gray-600'>
        <p className='cursor-pointer hover:text-black transition-colors'>Forgot your password?</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentstate('Sign Up')} className='cursor-pointer hover:text-black transition-colors'>Create Account</p>
            : <p onClick={() => setCurrentstate('Login')} className='cursor-pointer hover:text-black transition-colors'>Login Here</p>
        }
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4 active:bg-gray-700 transition-all duration-300'>
        {currentState === "Login" ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login