import React, { useState } from "react";
import useApi from "../../api/getProducts";
import ProductsList from "../../components/Product";
import Search from "../../components/Search";
import { apiUrl } from "../../api/constants";

function AllProducts() {
    const { products, isLoading, isError } = useApi(apiUrl);
    const [searchTerm, setSearchTerm] = useState(""); 

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching products.</div>;

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    return (
        <div className="container max-w-[1400px] mt-[80px] bg-custom-light px-4 py-8">
            <div className="text-center mb-5">
                <h1 className="font-taviraj font-extrabold text-custom-deep uppercase text-2xl">
                   All Products                
                </h1>
            </div>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="row m-auto justify-center">
                <ProductsList products={filteredProducts} />
            </div>
        </div>
    );
}

export default AllProducts;
