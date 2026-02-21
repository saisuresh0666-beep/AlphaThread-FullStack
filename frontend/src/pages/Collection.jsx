import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { dropdown_icon } from '../assets/assets'
import Title from '../components/title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products, search, showSearch} = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [Category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relavent")

  const toggleCategory = (e) =>{
    const value = e.target.value
    if(Category.includes(value)){
      setCategory(prev => prev.filter(item => item !== value))
    }else{
      setCategory(prev => [...prev, value])
    }
  }

  const togglesubCategory = (e) =>{
    const value = e.target.value
    if(subCategory.includes(value)){
      setSubCategory(prev => prev.filter(item => item !== value))
    }else{
      setSubCategory(prev => [...prev, value])
    }
  }

  useEffect(()=>{
    applyFilter()
  },[Category, subCategory, products, sortType,search,showSearch])

  const applyFilter = () => {
    let productsCopy = [...products]

    if(showSearch && search){
      productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(Category.length > 0){
      productsCopy = productsCopy.filter(item =>
        Category.includes(item.category)
      )
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      )
    }

    if(sortType === "low-high"){
      productsCopy.sort((a,b)=> a.price - b.price)
    }

    if(sortType === "high-low"){
      productsCopy.sort((a,b)=> b.price - a.price)
    }

    setFilterProducts(productsCopy)



    
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter option */}
      <div className='min-w-60'>

   <p
    onClick={() => setShowFilter(!showFilter)}
    className='relative my-4 text-sm font-bold tracking-[0.3em]
               flex items-center gap-3 cursor-pointer select-none
               text-gray-800
               before:absolute before:left-0 before:-bottom-1
               before:h-[2px] before:w-8 before:bg-black
               hover:before:w-14 before:transition-all before:duration-300'
  >
    FILTER
    <img
      className={`h-3 sm:hidden transition-transform duration-300 ${
        showFilter ? 'rotate-90' : ''
      }`}
      src={dropdown_icon}
      alt=''
    />
  </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input type='checkbox' value="Men" onChange={toggleCategory}/> Men
            </label>
            <label className='flex gap-2'>
              <input type='checkbox' value="Women" onChange={toggleCategory}/> Women
            </label>
            <label className='flex gap-2'>
              <input type='checkbox' value="Kids" onChange={toggleCategory}/> Kids
            </label>
          </div>
        </div>

        {/* Sub Category */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Type</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input type='checkbox' value="Topwear" onChange={togglesubCategory}/> Topwear
            </label>
            <label className='flex gap-2'>
              <input type='checkbox' value="Bottomwear" onChange={togglesubCategory}/> Bottomwear
            </label>
          </div>
        </div>

      </div>

      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          <select
            className='border-2 border-gray-300 text-sm px-2'
            onChange={(e)=>setSortType(e.target.value)}
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              
              <ProductItem
                key={index}
                id={item._id}
                images={item.images[0]}
                name={item.name}
                price={item.price}
                
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection