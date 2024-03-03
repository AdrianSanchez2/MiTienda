import React from "react";
import './discount.css';

export default function Discount(props) {
    return(
        <div className="discount-container">
            <section className="discount-section">
                <p className="message">{props.message}</p>
            </section>
        </div>
    );
}