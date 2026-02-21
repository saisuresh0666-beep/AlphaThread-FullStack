import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='flex flex-col items-center gap-1 mb-6'>
      <div className='flex gap-2 items-center'>
        <p className='text-gray-400 tracking-widest text-sm sm:text-base font-light'>
          {text1.toUpperCase()}
        </p>
        <p className='text-gray-800 tracking-tighter text-xl sm:text-3xl prata-regular'>
          {text2.toUpperCase()}
        </p>
      </div>
      
      {/* A small, centered vertical or short horizontal accent */}
      <div className='w-10 h-[2px] bg-black mt-1'></div>
    </div>
  )
}

export default Title