import React from 'react'
import { assets } from "../assets/assets";

const Navbar = ({setToken}) => {
  return (
    <div className="relative flex items-center justify-between px-[5%] py-4 border-b border-white/10">
      
      {/* Left - Logo */}
      <img
        className="w-[max(8%,100px)] object-contain drop-shadow-sm"
        src={assets.logo}
        alt="logo"
      />

      {/* Center - Admin Panel */}
      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg sm:text-xl font-semibold tracking-wide text-slate-700">
        Admin Panel
      </h1>

      {/* Right - Logout */}
      <button onClick={()=>setToken('')} className="rounded-full px-6 py-2 text-xs sm:text-sm font-medium text-slate-600 border border-slate-300 bg-transparent transition-all duration-300 hover:border-slate-400 hover:text-slate-800 active:scale-95">
        Logout
      </button>

    </div>
  )
}

export default Navbar
