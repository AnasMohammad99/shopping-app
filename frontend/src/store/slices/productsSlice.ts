import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Product } from '../../types';

interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
};

const API_URL = 'http://localhost:5000/api/v1';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get(`${API_URL}/product/`);
        return response.data.products;
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
        const response = await axios.post(`${API_URL}/product/`, product);
        return response.data.newProduct;
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, product }: { id: number; product: Partial<Product> }) => {
        const response = await axios.patch(`${API_URL}/product/${id}`, product);
        return response.data.updatedProduct;
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id: number) => {
        await axios.delete(`${API_URL}/product/${id}`);
        return id;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export default productsSlice.reducer; 