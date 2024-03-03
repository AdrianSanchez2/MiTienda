import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const API_URL = "http://localhost:3000/productos";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    title: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // const getProducts = async () => {
  //   try {
  //     setLoading(true);
  //     setTimeout(async () => {
  //       const response = await axios.get(API_URL);
  //       setProducts(response.data);
  //       setLoading(false);
  //     }, 1000);
  //   } catch (error) {
  //     console.error("Error fetching products: ", error);
  //   }
  // };

  const getProductDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching product details: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      setTimeout(async () => {
        await axios.delete(`${API_URL}/${id}`);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const handleSave = () => {
    if (editedProduct.id !== null && editedProduct.id !== undefined) {
      editProduct();
    } else {
      createProduct();
    }
  };

  const createProduct = async () => {
    try {
      setLoading(true);
      const newId = uuid();
      const newProduct = { ...editedProduct, id: newId };
      setTimeout(async () => {
        const response = await axios.post(API_URL, newProduct);
        setProducts((prevProducts) => [...prevProducts, response.data]);
        setEditedProduct({ id: null, title: "", price: "", description: "" });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error adding products: ", error);
    }
  };

  const editProduct = async () => {
    try {
      setLoading(true);
      setTimeout(async () => {
        const response = await axios.put(
          `${API_URL}/${editedProduct.id}`,
          editedProduct
        );
        const updatedProduct = response.data;
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setEditedProduct({ id: null, title: "", price: "", description: "" });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleEditProductDetails = (id, title, price, description) => {
    const selectedProduct = products.find((product) => product.id === id);
    setEditedProduct({ ...selectedProduct, title, price, description });
  };

  return {
    products,
    editedProduct,
    loading,
    deleteProduct,
    handleEditProductDetails,
    handleSave,
    handleInputChange,
    getProductDetails,
    setLoading,
  };
};

export default useProducts;
