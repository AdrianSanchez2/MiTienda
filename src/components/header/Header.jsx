/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import './header.css';
import { ThemeContext } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header({ onFilterChange, cartItemCount }) {
    const { isLoggedIn } = useAuth();
    const handleFilterChange = (event) => {
        onFilterChange(event.target.value);
    }

    const { toogleTheme } = useContext(ThemeContext);
    return (
        <nav className='header'>
            <ul className='header-item-list'>
                <li className='list-item'><b><Link className='link_style_none' to={"/"}>MiTienda</Link></b></li>
                <li className='list-item'>CATEGORÍAS</li>
                <li className='list-item'>OFERTAS</li>
                <li className='list-item'>CONTACTO</li>
                <li className='list-item'>
                    <input className='buscador' type="text" name="buscador" id="buscador" placeholder='Buscar productos' onChange={handleFilterChange}/>
                </li>
                <li className='list-item'>
                    <Link className='link_style_none' to={"/cart"}><i className="fa-solid fa-cart-shopping"></i></Link>
                    {cartItemCount > 0 && <span className='cart-item-count'>{cartItemCount}</span>}
                </li>
                <li className="list-item" onClick={toogleTheme}><i className="fa-solid fa-circle-half-stroke"></i></li>
                <li className='list-item'><i className="fa-solid fa-heart"></i></li>
                <li className='list-item'><Link className='link_style_none' to={"/login"}><i className="fa-solid fa-user"></i></Link></li>
            </ul>
        </nav>
    )
}