import React from "react";
import cartImage from './../../images/shopping-cart.png'; 
import CartItemsCount from "../CartItemCount";

function CartIcon() {
    return (
        <a href="/shoppingcart" className="relative flex items-center mx-auto m-2">
            <img 
                src={cartImage} 
                alt="Cart" 
                className="w-10 h-10"
            />
            <div className="absolute top-[-5px] right-[-15px] bg-[#EEE5EE] text-black text-sm w-6 h-6 p-1 rounded-full flex justify-center items-center font-medium border-1 border-black">
                <CartItemsCount />
            </div>
        </a>
    );
}

export default CartIcon;
