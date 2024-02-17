/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import CartComponent from "../cartComponent/CartComponent";
import './cartList.css';

export default function CartList({ cart, onCheckout, onRemoveFromCart }) {
    const calculateTotal = () => {
        const total = cart.reduce((total, cartItem) => {
            return total += (cartItem.product.price * cartItem.quantity);
        }, 0);
        return total.toFixed(2);
    };

    const handleCheckout = () => {
        onCheckout();
    }

    const handleRemoveFromCart = () => {
        onRemoveFromCart();
    }

    return(
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cart.length > 0 ? (
                cart.map((cartItem) => (
                    <CartComponent
                        key={cartItem.product.id}
                        title={cartItem.product.title}
                        price={cartItem.product.price}
                        quantity={cartItem.quantity}
                        image={cartItem.product.image}
                    />
            ))
            ) : (
                <p>Tu carrito esta vacio</p>
            )}
            <div className="cart-footer">
                <button className="buttonCheckout" onClick={handleCheckout}>Finalizar compra</button>
                <button className="buttonRemove" onClick={handleRemoveFromCart}>Vaciar carrito</button>
                <h3 className="total">Total a Pagar: ${calculateTotal()}</h3>
            </div>
      </div>
    )
}