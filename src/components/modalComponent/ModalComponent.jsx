import React from "react";
import "./ModalComponent.css";
import { useForm } from "react-hook-form";

const ModalComponent = ({
  isOpen,
  onClose,
  onCloseModal,
  onHandleInputChange,
  onSubmit,
  title,
  price,
  description,
  image,
  category,
  id,
  onSetEditProduct,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur"});

  const handleFormSubmit = handleSubmit((data, e) => {
    e.preventDefault();
    onSubmit(id);
    onClose();
  });

  const handleOnClose = () => {
    onSetEditProduct();
    onClose();
  }

  const renderError = (field) => {

    return errors[field] && <span className="error">{errors[field].message}</span>
  }
  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className="modal-content">
        {id === null ? <h2>Nuevo Producto</h2> : <h2>Modificar Producto</h2>}
        <form onSubmit={handleFormSubmit}>
          <ul className="modal_inputs">
            <li>
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={title}
                {...register("title", {
                  required: "Por favor ingrese un nombre al producto.",
                  minLength: {
                    value: 5,
                    message: "El nombre del producto debe tener al menos 5 caracteres."
                  },
                  maxLength: {
                    value: {
                      value: 40,
                      message: "El nombre del producto no debe superar los 40 caracteres."
                    }
                  }
                })}
                onChange={(e) => {onHandleInputChange(e);}}
              />
              {renderError("title")}
            </li>
            <li>
              <label htmlFor="price">Precio:</label>
              <input
                type="text"
                id="price"
                name="price"
                defaultValue={price}
                {...register("price", {
                  required: "Por favor ingrese un precio al producto.",
                  validate: (value) => parseFloat(value) > 0 || "El precio debe ser mayor que 0."
                })}
                onChange={(e) => { onHandleInputChange(e);}}
              />
              {renderError("price")}
            </li>
            <li>
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                name="description"
                defaultValue={description}
                {...register("description", {
                  required: "Por favor ingrese una descripción al producto.",
                  minLength: {
                    value: 5,
                    message: "La descripción debe tener al menos 5 caracteres."
                  },
                  maxLength: {
                    value: {
                      value: 40,
                      message: "La descripción no debe superar los 40 caracteres."
                    }
                  }
                })}
                onChange={(e) => { onHandleInputChange(e);}}
              />
              {renderError("description")}
            </li>
            {id === null && (
              <>
                <li>
                  <label htmlFor="category">Categoría:</label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    defaultValue={category}
                    {...register("category", {
                      required: "Por favor ingrese una categoría al producto.",
                      minLength: {
                        value: 5,
                        message: "La categoría debe tener al menos 5 caracteres."
                      },
                      maxLength: {
                        value: {
                          value: 40,
                          message: "La categoría no debe superar los 40 caracteres."
                        }
                      }
                    })}
                    onChange={(e) => { onHandleInputChange(e);}}
                  />
                  {renderError("category")}
                </li>
                <li>
                  <label htmlFor="image">Imagen:</label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    defaultValue={image}
                    {...register("image", {
                      required: "Por favor ingrese una URL de imagen.",
                      pattern: {
                        value: /^https?:\/\/\S+\.(?:jpg|jpeg|png|gif)$/i,
                        message: "Por favor, ingrese una URL de imagen válida (formatos admitidos: jpg, jpeg, png, gif)."
                      }
                    })}
                    onChange={(e) => { onHandleInputChange(e);}}
                  />
                  {renderError("image")}
                </li>
              </>
            )}
          </ul>
          <section className="buttons_section">
            <button className="submitBtn" type="submit">
              Guardar
            </button>
            <button className="cancelBtn" type="button" onClick={handleOnClose}>
              Cancelar
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default ModalComponent;
