import React from "react";
import ProductItem from "../Templates/ProductCard";

function ProductsList({ products }) {
    return (
        <div className="flex flex-wrap w-full justify-evenly gap-2">
            {products.length === 0 ? (
                <div>No products found.</div>
            ) : (
                products.map(product => (
                    <div key={product.id} className="w-full sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-6">
                        <ProductItem product={product} />
                    </div>
                ))
            )}
        </div>
    );
}

export default ProductsList;
