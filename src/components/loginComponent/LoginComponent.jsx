import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import "./loginComponent.css";

export default function LoginComponent({
  onLogout,
  isLoggedIn,
  user,
  onLoggedIn,
  onSetUser
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = handleSubmit((data, e) => {
    e.preventDefault();
    let role = "user";

    if (data.email.includes("@admin")) {
        role = "admin";
    }

    const userData = {name: data.name, email: data.email , role: role};
    onSetUser(userData);
    onLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    
    if (location.state != null) {
      navigate(location.state.pathname);
    }
    
  });

  const handleLogout = (e) => {
    e.preventDefault();
    onSetUser(null);
    onLoggedIn(false);
    localStorage.removeItem("user");
    navigate("/");
  };

  const handlePasswordValidation = () => {
    if (errors.password) {
      clearErrors();
    }
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    if (password.lenght < 6) {
      setError("password", {
        message: "La contraseña debe tener al menos 6 caracteres.",
      });
    }

    if (password !== confirmPassword) {
      setError("confirmPassword", {
        message: "Las contraseñas no coinciden.",
      });
    }

    if (password === confirmPassword) {
      clearErrors();
    }
  };

  const handleEmailValidation = () => {
    const email = watch("email");

    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      setError("email", {
        message: "Ingrese una dirección de correo electrónica válida.",
      });
    }
  };

  return (
    <section className="loginContainer">
      <form action="" className="loginForm">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          {...register("name", {
            required: "Por favor, ingrese su nombre.",
            minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres."
            },
            maxLength: {
                value: 40,
                message: "El nombre no debe superar los 40 caracteres."
            },
          })}
          
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          {...register("email", {
            required: "Por favor, ingrese su email."
          })}
          onBlur={() => handleEmailValidation()}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          {...register("password", {
            required: "Por favor, ingrese su contraseña.",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
          onBlur={() => handlePasswordValidation()}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
        <label htmlFor="confirmPassword">Repetir contraseña</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Por favor, repita su contraseña",
          })}
          onBlur={() => handlePasswordValidation()}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
        {!isLoggedIn ? (
          <>
            <button className="loginButton" onClick={handleLogin}>
              Login
            </button>
          </>
        ) : (
          <>
            <button className="logoutButton" onClick={handleLogout}>
              Logout
            </button>
            <p>¿{user.name}, quieres cerrar la sesión?</p>
          </>
        )}
      </form>
    </section>
  );
}
