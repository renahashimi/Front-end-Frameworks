import React from "react";

function Search({ searchTerm, setSearchTerm }) {
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); 
    };

    return (
        <div className="mb-4 w-full flex justify-center">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for products..."
                className="px-4 py-2 w-full sm:w-1/2 lg:w-1/3 border rounded"
            />
        </div>
    );
}

export default Search;
