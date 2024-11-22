import { useEffect, useState } from "react";

function useApi(apiUrl) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function getProducts() {
            try {
                setIsLoading(true);
                setIsError(false);

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }

                const json = await response.json();
                console.log("Fetched data:", json);

                if (json.data) {
                    setProducts(json.data);
                } else {
                    console.error("No product data found.");
                    setIsError(true);
                }
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getProducts();
    }, [apiUrl]);

    return { products, isLoading, isError };
}

export default useApi;
