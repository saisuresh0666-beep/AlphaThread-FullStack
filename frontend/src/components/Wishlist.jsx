import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { backendUrl, token, currency, fetchWishlist, wishlist, setWishlist } = useContext(ShopContext);
 
  const navigate = useNavigate();

  // 🔥 Fetch Wishlist
  // const fetchWishlist = async () => {
  //   try {
  //     const res = await axios.get(
  //       backendUrl + "/api/wishlist/get",
  //       { headers: { token } }
  //     );

  //     setWishlist(res.data.wishlist || []);
      
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // 🔥 Remove from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        backendUrl + "/api/wishlist/remove",
        {
          data: { productId },
          headers: { token },
        }
      );

      toast.success("Removed from wishlist ❌");

      // update UI instantly
      setWishlist((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  if (token) {
    fetchWishlist();
  } else {
    
  }
}, [token]); 





  return (
    <div className="px-6 md:px-24 py-14">
      <h2 className="text-2xl font-semibold mb-8">
        My Wishlist ❤️
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          
          {wishlist.map((item) => {
            const product = item.productId;
            if (!product) return null;

            return (
              <div
                key={item._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                {/* Image */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-60 object-cover rounded-md cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                />

                {/* Details */}
                <h3 className="mt-4 text-sm font-medium">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {currency} {product.price}
                </p>

                {/* Buttons */}
                <div className="mt-4 flex gap-3">
                  
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="flex-1 bg-black text-white py-2 text-sm rounded-full hover:opacity-90"
                  >
                    View
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="flex-1 border border-red-400 text-red-500 py-2 text-sm rounded-full hover:bg-red-50"
                  >
                    Remove
                  </button>

                </div>
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default Wishlist;