import React from "react";
import { logo } from "../assets/assets"; // adjust path if needed
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + About */}
        <div>
          <img src={logo} alt="Logo" className="w-32 mb-4" />
          <p className="text-gray-600 text-sm">
            Premium fashion store delivering quality styles at the best prices.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Company</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
        <Link to={"/"}  >  <li className="hover:text-black cursor-pointer">Home</li> </Link>
         <Link to={'about'}> <li className="hover:text-black cursor-pointer">About</li></Link>  
          <Link to={'collection'} > <li className="hover:text-black cursor-pointer">Collection</li></Link>
          <Link to={'contact'}> <li className="hover:text-black cursor-pointer">Contact</li></Link> 
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Support</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-black cursor-pointer">Returns</li>
            <li className="hover:text-black cursor-pointer">Shipping</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
            <li className="hover:text-black cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
          <p className="text-gray-600 text-sm">support@yourstore.com</p>
          <p className="text-gray-600 text-sm">+91 98765 43210</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} YourStore. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
