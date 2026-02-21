import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from "axios"
import { backEndUrl } from "../App"
import { toast } from 'react-toastify'


const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState('');
  const [category,setCategory] = useState('Men');
  const [subCategory,setSubCategory] = useState('Topwear');
  const [bestseller,setBestseller] = useState(false);
  const [sizes,setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{ 

      const formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

     image1 && formData.append("image1",image1)
     image2 && formData.append("image2",image2) 
     image3 && formData.append("image3",image3)
     image4 && formData.append("image4",image4)

     const response = await axios.post(backEndUrl+"/api/product/add",formData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
e
     if(response.data.success){
      toast.success(response.data.message)
      setName("")
      setDescription("")
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setPrice("")
     }else{
      toast.error(response.data.message)
     }


    }catch(err){
 console.log(err)
 toast.error(err.message)
 
    }
  }

  
  return (
    <form onSubmit={onSubmitHandler} className="w-full max-w-4xl mx-auto bg-white p-4 rounded-lg shadow space-y-4">

      <div>
        <p className="font-semibold text-gray-700 mb-1">Upload Image</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label htmlFor='image1' className="border border-dashed rounded-md p-2 cursor-pointer hover:border-gray-400">
            <img src={!image1 ? assets.upload_area :URL.createObjectURL(image1)} alt='' className="w-full h-16 object-contain"/>
            <input onChange={(e)=>setImage1(e.target.files[0])} type='file' id='image1' hidden/>
          </label>
          <label htmlFor='image2' className="border border-dashed rounded-md p-2 cursor-pointer hover:border-gray-400">
            <img src={!image2 ? assets.upload_area :URL.createObjectURL(image2)} alt='' className="w-full h-16 object-contain"/>
            <input onChange={(e)=>setImage2(e.target.files[0])} type='file' id='image2' hidden/>
          </label>
          <label htmlFor='image3' className="border border-dashed rounded-md p-2 cursor-pointer hover:border-gray-400">
            <img src={!image3 ? assets.upload_area :URL.createObjectURL(image3)} alt='' className="w-full h-16 object-contain"/>
            <input onChange={(e)=>setImage3(e.target.files[0])} type='file' id='image3' hidden/>
          </label>
          <label htmlFor='image4' className="border border-dashed rounded-md p-2 cursor-pointer hover:border-gray-400">
            <img src={!image4 ? assets.upload_area :URL.createObjectURL(image4)} alt='' className="w-full h-16 object-contain"/>
            <input onChange={(e)=>setImage4(e.target.files[0])} type='file' id='image4' hidden/>
          </label>
        </div>
      </div>

      <div>
        <p className="font-semibold text-gray-700 text-sm mb-1">Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} type='text' placeholder='New Product Name' required
          className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-gray-400 outline-none"/>
      </div>

      <div>
        <p className="font-semibold text-gray-700 text-sm mb-1">Product description</p>
        <input onChange={(e)=>setDescription(e.target.value)} value={description} type='text' placeholder='Write content here' required
          className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-gray-400 outline-none"/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <p className="font-semibold text-gray-700 text-sm mb-1">Product Category</p>
          <select onChange={(e)=>setCategory(e.target.value)} className="w-full border rounded-md px-3 py-1.5 text-sm">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="font-semibold text-gray-700 text-sm mb-1">Sub Category</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} className="w-full border rounded-md px-3 py-1.5 text-sm">
            <option value="Topwear">Top wear</option>
            <option value="Bottomwear">Bottom wear</option>
          </select>
        </div>

        <div>
          <p className="font-semibold text-gray-700 text-sm mb-1">Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} type='number' placeholder='$0.00' required
            className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-gray-400 outline-none"/>
        </div>
      </div>

      <div>
        <p className="font-semibold text-gray-700 text-sm mb-1">Product sizes</p>
        <div className="flex gap-2 flex-wrap">
  {["S", "M", "L", "XL", "XXL"].map((size) => (
    <div
      key={size}
      onClick={() =>
        setSizes((prev) =>
          prev.includes(size)
            ? prev.filter((item) => item !== size)
            : [...prev, size]
        )
      }
      className={`${
        sizes.includes(size) ? "bg-black text-white" : "bg-slate-200"
      } px-3 py-1 cursor-pointer`}
    >
      <p>{size}</p>
    </div>
  ))}
</div>

      </div>

      <div className="flex items-center gap-2 text-sm">
        <input onChange={() => setBestseller(prev => !prev)}
  checked={bestseller}
  type="checkbox" id='bestseller' className="w-4 h-4"/>
        <label htmlFor='bestseller' className="text-gray-700">Add to bestseller</label>
      </div>

      <button type='submit'
        className="bg-black text-white px-5 py-1.5 text-sm rounded-md hover:bg-gray-800 transition">
        Add Product
      </button>

   </form>

  )
}

export default Add
