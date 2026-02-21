import  axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { backEndUrl, currency } from '../App'
import { toast } from 'react-toastify'



const List = ({token}) => {


  const[list,setList] = useState([])

 const fetchList = async () => {
  try {
    const response = await axios.get(backEndUrl + "/api/product/list");
    
   

    if (response.data.success) {
     
     setList(response.data.product)

    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const deleteHandler = async (productId) => {
  try {
   
    const response = await axios.delete(
      backEndUrl + `/api/product/remove/${productId}`,
        {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
   

    if (response.data.success) {
      toast.success("Product deleted");
      fetchList(); // refresh list after delete
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    console.log(err);
    toast.error("Cannot delete product");
  }
};



  useEffect(()=>{

    fetchList()

  },[])

  
return (
  <>
    <p className='mb-2 text-lg font-semibold'>All Products List</p>

    <div className='flex flex-col gap-2'>

      {/* Table Header */}
      <div className='grid grid-cols-[1fr_2fr_2fr_1fr_1fr] items-center bg-gray-200 p-2 text-sm font-bold'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>

      {/* Product List */}
    {list.map((item, index) => (
  <div 
    key={index} 
    className='grid grid-cols-[1fr_2fr_2fr_1fr_1fr] items-center bg-white p-2 border text-sm'
  >
   
   <img 
  className='w-12 h-12 object-cover' 
  src={item.images[0]}
  alt=''
  
  // Fallback image if URL fails
/>
    <p>{item.name}</p>
    <p>{item.category}</p>
    <p>{currency}{item.price}</p>
    <button  onClick={()=>deleteHandler(item._id)} className='text-center cursor-pointer text-red-500 font-bold'>X</button>
  </div>
))}


    </div>
  </>
)

}

export default List
