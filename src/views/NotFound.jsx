import { Link } from "react-router-dom"

const NotFound = () => {
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      };
    
      const h1Style = {
        marginBottom: "20px", // Espaciado opcional entre el título y el enlace
      };
      const linkStyle = {
        border: "1px solid white",
        borderRadius: "0.5rem",
        backgroundColor: "rgb(40, 147, 219)",
        color: "aliceblue",
        padding: "10px 15px",
        textDecoration: "none",
      };
    return (
        <div style={containerStyle}>
            <h1 style={h1Style}>Page not found</h1>
            <Link style={linkStyle}  to="/">Volver a la pagina principal</Link>
        </div>
    )
}

export default NotFound;