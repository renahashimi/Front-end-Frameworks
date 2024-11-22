import React from 'react';
import Layout from './components/Layout/layout';
import Home from './Pages/HomePage';
import ProductPage from './Pages/ProductsPage'; 
import { Routes, Route } from 'react-router-dom';
import ShoppingCart from './Pages/Shoppingcart';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="shoppingcart" element={<ShoppingCart />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
