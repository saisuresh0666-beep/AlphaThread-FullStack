import React from 'react'

const NewsLetterBox = () => {

  // Prevent page reload when form is submitted
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Email submitted");
  }

  return (
    <div className="bg-white-100 py-12 px-6 flex justify-center">

      {/* Main container */}
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-6xl
      flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left text section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800">
            Subscribe to 10% off
          </h2>
          <p className="text-gray-500 text-sm">
            Get updates on new arrivals, offers & exclusive discounts.
          </p>
        </div>

        {/* Form section */}
        <form onSubmit={onSubmitHandler} className="flex w-full md:w-auto gap-3">

          <input 
            type="email"
            required
            placeholder="Enter your email"
            className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button 
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Subscribe
          </button>

        </form>

      </div>
    </div>
  )
}

export default NewsLetterBox