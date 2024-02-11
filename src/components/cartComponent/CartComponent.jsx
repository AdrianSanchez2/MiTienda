/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import './cartComponent.css';

export default function CartComponent({title, price, quantity, image}) {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`cart-component ${theme}`}>
            <div className="cart-image-container">
                <img className="cart-image" src={image} alt={title} />
                <div className="quantity-badge">{quantity}</div>
            </div>
            <ul className="cart-details">
                <li><strong>{title}</strong></li>
                <li>Precio por unidad: ${price}</li>
                <li>Precio total: ${price * quantity}</li>
            </ul>
        </div>
    )
}