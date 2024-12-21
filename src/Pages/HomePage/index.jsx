import React, { useState } from "react";
import useApi from "../../api/getProducts";
import ProductsList from "../../components/Product";
import Search from "../../components/Search";
import { apiUrl } from "../../api/constants";
import HomePageBanner from "../../components/HomePageBanner";


function HomePage() {
    const { products, isLoading, isError } = useApi(apiUrl);
    const [searchTerm, setSearchTerm] = useState(""); 

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching products.</div>;

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    return (
        <div className="container max-w-[1400px] mt-[60px] bg-custom-light">
            {/* <div className="text-center my-2 w-full mt-[30px] shadow-lg">
                <h1 className="font-rokkitt font-extrabold text-custom-deep bg-custom-deep text-custom-light w-full uppercase  py-5 sm:text-2xl">
                    Welcome to Lunaura
                </h1>
            </div> */}
            <div className="mt-[20px]">
                <HomePageBanner />
            </div>
            <div className="max-w-[1200px] mt-[30px] row m-auto justify-center mt-5">
                <h2 className="row flex font-taviraj text-xl  md:text-4xl md:mt-7 justify-center uppercase">
                Discover Lunaura
                </h2>
            </div>
            <div className="block m-auto mt-2 w-[75%] md:w-full text-center">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <p className="m-auto mb-3 p-3 text-xs md:text-lg font-advent font-semibold -mt-5">- Start your adventure here and explore the finest collections curated for your unique tastes.</p>
            </div>
            <div className="max-w-[1200px] row m-auto justify-center">
                <ProductsList products={filteredProducts} />
            </div>
        </div>
    );
    
}

export default HomePage;
