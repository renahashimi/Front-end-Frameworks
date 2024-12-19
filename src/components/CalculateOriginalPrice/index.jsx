import React from "react";

function CalculateOriginalPrice({ products }) {
    const originalPrice = products.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0);

    return <span>{originalPrice.toFixed(2)} kr</span>;
}

export default CalculateOriginalPrice;
