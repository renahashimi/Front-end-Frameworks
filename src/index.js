import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();



// function handleAddToCart(id, quantity = 1) {
//   const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

//   const existingItemIndex = currentCart.findIndex(item => item.id === id);

//   if (existingItemIndex >= 0) {
//       currentCart[existingItemIndex].quantity += quantity;
//   } else {
//       currentCart.push({ id, quantity });
//   }

//   localStorage.setItem('cart', JSON.stringify(currentCart));

//   window.dispatchEvent(new Event('cartUpdated'));

//   setNotification(`"${products.title}" has been added to your cart`);

//   setTimeout(() => {
//       setNotification('');
//   }, 3000);
// }