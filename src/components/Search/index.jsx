import React from "react";
import { BsSearch } from "react-icons/bs";

function Search({ searchTerm, setSearchTerm }) {
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="my-4 w-full flex justify-center items-center">
            <div className="relative w-full md:w-1/2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search for products..."
                    className="px-4 py-2 w-full border rounded pl-10" 
                />
                <BsSearch
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    size={20}
                />
            </div>
        </div>
    );
}

export default Search;
