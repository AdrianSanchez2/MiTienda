/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import './cardComponent.css';

const CardComponent = ({title, price, description, image}) => {
    return(
        <section className="card-container">
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
        </section>
    )
}

export default CardComponent