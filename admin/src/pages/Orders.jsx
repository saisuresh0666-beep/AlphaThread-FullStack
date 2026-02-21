import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backEndUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(backEndUrl + '/api/order/list', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.success) {
        console.log("Orders received:", response.data.orders)
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const statusHandler = async (event,orderId) => {
    try {

      const response = await axios.post(backEndUrl+'/api/order/status',{orderId,status:event.target.value},{
        headers: { Authorization: `Bearer ${token}` }
      })
      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
       toast.error(error.message)
      
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className='p-5'>
      <h3 className='text-xl font-bold mb-4'>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div 
            key={index} 
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-300 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 bg-white rounded-lg shadow-sm'
          >
            {/* Column 1: Icon */}
            <img className='w-12' src={assets.parcel_icon} alt="Parcel Icon" />

            {/* Column 2: Items & Address */}
            <div>
              <div className='font-semibold'>
                {order.items.map((item, itemIndex) => {
                  const isLast = itemIndex === order.items.length - 1;
                  return (
                    <p key={itemIndex} className='py-0.5'>
                      {item.name} x {item.quantity} <span className='text-gray-400'>({item.size})</span>
                      {isLast ? "" : ","}
                    </p>
                  );
                })}
              </div>
              <p className='mt-3 mb-1 font-bold text-gray-900'>
                {order.address?.firstName || order.address?.firstname} {order.address?.lastName || order.address?.lastname}
              </p>
              <div className='text-gray-600'>
                <p>{order.address?.street},</p>
                <p>{order.address?.city + ", " + order.address?.state + ", " + order.address?.country + ", " + order.address?.zipcode}</p>
              </div>
              <p className='mt-2 italic'>{order.address?.phone}</p>
            </div>

            {/* Column 3: Stats */}
            <div className='flex flex-col gap-1'>
              <p className='text-sm sm:text-[15px] font-medium'>Items: {order.items.length}</p>
              <p>Method: <span className='uppercase'>{order.paymentMethod}</span></p>
              <p>Payment: 
                <span className={order.payment ? 'text-green-600 ml-1' : 'text-red-500 ml-1'}>
                  {order.payment ? 'Done' : 'Pending'}
                </span>
              </p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Column 4: Price */}
            <p className='text-sm sm:text-[15px] font-bold text-gray-900'>
              {currency}{order.amount}
            </p>

            {/* Column 5: Status Dropdown */}
            <select 
              className='p-2 font-semibold border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none'
             onChange={(event)=>statusHandler(event,order._id)} value={order.status}
            >
              <option  value="Order Placed">Order Placed</option>
              <option  value="Packing">Packing</option>
              <option  value="Shipped">Shipped</option>
              <option  value="Out For Delivery">Out For Delivery</option>
              <option  value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  ) 
}

export default Orders // Ensure this is exactly like this at the end