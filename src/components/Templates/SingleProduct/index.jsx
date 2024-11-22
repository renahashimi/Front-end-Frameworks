import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../../api/getProducts';
import { apiUrl } from '../../../api/constants';
import { styled } from "styled-components";
import AddToCart from '../../CartAddItem';
import CalculateDiscount from '../../CalculateDiscount';

const ProductContainer = styled.div`
  border: 2px solid #F8F4F8; 
`;

const StyledTags = styled.span`
    color: black;
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    margin: 0.2rem;
`;

const Notification = styled.div`
  background-color: #6B4D35;
  color: white;
  padding: 1rem;
  font-weight: bold;
  border-radius: 0.25rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-in-out;
  max-width: 300px; 
  width: 100%;
  padding: 1rem;
  text-align: center;
`;


function SingleProductPage() {
    const { id } = useParams(); 
    const { products, isLoading, isError } = useApi(`${apiUrl}` + id); 
    const [notification, setNotification] = useState('');
    
    if (isLoading) return <div>Loading...</div>;
    if (isError || !products) return <div>Product not found!</div>;

    // console.log("HHH", products)
    // console.log("WWW", `${apiUrl}` + id)

    const handleAddToCart = () => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        currentCart.push(id);
        localStorage.setItem('cart', JSON.stringify(currentCart));
    
        window.dispatchEvent(new Event('cartUpdated'));
    
        setNotification(`"${products.title}" is added to cart`);
    
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };
    
    return(
        <div>
            {/* Product Details */}
            <ProductContainer className="block md:flex sm:mt-[30px] max-w-[400px] md:max-w-[800px] m-4 shadow-2xl overflow-hidden mb-5 m-auto">
                <div>  
                    {/* Product Image */}
                    <div className="relative">
                        {products.image?.url && (
                            <img 
                                src={products.image.url} 
                                alt={products.title || 'Product Image'}  
                                className="card-single-img w-full max-w-[500px] h-[auto] max-h-[500px] object-cover"
                            />
                        )}
                        <CalculateDiscount originalPrice={products.price} discountedPrice={products.discountedPrice} />
                    </div>
                    
                    {/* Notification */}
                    {notification && (
                        <Notification>
                            {notification}
                        </Notification>
                    )}
                </div>
                
                {/* Product Title and Price */}
                <div className="block mt-4">
                    <h2 className="card-title font-taviraj text-custom-deep border-b-2 border-custom-light text-xl md:text-4xl md:font-extrabold uppercase mx-3">
                        {products.title || "Product Name"}
                    </h2>
                    <div className="flex justify-between mt-4">
                        {/* Price */}
                        <div className="mb-2 h-16 block items-center mx-3">
                            {products.discountedPrice && products.discountedPrice < products.price ? (
                                <>
                                    <p className="font-bold text-custom-sale mb-0 text-xl">
                                        {products.discountedPrice ? `${products.discountedPrice}kr` : "Discounted price not available"}
                                    </p>
                                    <p className="text-sm line-through text-black mb-0 text-s">
                                        {products.price ? `${products.price}kr` : "Original price not available"}
                                    </p>
                                </>
                            ) : (
                                <p className="font-bold text-black text-xl">
                                    {products.price ? `${products.price}kr` : "Price not available"}
                                </p>
                            )}
                        </div> 
                        
                        {/* Product Rating */}
                        <span className="ml-2 mt-1 text-white me-3 text-lg font-bold bg-custom-deep h-[30px] px-2 rounded">
                            <span className='text-yellow-400'>{'★'} </span>{products.rating || '-'}
                        </span>
                    </div>    
                    
                    {/* Product Description */}
                    <div className="mt-5 text-sm my-5 p-2 shadow-md">
                        <p className="font-semibold text-custom-deep text-l uppercase my-3">Description</p>
                        <p className="text-gray-700 mb-4">{products.description || 'No description available'}</p>
                        
                        {/* Product Tags */}
                        <div className="card-tags flex flex-wrap mt-5 md:justify-center">
                            {products.tags && products.tags.length > 0 ? (
                                products.tags.map((tag, index) => (
                                    <StyledTags key={index} className="badge mx-1 bg-custom-light">
                                        #{tag}
                                    </StyledTags>
                                ))
                            ) : (
                                <small className="text-muted">No tags available</small>
                            )}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="block mb-4 justify-end mt-7"> 
                        <AddToCart handleClick={handleAddToCart}/>
                    </div>
                </div>
            </ProductContainer>
            
            {/* Reviews Section */}
            <div className="review-container mx-2 my-5 mt-[60px] shadow-lg bg-white ">
                <h3 className="text-lg uppercase font-bold bg-custom-deep text-white font-taviraj font-semibold p-2">Product Reviews</h3>
                <div className="review-card md:max-w-[400px] shadow-lg mt-5 mx-2">
                    {products.reviews && products.reviews.length > 0 ? (
                        products.reviews.map((review, index) => (
                            <div key={review.id} className="review-item mb-2 p-2 border-b border-gray-200 bg-custom-light">
                                <div className="flex justify-between mb-2">
                                    <span className="text-lg font-medium text-gray-800">{review.username}</span>
                                    <span className="ml-2 text-yellow-500">
                                        {'★'.repeat(review.rating)} 
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-3">{review.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No reviews available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SingleProductPage;