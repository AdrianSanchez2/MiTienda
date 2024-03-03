import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as PRODUCT_API from '../../api/product';
import { v4 as uuid } from "uuid";

//Thunks
export const addProductThunk = createAsyncThunk("products/addProduct", async (product) => {
    try {
        const id = uuid();
        const productWithId = {...product, id: id};
        return await PRODUCT_API.addProduct(productWithId);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const removeProductThunk = createAsyncThunk("products/removeProducts", async (id) => {
    try {
        return await PRODUCT_API.removeProduct(id);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const editProductThunk = createAsyncThunk("products/editProduct", async ({id, updatedProduct}) => {
    try {
        return await PRODUCT_API.editProduct(id, updatedProduct);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getAllProductsThunk = createAsyncThunk("products/getAllProducts", async () => {
    try {
        return await PRODUCT_API.getAllProducts();
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getProductDetailsThunk = createAsyncThunk("products/getProductDetails", async (id) => {
    try {
        return await PRODUCT_API.getProductDetails(id);
    } catch (error) {
        throw new Error(error.message);
    }
})

//Slice
const initialState = {
    products: [],
    loading: false,
    error: null,
    selectedProduct: null
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(addProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(removeProductThunk.fulfilled, (state, action) => {
                state.loading = false
                state.products.filter((product) => product.id !== action.payload);
            })
            .addCase(editProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload;
                state.products = state.products.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                );
            })
            .addCase(getProductDetailsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) =>action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                }
            )
    }
})

export const { fetchAllProducts, addProduct, removeProduct, editProduct, getProductDetails } = productSlice.actions;

export const getAllProducts = (state) => state.products.products;
export const getProductsError = (state) => state.products.error;
export const getProductsLoading = (state) => state.products.loading;
export const getSelectedProduct = (state) => state.products.selectedProduct;

export default productSlice.reducer;