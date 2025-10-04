import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Base URL: proxy in dev, env var in prod
const baseURL =
  import.meta.env.MODE === "development"
    ? "" // proxy will handle `/api`
    : import.meta.env.VITE_BACKEND_URL;

    export interface Product {
  _id: string;
  name: string;
  image: string;
  description?: string;
  price: number;
  sku: string;
  countInStock: number;
  category?: string;
  gender: string;
  collections: string;
  brand?: string;
  createdAt?: string;
  updatedAt?: string;
}

// async thunk to fetch all products - admin only
export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchAdminProducts", async () => {
    const response = await axios.get(`${baseURL}/api/admin/products`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
    });
    return response.data;
});

// async function to create new product
export const createProduct = createAsyncThunk("adminProducts/createProduct", async (productData) => {
    
        const response = await axios.post(`${baseURL}/api/admin/products`, productData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    });

    // async function to update product
export const updateProduct = createAsyncThunk("adminProducts/updateProduct", async ({id, productData}: {id: string, productData: FormData}) => {
    const response = await axios.put(`${baseURL}/api/admin/products/${id}`, productData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
    });
    return response.data;
});

// async function to delete product
export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct", async (id: string) => {
    await axios.delete(`${baseURL}/api/products/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
    });
    return id;
});

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [] as Product[],
        loading: false,
        error: null as null | string,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAdminProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAdminProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchAdminProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch products";
        })
        // Create product
        .addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload);
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to create product";
        })
        // Update product
        .addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.products.findIndex((product) => product._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to update product";
        })
        // Delete product
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.filter((product) => product._id !== action.payload);
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to delete product";
        });
    },
});

export default adminProductSlice.reducer;
