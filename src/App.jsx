import React from 'react';
import Layout from './components/Layout/layout';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage'; 
import ShoppingCart from './Pages/Shoppingcart';
import { Routes, Route } from 'react-router-dom';
import CheckoutSuccessPage from './Pages/CheckoutPage';
import ContactPage from './Pages/ContactPage';
import AllProducts from './Pages/ProductsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="shoppingcart" element={<ShoppingCart />} />
          <Route path="checkoutpage" element={<CheckoutSuccessPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
