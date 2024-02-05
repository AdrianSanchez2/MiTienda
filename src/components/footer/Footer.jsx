/* eslint-disable no-unused-vars */
import React from "react";
import './footer.css';

export default function Footer() {
    return(
        <div className="footer-container">
            <section className="footer-info">
                <ul className="contact-info">
                    <li><b>Contacto</b></li>
                    <li>Email: info@mitienda.com</li>
                    <li>Teléfono: +34 123 456 789</li>
                </ul>
                <ul className="social-media-info">
                    <li><b>Redes Sociales</b></li>
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                </ul>
                <ul className="address-info">
                    <li><b>Dirección</b></li>
                    <li>Calle Principal, 123</li>
                    <li>Ciudad, París</li>
                </ul>
            </section>
            <section className="copyright">
                <p>© 2023 MiTienda. Todos los derechos reservados</p>
            </section>
        </div>
    )
}