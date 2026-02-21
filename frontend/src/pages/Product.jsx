import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(ShopContext);


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
}, [productId]);



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
      <div className="mt-10">
        <button
          onClick={() => addToCart(productData._id, selectedSize)}
          className="w-full md:w-auto bg-black text-white px-10 py-3
                     text-sm tracking-wide hover:opacity-90 transition"
        >
          Add to Cart
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
