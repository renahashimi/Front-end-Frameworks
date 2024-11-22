import React, { useEffect, useState } from "react";
import { apiUrl } from "../../api/constants";
import CartItemsTemplate from "../Templates/CartProduct";
import { Link } from "react-router-dom";

function ShoppingCart({ products, onRemove }) {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    // Fetch cart items from localStorage
    useEffect(() => {
        const cartItemIds = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("Cart Item IDs:", cartItemIds);

        const fetchCartItems = async () => {
            try {
                if (cartItemIds.length === 0) {
                    setError("Your cart is empty.");
                    return;
                }

                const productPromises = cartItemIds.map(id => {
                    const requestUrl = `${apiUrl}` + id;
                    console.log("Fetching from:", requestUrl); 
                    return fetch(requestUrl)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Product with ID ${id} not found.`);
                            }
                            return response.json();
                        });
                });

                const products = await Promise.all(productPromises);

                console.log("Fetched Products:", products);

                const validProducts = products
                    .map((product) => product.data)  // Assuming 'product.data' contains the relevant product info
                    .filter((data) => data);

                if (validProducts.length === 0) {
                    setError("No products found in your cart.");
                    return;
                }

                setCartItems(validProducts);
            } catch (err) {
                console.error("Error fetching cart items:", err);
                setError("There was an error loading your cart items.");
            }
        };

        if (cartItemIds.length > 0) {
            fetchCartItems();
        } else {
            setError("Your cart is empty.");
        }
    }, []);

    // Remove item from cart
    const removeItemFromCart = (productId) => {
        let cartItemIds = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCartIds = cartItemIds.filter(itemId => itemId !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCartIds));
        setCartItems(cartItems.filter(item => item.id !== productId)); 
        window.dispatchEvent(new Event('cartUpdated'))
    };

    return (
        <div className="container p-3 mt-[80px]">
            <div>
                <h2 className="container font-marcellus text-xl font-bold text-center">CHECKOUT PAGE</h2>
            </div>

            <div className="cart-items-container container block w-full max-w-[450px] m-auto my-5 text-center border-t border-custom-medium">
                {cartItems.length === 0 ? (
                    <div className="row my-4 m-auto text-center uppercase font-bold">
                        <p>Your cart is empty</p>
                        <Link to="/">
                            <button className="text-custom-dark hover:underline hover:text-custom-deep mt-3">
                                Go back to shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    cartItems.map((item, index) => (
                        <CartItemsTemplate 
                            key={item.id || index}
                            products={item} 
                            onRemove={removeItemFromCart} 
                        />
                    ))
                )}
            </div>

            <div className="container border-t-[2px] border-custom-deep mt-5">
                <h3 className="text-lg font-bold">Total</h3>
                <button className="mt-3 p-2 bg-custom-dark text-white rounded hover:bg-custom-deep">
                    <Link to="/CheckoutPage">Proceed to Checkout</Link>
                </button>
            </div>
        </div>
    );
}

export default ShoppingCart;
