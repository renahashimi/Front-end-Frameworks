import React from "react";
import { IoCartOutline } from "react-icons/io5"; 
import CartItemsCount from "../CartItemCount";

function CartIcon() {
    return (
        <a href="/shoppingcart" className="relative flex items-center mx-auto m-2">
            <IoCartOutline className="w-9 h-9 text-custom-deep" /> 
            <div className="absolute top-[-5px] right-[-15px] bg-[#EEE5EE] text-black text-sm w-6 h-6 p-1 rounded-full flex justify-center items-center font-medium border-1 border-black">
                <CartItemsCount />
            </div>
        </a>
    );
}

export default CartIcon;
