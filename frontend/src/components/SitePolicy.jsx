import React from "react";
import { Link } from "react-router-dom";

const  SitePolicy = () => {
  return (
    <div className="bg-white-100 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center px-6">

        {/* Easy Return */}
        <div className="p-5 bg-white shadow rounded-lg">
          <h3 className="font-semibold text-lg">Easy Exchange & Returns</h3>
          <p className="text-sm text-gray-600 mt-2">
            Hassle-free exchange or return within 7 days of delivery.
          </p>
        </div>

        {/* Customer Support */}
        <div className="p-5 bg-white shadow rounded-lg">
          <h3 className="font-semibold text-lg">24/7 Customer Support</h3>
          <p className="text-sm text-gray-600 mt-2">
            Friendly support team available anytime for your help.
          </p>
        </div>

        {/* Quality */}
        <div className="p-5 bg-white shadow rounded-lg">
          <h3 className="font-semibold text-lg">100% Quality Assurance</h3>
          <p className="text-sm text-gray-600 mt-2">
            Premium quality products with guaranteed satisfaction.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SitePolicy;