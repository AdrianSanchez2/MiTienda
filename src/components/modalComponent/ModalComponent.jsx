import React from "react";
import './ModalComponent.css';

const ModalComponent = ({ isOpen, onClose, onCloseModal, onHandleInputChange, onSubmit, title, price, description, image, category, id }) => {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit();
        onClose();
    }
  return (
    <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
      <div className="modal-content">
        {id === null ? (
          <h2>Nuevo Producto</h2>
        ): (
          <h2>Modificar Producto</h2>
        )}
        <form onSubmit={handleFormSubmit}>
          <ul className="modal_inputs">
            <li>
              <label htmlFor="title">Título:</label>
              <input type="text" id="title" value={title} onChange={onHandleInputChange} name="title" />
            </li>
            <li>
              <label htmlFor="price">Precio:</label>
              <input type="text" id="price" value={price} onChange={onHandleInputChange} name="price" />
            </li>
            <li>
              <label htmlFor="description">Descripción:</label>
              <textarea id="description" value={description} onChange={onHandleInputChange} name="description" />
            </li>
            {id === null && (
              <>
                <li>
                  <label htmlFor="category">Categoría:</label>
                  <input type="text" name="category" id="category" value={category} onChange={onHandleInputChange} />
                </li>
                <li>
                  <label htmlFor="image">Imagen:</label>
                  <input type="text" name="image" id="image" value={image} onChange={onHandleInputChange}/>
                </li>
              </>
            )}
          </ul>
          <section className="buttons_section">
            <button className="submitBtn" type="submit">Guardar</button>
            <button className="cancelBtn" type="button" onClick={onClose}>Cancelar</button>
          </section>
        </form>
        
      </div>
    </div>
  );
};

export default ModalComponent;
