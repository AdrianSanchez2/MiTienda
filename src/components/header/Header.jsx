/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './header.css';

export default function Header({ onFilterChange }) {
    const handleFilterChange = (event) => {
        onFilterChange(event.target.value);
    }
    return (
        <nav className='header'>
            <ul className='header-item-list'>
                <li className='list-item'><b>MiTienda</b></li>
                <li className='list-item'>INICIO</li>
                <li className='list-item'>CATEGORÍAS</li>
                <li className='list-item'>OFERTAS</li>
                <li className='list-item'>CONTACTO</li>
                <li className='list-item'>
                    <input className='buscador' type="text" name="buscador" id="buscador" placeholder='Buscar productos' onChange={handleFilterChange}/>
                </li>
                <li className='list-item'><i className="fa-solid fa-cart-shopping"></i></li>
                <li className='list-item'><i className="fa-solid fa-heart"></i></li>
                <li className='list-item'><i className="fa-solid fa-user"></i></li>
            </ul>
        </nav>
    )
}