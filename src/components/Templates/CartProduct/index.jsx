import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function CartItemsTemplate({ products, onRemove }) {
    return (
        <div key={products.id} className="container block my-2">
            <div className="cart-item flex justify-between w-full border-2 border-custom-light">
                {/* Product Image */}
                <Link to={`/product/${products.id}`} className="flex-none w-1/6">
                    <img 
                        src={products.image?.url} 
                        alt={products.title || "Product Image"} 
                        className="w-[50px] h-[50px] object-cover"
                    />
                </Link>
                {/* Product Title */}
                <div className="block">
                    <Link to={`/product/${products.id}`} className="flex-grow w-3/5 mb-5 ms-2 justify-right text-xs sm:text-lg text-left flex-wrap">
                        <h2 className="truncate">{products.title || "Untitled Product"}</h2>
                    </Link>
                    <div>
                    </div>
                </div>
               
                {/* Product Price */}
                <div className="flex-none w-1/4 cart-price text-right">
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
                {/* Remove Button */}
                <button 
                    className="flex-none w-auto text-custom-deep bg-custom-light rounded-md px-3 py-1 ms-3 hover:bg-custom-light flex items-center justify-center"
                    onClick={() => onRemove(products.id)}
                >
                    <FaTrash className="mr-2" />
                </button>
            </div>
        </div>
    );
}

export default CartItemsTemplate;
