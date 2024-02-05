/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import CardComponent from "../cardComponent/CardComponent";
import './cardList.css';

const CardList = ({ products, filter }) => {
    const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
    );
    return (
        <div className="card-list-container">
            {filteredProducts.map((product) => (
                <CardComponent
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    image={product.image}
                />
            ))}
        </div>
    );
}

export default CardList;