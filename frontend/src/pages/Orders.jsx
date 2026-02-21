import React, { useContext, useState } from 'react'
import Title from '../components/title'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react'
import axios from 'axios'

const Orders = () => {
  const { token, currency,backendUrl,navigate } = useContext(ShopContext)
  const [orderData,setOrderData] = useState([])

  const loadOrderData = async () => {
    try{
      if(!token){
        return null
      }
const response = await axios.post(backendUrl+'/api/order/userorder',{},{headers:{token}})
if(response.data.success){
  let allOrdersitem = []
  response.data.orders.map((order)=>{
order.items.map((item)=>{
  item["status"] = order.status
  item['payment'] = order.payment
  item['paymentMethod'] = order.PaymentMethod
  item['date'] = order.date
  allOrdersitem.push(item)
})
  })
  
  setOrderData(allOrdersitem.reverse())
}
    }catch(err){
      console.log(err)

    }
  }

  useEffect(()=>{
    loadOrderData()

  },[token])

  return (
   <div className="border-t border-black/10 pt-16">

  <div className="mb-10">
    <div className="text-2xl tracking-tight">
      <Title text1={"MY"} text2={"ORDERS"} />
    </div>
  </div>

  {orderData.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
      <button 
        onClick={() => navigate('/collection')} 
        className="mt-4 bg-black text-white px-8 py-2 text-sm"
      >
        SHOP NOW
      </button>
    </div>
) : (
    // Map through your orders here
    orderData.map((item, index) => (
      <div
        key={index}
        className="border border-black/10 rounded-sm px-6 py-5
                   flex flex-col md:flex-row md:items-center
                   md:justify-between gap-6"
      >

        {/* Left: Product */}
        <div className="flex items-start gap-6 text-sm">
          <img
            className="w-16 sm:w-20 object-cover rounded-sm border border-black/10"
            src={item.images[0]}
            alt={item.name}
          />

          <div>
            <p className="text-sm sm:text-base font-medium text-gray-900">
              {item.name}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs sm:text-sm text-gray-600">
              <p>{currency}{item.price}</p>
              <p>Qty: {item.quantity}</p>
              <p>Size: {item.size}</p>
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Ordered on {new Date(item.date).toDateString()}

            </p>
            <p className="mt-1 text-xs text-gray-400">
              payment: {item.paymentMethod}

            </p>
          </div>
        </div>

        {/* Right: Status & Action */}
        <div className="flex items-center justify-between md:justify-end gap-6">

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <p className="text-xs sm:text-sm text-gray-700">
              {item.status}
            </p>
          </div>

          <button onClick={loadOrderData}
            className="border border-black/20 px-5 py-2
                       text-xs sm:text-sm font-medium tracking-wide
                       rounded-sm
                       hover:bg-black hover:text-white
                       transition"
          >
            Track Order
          </button>

        </div>

      </div>
    )))}
  </div>



  )
}

export default Orders