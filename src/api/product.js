import axios from "axios";

const API_URL = "http://localhost:3000/productos";

export const addProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getProductDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const editProduct = async (id, updatedProduct) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const removeProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}