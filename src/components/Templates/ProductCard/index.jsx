import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import CalculateDiscount from '../../CalculateDiscount';

const StyledButton = styled(Link)`
    background-color: #F2EDE8;
    color: black;
    display: block;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    font-size: 0.8em;
    width: 75%;
    padding: 0.3rem;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #E1D5C8;
    }
`;

const StyledTags = styled.span`
    background-color: #D5BECE;
    color: #604055;
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    margin: 0.2rem;
`;

function ProductItem({ product }) {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavoriteToggle = () => {
        setIsFavorited(prevState => !prevState);
    };

    return (
        <div key={product.id}>
            <div className="card shadow-lg w-[240px] mx-auto my-4 bg-white relative">
                <div 
                    className="absolute top-2 right-2 text-xl cursor-pointer"
                    onClick={handleFavoriteToggle}
                >
                    {isFavorited ? (
                        <FaHeart className="text-red-600" />
                    ) : (
                        <FaRegHeart className="text-gray-400" />
                    )}
                </div>
                <Link to={`/product/${product.id}`} className="block text-custom-deep no-underline hover:text-custom-dark transition-colors overflow-hidden ">
                    <div className='relative'>
                        <img 
                        src={product.image.url} 
                        alt={product.title || "Product image"} 
                        className="card-img-top w-full h-[230px] object-cover" 
                        />
                        <CalculateDiscount originalPrice={product.price} discountedPrice={product.discountedPrice} />
                    </div>
                    
                    <div className="card-body flex flex-col justify-between m-2">
                        <h5 className="card-title text-custom-deep font-taviraj font-semibold text-l uppercase border-b-2 border-custom-light ">
                            {product.title || "Product Name"}
                        </h5>
                        {/* <p className="card-text text-black text-sm flex-1">
                            {product.description || "No description available."}
                        </p>
                        <div className="card-tags flex flex-wrap mt-2">
                            {product.tags && product.tags.length > 0 ? (
                                product.tags.map((tag, index) => (
                                    <StyledTags key={index} className="badge mx-1 my-1">
                                        {tag}
                                    </StyledTags>
                                ))
                            ) : (
                                <small className="text-muted">No tags available</small>
                            )}
                        </div> */}
                        <div className="flex justify-between">
                            <div className='mb-2 mt-2 h-10 block items-center'>
                            {product.discountedPrice && product.discountedPrice < product.price ? (
                                    <>
                                        <p className="font-bold text-lg text-custom-sale mb-0">
                                            {product.discountedPrice ? `${product.discountedPrice}kr` : "Discounted price not available"}
                                        </p>
                                        <p className="text-sm line-through text-black mb-0">
                                            {product.price ? `${product.price}kr` : "Original price not available"}
                                        </p>
                                    </>
                                ) : (
                                    <p className="font-bold  text-lg text-black">
                                        {product.price ? `${product.price}kr` : "Price not available"}
                                    </p>
                                )}
                            </div>
                            {/* Product Rating */}
                            <span className="flex mt-2 me-1 text-center text-custom-deep font-bold bg-white border-2 border-custom-light w-[55px] h-[30px] px-1 p-0 rounded">
                                <span className='text-yellow-400 pe-1'>{'★'} </span>{product.rating || '-'}
                            </span>
                        </div>
                    </div>
                </Link>
                <div className="flex justify-center mt-2">
                    <StyledButton to={`/product/${product.id}`} className="m-3 shadow-md">
                        VIEW PRODUCT
                    </StyledButton>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
