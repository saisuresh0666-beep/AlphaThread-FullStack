import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";

const Cart = () => {
 const { products, currency, cartItems, updateQuantity, navigate, backendUrl } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="px-4 sm:px-10 md:px-20 py-10">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      {cartData.length === 0 && (
        <p className="text-gray-500">Cart looks lonely.....</p>
      )}

      <div className="flex flex-col gap-6">
        {cartData.map((item, index) => {
          const product = products.find(p => p._id === item._id);
          if (!product) return null;

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6"
            >
              {/* Left */}
              <div className="flex gap-4">
                <img
                  src={product.images[0]}

                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="sm:hidden mt-1">
                    {currency}{product.price}.00
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex justify-between sm:gap-10 items-center">
                <p className="hidden sm:block">
                  {currency}{product.price}.00
                </p>

                <div className="flex items-center border rounded">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity - 1)
                    }
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    -
                  </button>

                  <span className="px-4">{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity + 1)
                    }
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold">
                  {currency}{product.price * item.quantity}
                </p>

                <button
                  onClick={() =>
                    updateQuantity(item._id, item.size, 0)
                  }
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
              
            </div>

          );
        })}
      </div>
<div className="w-full min-h-screen px-4 sm:px-10 md:px-20">
  <div className="flex justify-end items-end h-full">
    <div className="flex flex-col gap-4 max-w-sm w-full mb-6">
      
      <CartTotal />

      <button onClick={()=>navigate('/place-order')} className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition">
        CHECKOUT
      </button>

    </div>
  </div>
</div>



    </div>
  );
};

export default Cart;
