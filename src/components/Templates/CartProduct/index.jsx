import React from "react";
import { FaTrash } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

function CartItemsTemplate({ products, onRemove, onIncrease, onDecrease }) {
    return (
        <div key={products.id} className="container block my-2">
            <div className="cart-item flex justify-between w-full border-2 border-custom-light">
                <Link to={`/product/${products.id}`} className="flex-none w-1/6">
                    <img 
                        src={products.image?.url} 
                        alt={products.title || "Product Image"} 
                        className="w-[60px] h-[60px] object-cover"
                    />
                </Link>
                <div className="block m-1 w-2/6 sm:-ms-5">
                    <Link to={`/product/${products.id}`} className="flex items-center w-full">
                        <h2 className="cart-title text-sm font-taviraj font-bold break-words w-full text-left md:text-lg overflow-hidden text-ellipsis whitespace-nowrap">
                            {products.title || "Untitled Product"}
                        </h2>
                    </Link>
                    <div className="flex items-center w-full text-left mt-1">    
                        <p className="font-medium text-xs sm:text-base me-2">Quantity:</p>         
                        <div className="font-medium text-xs sm:text-base flex">
                            <AiOutlineMinus 
                                className="flex justify-center items-center w-4 h-4 sm:w-5 sm:h-5 border-2 border-custom-dark rounded-full cursor-pointer mr-1 mt-0.5" 
                                onClick={() => onDecrease(products.id)}
                            />
                            <span className="font-semibold mt-0.5 sm:mt-0 px-1">{products.quantity}</span>
                            <AiOutlinePlus 
                                className="flex justify-center items-center  w-4 h-4 sm:w-5 sm:h-5 border-2 border-custom-dark rounded-full cursor-pointer ml-1 mt-0.5" 
                                onClick={() => onIncrease(products.id)}
                            />
                        </div>     
                    </div>
                </div>
                <div className="flex-none font-taviraj w-1/4 cart-price text-right mt-2">
                    {products.discountedPrice && products.discountedPrice < products.price ? (
                        <>
                            <p className="font-bold text-xs sm:text-base text-custom-sale">
                                {products.discountedPrice ? `${products.discountedPrice}kr` : "Discounted price not available"}
                            </p>
                            <p className="text-xs line-through text-black mb-0">
                                {products.price ? `${products.price}kr` : "Original price not available"}
                            </p>
                        </>
                    ) : (
                        <p className="font-bold text-xs sm:text-base text-black text-right">
                            {products.price ? `${products.price}kr` : "Price not available"}
                        </p>
                    )}
                </div>
                <button 
                    className="flex-none w-auto text-custom-deep bg-custom-light p-0 ms-2 hover:bg-custom-light flex items-center justify-center"
                    onClick={() => onRemove(products.id)}
                >
                    <FaTrash className="text-xl mr-2 ps-2" />
                </button>
            </div>
        </div>
    );
}

export default CartItemsTemplate;
