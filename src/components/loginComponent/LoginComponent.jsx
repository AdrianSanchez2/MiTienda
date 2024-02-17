/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './loginComponent.css';

export default function LoginComponent({ onLogin, onLogout, isLoggedIn, user}){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin(name, email);
        setEmail('');
        setName('')
        navigate(location.state.pathname)
    }

    const handleLogout = (e) => {
        e.preventDefault();
        onLogout();
        navigate("/");
    }

    return(
        <section className="loginContainer">
            <form action="" className='loginForm'>
                <label htmlFor="name">Nombre:</label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {!isLoggedIn ? (
                    <>
                        <button className='loginButton' onClick={handleLogin}>Login</button>
                    </>
                ) : (
                    <>
                        <button className="logoutButton" onClick={handleLogout}>Logout</button>
                        <p>¿{user.name}, quieres cerrar la sesión?</p>
                    </>
                )}
            </form>
        </section>
    );
}