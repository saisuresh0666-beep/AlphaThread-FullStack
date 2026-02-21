import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, getCartAmount, getFinalAmount } = useContext(ShopContext);

  return (
    <div className="w-full max-w-sm bg-white p-5 rounded-lg shadow-md border">
      
      <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>

      <div className="flex justify-between mb-2 text-sm">
        <span>Subtotal</span>
        <span>{currency}{getCartAmount()}.00</span>
      </div>

      <div className="flex justify-between mb-3 text-sm">
        <span>Delivery</span>
        <span>{currency}10</span>
      </div>

      <hr className="mb-3" />

      <div className="flex justify-between text-base font-bold">
        <span>Total</span>
        <span>{currency}{getFinalAmount()}.00</span>
      </div>

    </div>
  );
};

export default CartTotal;
