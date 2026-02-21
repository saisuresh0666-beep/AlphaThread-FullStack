import React from 'react'
import Title from '../components/Title'
import { contact_img } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'GET IN'} text2={'TOUCH'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 mb-28 justify-center'>
        {/* Left Side: Visual & Form */}
        <div className='w-full md:max-w-[480px]'>
          <img className='w-full h-auto rounded-lg' src={contact_img} alt="Contact Us" />
          
       
        </div>

        {/* Right Side: Information Details */}
        <div className='flex flex-col justify-start gap-10 py-5'>
          <section>
            <p className='font-bold text-xl text-gray-800 tracking-wide uppercase mb-4'>Visit Our Office</p>
            <p className='text-gray-500 leading-relaxed'>
              54709 Willms Station <br /> 
              Suite 350, Washington, USA
            </p>
          </section>

          <section>
            <p className='font-bold text-xl text-gray-800 tracking-wide uppercase mb-4'>Contact Info</p>
            <p className='text-gray-500'>
              <span className='font-medium text-gray-700'>Support:</span> (415) 555-0132
            </p>
            <p className='text-gray-500'>
              <span className='font-medium text-gray-700'>Email:</span> admin@forever.com
            </p>
          </section>
          
     
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact