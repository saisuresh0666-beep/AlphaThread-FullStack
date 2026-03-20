import React, { useContext, useEffect, } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { backendUrl, token, currency, fetchWishlist, wishlist, setWishlist } = useContext(ShopContext);
 
  const navigate = useNavigate();

  
  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        backendUrl + "/api/wishlist/remove",
        {
          data: { productId },
          headers: { token },
        }
      );

      toast.success("Removed from wishlist",{
  className: "custom-toast",
  bodyClassName: "custom-toast-body",
});

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





  return (<div className="px-6 md:px-20 py-12 bg-gray-50 min-h-screen">
  <h2 className="text-3xl font-semibold mb-10 text-gray-800">
    My Wishlist ❤️
  </h2>

  {wishlist.length === 0 ? (
    <div className="text-center mt-20">
      <p className="text-gray-500 text-lg">Your wishlist is empty</p>
      <button
        onClick={() => navigate("/collection")}
        className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:opacity-90"
      >
        Shop Now
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {wishlist.map((item) => {
        const product = item.productId;
        if (!product) return null;

        return (
          <div
            key={item._id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 group"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={product.images[0]}
                alt={product.name}
                onClick={() => navigate(`/product/${product._id}`)}
                className="w-full h-64 object-cover cursor-pointer group-hover:scale-105 transition"
              />

              {/* Remove (Heart Icon) */}
             
            </div>

            {/* Details */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                {product.name}
              </h3>

              <p className="mt-2 text-lg font-semibold text-black">
                {currency} {product.price}
              </p>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="flex-1 border border-gray-300 py-2 text-sm rounded-full hover:bg-gray-100"
                >
                  View
                </button>
{/* Remove */}
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="flex-1 bg-black text-white py-2 text-sm rounded-full hover:opacity-90"
                >
                  Remove
                </button>
              </div>
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