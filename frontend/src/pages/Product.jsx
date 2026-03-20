import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts';
import axios from "axios";
const Product = () => {

  const { productId } = useParams();
  const { products, currency, token, addToCart, backendUrl } = useContext(ShopContext);

const [isWishlisted, setIsWishlisted] = useState(false);
  const [productData, setProductData] = useState(false);
  const [images, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.images[0]);
        return null;
      }
    });
  };

  const checkWishlistStatus = async () => {
    if (!token) return;
    try {
      const res = await axios.get(backendUrl + "/api/wishlist/get", {
        headers: { token }
      });
      const wishlistItems = res.data.wishlist || [];
      const isPresent = wishlistItems.some(item => 
        item.productId?._id === productId || item.productId === productId
      );
      setIsWishlisted(isPresent);
    } catch(err) {
      console.log(err);
    }
  };

 useEffect(() => {
  if (products.length > 0) {
    fetchProductData();
  }
}, [productId, products]);

useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // remove smooth if you want instant jump
  });
  checkWishlistStatus();
}, [productId, token]);




const toggleWishlist = async (productId) => {
  try{
  const res = await axios.post(backendUrl+"/api/wishlist/add", {
    productId
  },{headers:{token}});

  
if (res.data.status === "added") {
  setIsWishlisted(true);
} else {
  setIsWishlisted(false);
}

}catch(err)
{
console.log(err)
}
};





  return productData ? (
    <div className="px-6 md:px-24 py-14">

  <div className="flex flex-col md:flex-row gap-12">

    {/* Image Section */}
    <div className="flex-1">
      <img
        src={images}
        alt={productData.name}
        className="w-full rounded-md object-cover border border-black/10"
      />

      <div className="flex gap-3 mt-5">
        {productData.images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setImage(img)}
            className={`w-16 h-16 object-cover rounded-sm cursor-pointer
              border transition
              ${
                images === img
                  ? "border-black"
                  : "border-black/10 hover:border-black/40"
              }`}
          />
        ))}
      </div>
    </div>

    {/* Product Details */}
    <div className="flex-1 max-w-lg">

      <h1 className="text-3xl font-medium tracking-tight text-gray-900">
        {productData.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3 mt-3">
        <div className="text-yellow-500 text-sm">★★★★☆</div>
        <p className="text-xs text-gray-400">(124 reviews)</p>
      </div>

      <p className="text-sm text-gray-500 leading-relaxed mt-4">
        {productData.description}
      </p>

      <p className="text-2xl font-semibold mt-6 text-gray-900">
        ${productData.price}
      </p>

      {/* Sizes */}
      <div className="mt-8">
        <p className="text-sm font-medium mb-3 tracking-wide">
          Select Size
        </p>

        <div className="flex gap-3">
          {productData.sizes.map((size, i) => (
            <button
              key={i}
              onClick={() => setSelectedSize(size)}
              className={`px-5 py-2 text-sm border transition
                ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "border-black/20 hover:bg-black hover:text-white"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart */}
     <div className="mt-10 flex flex-col md:flex-row gap-4">
  
  {/* Add to Cart */}
  <button
    onClick={() => addToCart(productData._id, selectedSize)}
    className="flex-1 flex items-center justify-center
               bg-black text-white 
               px-6 py-3
               text-sm tracking-wide 
               rounded-full
               hover:opacity-90 
               active:scale-95
               transition"
  >
    🛒 Add to Cart
  </button>

  {/* Wishlist */}
  <button
    onClick={() => toggleWishlist(productData._id)}
    className={`flex-1 flex items-center justify-center gap-2 
                px-6 py-3 
                rounded-full 
                text-sm font-medium 
                transition duration-200
                active:scale-95
                ${
                  isWishlisted
                    ? "bg-pink-500 text-white shadow-md"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
  >
    {isWishlisted ? "💖 Remove from Wishlist" : "🤍 Add to Wishlist"}
  </button>

</div>

      {/* Info */}
      <div className="mt-8 text-xs text-gray-400 space-y-1">
        <p>✔ Easy returns within 7 days</p>
        <p>✔ Free shipping on all orders</p>
        <p>✔ Secure checkout</p>
      </div>

    </div>
  </div>

  {/* Reviews */}
  <div className="mt-16 max-w-2xl">
    <h2 className="text-lg font-medium mb-6">
      Customer Reviews
    </h2>

    <div className="border border-black/10 rounded-sm p-5 mb-4">
      <div className="flex justify-between text-sm">
        <p className="font-medium">Rahul</p>
        <p className="text-yellow-500">★★★★★</p>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Very good quality product. Totally worth it!
      </p>
    </div>

    <div className="border border-black/10 rounded-sm p-5">
      <div className="flex justify-between text-sm">
        <p className="font-medium">Sneha</p>
        <p className="text-yellow-500">★★★★☆</p>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Nice fitting and material is soft.
      </p>
    </div>
  </div>

  <RelatedProducts
    category={productData.category}
    subCategory={productData.subcategory}
  />

</div>

  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
