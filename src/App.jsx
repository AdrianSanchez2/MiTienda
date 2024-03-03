/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import Header from './components/header/Header';
import Discount from './components/discount/DiscountMessage';
import Footer from './components/footer/Footer';
import CardList from './components/cardList/CardList';
import CartList from './components/cartList/CartList';

import { ThemeContext } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';

import './App.css'

import LoginComponent from './components/loginComponent/LoginComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './components/productDetails/ProductDetails';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import NotFound from './views/NotFound';

function App() {
  const [filter, setFilter] = useState("");
  const [cart, setCart] = useState([]);

  const { theme } = useContext(ThemeContext);
  const { user, isLoggedIn, login, logout } = useAuth();

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  }

  const addToCart = (productToAdd) => {
    const existingCartItem = cart.find(item => item.product.id === productToAdd.id);

    if (existingCartItem) {
      setCart(prevCart => {
        return prevCart.map(item =>
          item.product.id === productToAdd.id ? {...item, quantity: item.quantity + 1} : item
        );
      });
    } else {
      setCart(prevCart => [...prevCart, {product: productToAdd, quantity: 1}]);
    }
  }

  const handleCheckout = () => {
    setCart([]);
    alert("Serás redirigido a la pagina de tramitación del pedido");
  }

  const handleRemoveFromCart = () => {
    setCart([]);
    alert("El carrito se ha vaciado correctamente");
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <BrowserRouter>
      <section id='body' className={`${theme}`}>
        <Header onFilterChange={handleFilterChange} cartItemCount={cartItemCount}/>
        {isLoggedIn ? (
          <Discount message={`¡${user.name}, ahora tienes un 20% de descuento!`}/>
        ) : (
          <Discount message={"¡20% de descuento para nuevos clientes!"}/>
        )}
        <Routes>
          <Route path='/' element={<CardList filter={filter} addToCart={addToCart}/>}/>
          <Route path='/cart' element={
            <ProtectedRoute>
              <CartList cart={cart} onCheckout={handleCheckout} onRemoveFromCart={handleRemoveFromCart}/>
            </ProtectedRoute>
          }/>
          <Route path='/product/:id' element={
            <ProtectedRoute>
              <ProductDetails addToCart={addToCart}/>
            </ProtectedRoute>
          }/>
          <Route path='/login' element={<LoginComponent onLogin={login} onLogout={logout} isLoggedIn={isLoggedIn} user={user}/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer/>
    </section>
    </BrowserRouter>
  )
}

export default App;