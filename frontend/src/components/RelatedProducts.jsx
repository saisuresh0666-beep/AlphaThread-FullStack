import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subcategory }) => {
  
  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice()

      productsCopy = productsCopy.filter(item => category === item.category)
      productsCopy = productsCopy.filter(item => subcategory === item.subcategory)

      setRelated(productsCopy.slice(0, 8)) // limit to 8 related products
    }
  }, [products, category, subcategory])

  return (
    <div className="mt-12">
      <div className="text-center mb-6">
        <Title text1={'RELATED'} text2={' PRODUCTS'} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {related.map((item, index) => (
          <ProductItem
                key={index}
                id={item._id}
                images={item.images[0]}
                name={item.name}
                price={item.price}
            className="border rounded-lg shadow-sm hover:shadow-lg transition duration-300 bg-white"
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
