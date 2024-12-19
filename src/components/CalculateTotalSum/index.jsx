import React from "react";

function CalculateTotalPrice({ products }) {
    if (!Array.isArray(products) || products.length === 0) {
        return <span>0.00 kr</span>; 
    }

    const total = products.reduce((acc, product) => {
        const price = product.discountedPrice && product.discountedPrice < product.price
            ? product.discountedPrice
            : product.price;

        return acc + (price * (product.quantity || 1)); 
    }, 0);

    const totalPrice = total.toFixed(2);

    return (
        <span>{totalPrice} kr</span>
    );
}

export default CalculateTotalPrice;
