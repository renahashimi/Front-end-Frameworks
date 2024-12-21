import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../../api/getProducts';
import { apiUrl } from '../../../api/constants';
import { styled } from 'styled-components';
import AddToCart from '../../CartAddItem';
import CalculateDiscount from '../../CalculateDiscount';

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
    const { products, isLoading, isError } = useApi(`${apiUrl}${id}`);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        if (notification) {
            const timeoutId = setTimeout(() => {
                setNotification('');
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
    }, [notification]);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !products) return <div>Product not found!</div>;

    const handleAddToCart = () => {
        try {
            const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
            currentCart.push(id);
            localStorage.setItem('cart', JSON.stringify(currentCart));

            window.dispatchEvent(new Event('cartUpdated'));

            setNotification(`"${products.title}" has been added to the cart.`);
        } catch (error) {
            console.error('Error updating cart:', error);
            setNotification('Failed to add product to cart. Please try again.');
        }
    };

    return (
        <div className="mb-[110px]">
            <div className="block md:flex sm:mt-[30px] max-w-[400px] md:max-w-[800px] m-4 shadow-2xl overflow-hidden mb-5 m-auto">
                <div>
                    <div className="relative">
                        {products.image?.url && (
                            <img 
                                src={products.image.url}
                                alt={products.title || 'Product Image'}  
                                className="card-single-img w-full max-w-[500px] lg:w-[300px] h-[400px] object-cover"
                            />
                        )}
                        <CalculateDiscount 
                            originalPrice={products.price} 
                            discountedPrice={products.discountedPrice} 
                        />
                    </div>

                    {notification && <Notification>{notification}</Notification>}
                </div>

                <div className="block mt-4 md:w-[400px]">
                    <h2 className="card-title font-taviraj text-custom-deep border-b-2 border-custom-light text-xl md:text-3xl md:font-extrabold uppercase mx-3">
                        {products.title || 'Product Name'}
                    </h2>
                    <div className="flex justify-between mt-4">
                        <div className="mb-2 h-16 block items-center mx-3">
                            {products.discountedPrice && products.discountedPrice < products.price ? (
                                <>
                                    <p className="font-bold text-custom-sale mb-0 text-xl">
                                        {`${products.discountedPrice}kr`}
                                    </p>
                                    <p className="text-sm line-through text-black mb-0 text-s">
                                        {`${products.price}kr`}
                                    </p>
                                </>
                            ) : (
                                <p className="font-bold text-black text-xl">
                                    {`${products.price}kr`}
                                </p>
                            )}
                        </div>
                        <p className="ml-2 mt-1 text-white me-3 text-lg font-bold bg-custom-deep h-[30px] px-2 rounded">
                            <span className="text-yellow-400">{'★'}</span>
                            <span className='ml-1'>{products.rating || '-'}</span>
                            <span className="text-xs ml-1 relative" style={{ top: '-2px' }}>({products.reviews?.length || 0})</span>                             
                        </p>
                    </div>
                    <div className="font-advent text-sm mb-3 p-3 shadow-sm">
                        <p className="font-extrabold text-custom-deep text-l uppercase my-3">Description</p>
                        <p className="text-gray-700 font-semibold -mt-2 mb-4">{products.description || 'No description available'}</p>

                        <div className="card-tags flex flex-wrap mt-5">
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
                    <div className="flex mb-4 lg:mb-0 mt-10 justify-end mt-7">
                        <AddToCart handleClick={handleAddToCart} />
                    </div>
                </div>
            </div>

            <div className="review-container mx-2 my-5 pb-4 mt-[60px] shadow-lg bg-white">
                <h3 className="text-lg uppercase font-bold bg-custom-deep text-white font-taviraj font-semibold p-2">
                    Product Reviews
                </h3>
                <div className="review-card w-full shadow-lg my-5 px-2 pb-2">
                    {products.reviews && products.reviews.length > 0 ? (
                        products.reviews.map((review) => (
                            <div key={review.id} className="review-item mb-2 p-2 border-b border-gray-200 bg-custom-light">
                                <div className="flex justify-between mb-2">
                                    <span className="font-advent text-lg font-medium text-gray-800">{review.username}</span>
                                    <span className="ml-2 text-yellow-500">
                                        {'★'.repeat(review.rating)}
                                    </span>
                                </div>
                                <p className="font-rokkitt text-gray-700 my-3">{review.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-custom-deep text-xl py-4 px-2">No reviews available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SingleProductPage;
