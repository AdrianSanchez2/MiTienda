/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Header from './components/header/Header';
import Discount from './components/discount/DiscountMessage';
import Footer from './components/footer/Footer';
import CardList from './components/cardList/CardList';
import './App.css'

import productsData from '../data.json';

function App() {
  const [filter, setFilter] = useState("");
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  }

  return (
    <>
      <Header onFilterChange={handleFilterChange}/>
      <Discount message={"¡20% de descuento para nuevos clientes!"}/>
      <CardList products={productsData} filter={filter}/>
      <Footer/>
    </>
  )
}

export default App
