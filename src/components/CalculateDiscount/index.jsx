import React from "react";
import { useLocation } from "react-router-dom";

function CalculateDiscount({ originalPrice, discountedPrice, products }) {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isAllProducts = location.pathname === "/products";
    const isShoppingCart = location.pathname === "/shoppingcart"; 

    if (products && Array.isArray(products)) {
        const totalDiscount = products.reduce((total, product) => {
            const discount =
                product.price && product.discountedPrice && product.price > product.discountedPrice
                    ? (product.price - product.discountedPrice) * (product.quantity || 1) 
                    : 0;
            return total + discount;
        }, 0);

        return <span>{totalDiscount.toFixed(2)} kr</span>;
    }

    if (originalPrice && discountedPrice && discountedPrice < originalPrice) {
        const discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

        return (
            <div
                className={`${
                    isHomePage || isAllProducts || isShoppingCart
                        ? "absolute top-0 right-0 bg-custom-dark text-white fixed px-3 py-1"
                        : "absolute top-6 right-10 bg-custom-deep text-white font-bold py-1 transform -rotate-45 overflow-hidden w-[150%]"
                } font-bold`}
            >
                <div className="text-center w-full">
                    {`${discountPercentage}% OFF`}
                </div>
            </div>
        );
    }

    return null;
}

export default CalculateDiscount;
