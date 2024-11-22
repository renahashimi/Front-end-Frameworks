import React, { useState } from "react";
import { styled } from "styled-components";
import useApi from "../../api/getProducts";
import ProductsList from "../../components/Product";
import Search from "../../components/Search";
import { apiUrl } from "../../api/constants";

const HomeContainer = styled.div`
`;

function Home() {
    const { products, isLoading, isError } = useApi(apiUrl);
    const [searchTerm, setSearchTerm] = useState(""); 

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching products.</div>;

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    return (
        <HomeContainer className="container max-w-[1100px] mt-[80px] bg-custom-light px-4 py-8">
            <img 
                src="" 
                alt="Lunaura" 
                className="img-fluid mb-4 mx-auto d-block" 
            />
            <div className="text-center mb-5">
                <h1 className="font-taviraj font-extrabold text-custom-deep">
                    Welcome to Lunaura
                </h1>
            </div>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="row m-auto justify-center">
                <h2 className="row flex font-taviraj text-xl justify-center m- uppercase">All Products</h2>
                <ProductsList products={filteredProducts} />
            </div>
        </HomeContainer>
    );
}

export default Home;
