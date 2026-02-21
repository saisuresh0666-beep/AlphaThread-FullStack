import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className="h-full bg-white p-4">
      
      <NavLink
        to="/add"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
           ${
             isActive
               ? 'bg-gray-900 text-white'
               : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
           }`
        }
      >
        <img
          src={assets.add_icon}
          alt="add"
          className="w-5 h-5"
        />
        <p>Add Items</p>
      </NavLink>
      <NavLink
        to="/list"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
           ${
             isActive
               ? 'bg-gray-900 text-white'
               : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
           }`
        }
      >
        <img
          src={assets.order_icon}
          alt="list"
          className="w-5 h-5"
        />
        <p>List Items</p>
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
           ${
             isActive
               ? 'bg-gray-900 text-white'
               : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
           }`
        }
      >
        <img
          src={assets.order_icon}
          alt="order"
          className="w-5 h-5"
        />
        <p>Orders</p>
      </NavLink>

    </div>
  )
}

export default Sidebar
