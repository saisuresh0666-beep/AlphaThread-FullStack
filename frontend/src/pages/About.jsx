import React from 'react'
import Title from '../components/Title'
import { about_img } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Header Section */}
      <div className='text-2xl text-center pt-10 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* Main Story Section */}
      <div className='my-12 flex flex-col lg:flex-row items-center gap-16'>
        <div className='w-full lg:w-1/2 relative group'>
          <img className='w-full h-auto rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300' src={about_img} alt="About Us" />
          <div className='absolute -bottom-4 -right-4 bg-black text-white px-6 py-4 hidden md:block'>
            <p className='text-xl font-bold'>10+</p>
            <p className='text-xs'>Years of Innovation</p>
          </div>
        </div>
        
        <div className='flex flex-col justify-center gap-6 lg:w-1/2 text-gray-600 leading-relaxed'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase products from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste. From fashion and beauty to electronics, we offer an extensive collection sourced from trusted suppliers.</p>
          <div className='pl-6 border-l-4 border-gray-800 italic'>
            "Our mission is to empower customers with choice, convenience, and confidence."
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-8'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      {/* Interactive Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 mb-20'>
        <div className='group border p-10 flex flex-col gap-5 hover:bg-black hover:text-white transition-all duration-500 cursor-default'>
          <hb className='font-bold text-gray-800 group-hover:text-white'>Quality Assurance:</hb>
          <p className='text-gray-600 group-hover:text-gray-300'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>

        <div className='group border p-10 flex flex-col gap-5 hover:bg-black hover:text-white transition-all duration-500 cursor-default md:border-x-0'>
          <hb className='font-bold text-gray-800 group-hover:text-white'>Convenience:</hb>
          <p className='text-gray-600 group-hover:text-gray-300'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>

        <div className='group border p-10 flex flex-col gap-5 hover:bg-black hover:text-white transition-all duration-500 cursor-default'>
          <hb className='font-bold text-gray-800 group-hover:text-white'>Exceptional Service:</hb>
          <p className='text-gray-600 group-hover:text-gray-300'>Our team of dedicated professionals is here to assist you every step of the way, ensuring satisfaction.</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About