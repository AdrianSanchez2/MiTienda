import React, { useEffect, useState } from "react";
import CardComponent from "../cardComponent/CardComponent";
import "./cardList.css";
import { useAuth } from "../../context/AuthContext";
import useProducts from "../../hooks/useProducts";
import ModalComponent from "../modalComponent/ModalComponent";
import { RingLoader } from "react-spinners";
import { getAllProducts, getAllProductsThunk, removeProductThunk, addProductThunk, editProductThunk} from "../../redux/reducers/productsReducer";
import { useDispatch, useSelector } from "react-redux";

const CardList = ({ filter, addToCart }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const products = useSelector((state) => state.products.products);
  const [loading, setLoading] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    title: "",
    price: "",
    description: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setTimeout(() => {
        dispatch(getAllProductsThunk());
        setLoading(false);
      }, 1000);
    };
    fetchProducts();
  }, [dispatch])

  const handleAddNewProduct = () => {
    setEditedProduct({id:null, title: "", price: "", description: ""});
    console.log("Edited Product After Adding New Product:", editedProduct);
    setIsModalOpen(true);
  };

  const handleEditProduct = (id, title, price, description) => {
    const selectedProduct = products.find((product) => product.id === id);
    setEditedProduct({...selectedProduct, title, price, description});
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    await dispatch(removeProductThunk(id));
    setLoading(true);
    setTimeout(() => {
      dispatch(getAllProductsThunk());
      setLoading(false);
    },1000)
  }

  const handleSaveProduct = async (id) => {
    if (editedProduct.id) {
      await dispatch(editProductThunk({id: editedProduct.id, updatedProduct: editedProduct}));
    } else {
      await dispatch(addProductThunk(editedProduct));
    }
    setLoading(true);
    setTimeout(() => {
      dispatch(getAllProductsThunk());
      setLoading(false);
    },1000);
    setIsModalOpen(false);
    setEditedProduct({id:null, title: "", price: "", description: ""});
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setEditedProduct({...editedProduct, [name]: value});
    console.log("Edited Product After Input Change:", editedProduct);
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className="card-list-container">
      {loading ? (
        <RingLoader
          size={150}
          color="#2893db"
          loading={loading}
        />
      ) : (
        filteredProducts.map((product) => (
          <CardComponent
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            image={product.image}
            onDelete={() => handleDeleteProduct(product.id)}
            onEdit={() =>
              handleEditProduct(
                product.id,
                product.title,
                product.price,
                product.description
              )
            }
            onAddToCart={() => addToCart(product)}
          />
        ))
      )}

      {user && user.role === "admin" && (
        <button
          className="add_new_product_btn"
          onClick={() => handleAddNewProduct(null, "", "", "")}
        >
          Añadir nuevo producto
        </button>
      )}

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onHandleInputChange={handleInputChange}
        onSubmit={handleSaveProduct}
        title={editedProduct.title}
        price={editedProduct.price}
        description={editedProduct.description}
        id={editedProduct.id}
      />
    </div>
  );
};

export default CardList;
