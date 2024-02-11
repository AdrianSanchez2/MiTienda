/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import './cardComponent.css';

const CardComponent = ({title, price, description, image, onAddToCart}) => {
    const { theme } = useContext(ThemeContext);

    const handleAddToCart = () => {
        onAddToCart({title, price, description, image});
    }
    return(
        <section className={`card-container ${theme}`}>
            <article className="card-header">
                <img className="card-image" src={image} alt={title} />
                <h3>{title}</h3>
            </article>
            <article className="card-content">
                <p className="product-description">{description}</p>
            </article>
            <article className="price-container">
                <h3 className="price">${price}</h3>
            </article>
            <button className="addProductButton" onClick={handleAddToCart}>Agregar al Carrito</button>
        </section>
    )
}

export default CardComponent;