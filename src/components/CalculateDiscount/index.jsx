import React from "react";
import { useLocation } from "react-router-dom";

function CalculateDiscount({ originalPrice, discountedPrice }) {
    const location = useLocation();

    // Check if the current path is the homepage
    const isHomePage = location.pathname === "/";

    if (originalPrice && discountedPrice && discountedPrice < originalPrice) {
        const discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
        return (
            <div
                className={`${
                    isHomePage
                        ? "absolute top-0 right-0 bg-custom-dark text-white fixed" 
                        : "absolute top-7 right-11 bg-custom-deep text-white font-bold py-1 transform -rotate-45 overflow-hidden w-[150%]" 
                } font-bold`}
                style={isHomePage ? { zIndex: 1000, padding: "0.5rem 1rem" } : {}}
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

