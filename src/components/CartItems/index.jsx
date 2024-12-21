import React, { useEffect, useState } from "react";
import { apiUrl } from "../../api/constants";
import CartItemsTemplate from "../Templates/CartProduct";
import { Link, useNavigate } from "react-router-dom";
import CalculateTotalPrice from "../CalculateTotalSum";
import CalculateOriginalPrice from "../CalculateOriginalPrice";
import CalculateDiscount from "../CalculateDiscount";

function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const cartItemIds = JSON.parse(localStorage.getItem("cart")) || [];

        const fetchCartItems = async () => {
            try {
                if (cartItemIds.length === 0) {
                    setError("Your cart is empty.");
                    return;
                }

                const productPromises = cartItemIds.map(id => {
                    const requestUrl = `${apiUrl}${id}` ;
                    return fetch(requestUrl)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Product with ID ${id} not found.`);
                            }
                            return response.json();
                        });
                });

                const products = await Promise.all(productPromises);

                const validProducts = products
                    .map(product => product.data) 
                    .filter(data => data);

                if (validProducts.length === 0) {
                    setError("No products found in your cart.");
                    return;
                }

                const groupedProducts = validProducts.reduce((acc, product) => {
                    const existingProduct = acc.find(item => item.id === product.id);
                    if (existingProduct) {
                        existingProduct.quantity += 1;
                    } else {
                        acc.push({ ...product, quantity: 1 });
                    }
                    return acc;
                }, []);

                setCartItems(groupedProducts);
            } catch (err) {
                setError("There was an error loading your cart items.");
                console.error(err);
            }
        };

        if (cartItemIds.length > 0) {
            fetchCartItems();
        } else {
            setError("Your cart is empty.");
        }
    }, []);

    const removeItemFromCart = (productId) => {
        let cartItemIds = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemIds = cartItemIds.filter(id => id !== productId);  
        localStorage.setItem("cart", JSON.stringify(cartItemIds));
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };
    
    const increaseQuantity = (productId) => {
        let cartItemIds = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemIds.push(productId); 
        localStorage.setItem("cart", JSON.stringify(cartItemIds));
        
        setCartItems(prevItems => {
            return prevItems.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
        });
    
        window.dispatchEvent(new Event('cartUpdated'));
    };
    
    const decreaseQuantity = (productId) => {
        let cartItemIds = JSON.parse(localStorage.getItem("cart")) || [];
        
        const updatedCartItems = cartItems.map(item => {
            if (item.id === productId && item.quantity > 1) {
                item.quantity -= 1;
    
                const index = cartItemIds.indexOf(productId);
                if (index !== -1) {
                    cartItemIds.splice(index, 1);
                }
            }
            return item;
        });
    
        localStorage.setItem("cart", JSON.stringify(cartItemIds));
        setCartItems(updatedCartItems);
    
        window.dispatchEvent(new Event('cartUpdated'));
    };
    
    
    const handleProceedToCheckout = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            alert("Oops! Your cart is empty. Start adding products to your cart and shop away!");
            return; 
        }
        localStorage.removeItem("cart");  
        navigate("/checkoutpage");
    };

    return (
        <div className="container m-auto p-3 mt-[80px] max-w-[800px]">
            <div className="container font-marcellus text-xl font-bold text-center">
                <h2 className="tracking-widest">CHECKOUT</h2>
                <p className="font-rokkitt font-regular text-custom-dark text-lg">Review Your Order</p>
            </div>
            <div className="block md:flex mb-[240px]">
                <div className="cart-items-container container block w-full max-w-[450px] m-auto my-5 text-center border-t border-custom-medium">
                    {cartItems.length === 0 ? (
                        <div className="row my-4 m-auto text-center uppercase font-bold bg-custom-light p-3">
                            <p>Your cart is empty</p>
                            <Link to="/">
                                <button className="text-custom-dark hover:underline hover:text-custom-deep mt-3">
                                    Go back to shopping
                                </button>
                            </Link>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <CartItemsTemplate 
                                key={item.id}
                                products={item} 
                                onRemove={removeItemFromCart} 
                                onIncrease={increaseQuantity}
                                onDecrease={decreaseQuantity}
                            />
                        ))
                    )}
                </div>

                <div className="container m-auto fixed bg-custom-light justify-center border-t-[2px] border-custom-deep bottom-10 inset-x-0 pb-12 max-w-[1100px]">
                    <div className="container block font-rokkitt max-w-[400px] m-auto p-3">
                        <div className="flex m-auto justify-between">
                             <h3 className="text-sm md:text-xl font-medium uppercase">Total Price</h3>
                            <p className="font-semibold text-lg md:text-xl">
                                <CalculateOriginalPrice products={cartItems} />
                            </p>
                        </div>
                        <div className="flex m-auto justify-between text-custom-sale -mt-2">
                            <h3 className="text-sm md:text-xl font-medium uppercase">Discount</h3>
                            <p className="font-semibold text-lg md:text-xl">
                                <CalculateDiscount products={cartItems} />
                            </p>
                        </div>
                        <div className="flex m-auto justify-between">
                            <h3 className="text-xl md:text-2xl font-medium uppercase ">SubTotal</h3>
                            <p className="font-semibold text-xl md:text-2xl">
                                <CalculateTotalPrice products={cartItems} />
                            </p>
                        </div>
                       
                    </div>

                    <div className="flex justify-center mt-1">
                        <Link
                            to="/checkoutpage"
                            onClick={handleProceedToCheckout} 
                            className="my-1 px-2 bg-white font-rokkitt font-bold text-custom-deep rounded-lg hover:bg-custom-deep hover:text-custom-light uppercase border-2 border-custom-deep"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
