import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:5000/api/v1';


interface ProductState {
    items: Product[];
    product: Product | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    product: null,
    loading: false,
    error: null,
};

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        const response = await axios.get<{ products: Product[] }>('/product');
        return response.data.products;
    }
);

export const getProduct = createAsyncThunk(
    'products/getProduct',
    async (id: number) => {
        const response = await axios.get<{ product: Product }>(`/product/${id}`);
        return response.data.product;
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (formData: FormData) => {
        const response = await axios.post<Product>('/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, product }: { id: number; product: Partial<Product> }) => {
        const response = await axios.patch<{ updatedProduct: Product }>(`/product/${id}`, product, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.updatedProduct;
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id: number) => {
        await axios.delete(`/product/${id}`);
        return id;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Products
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })
            // Get Single Product
            .addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch product';
            })
            // Create Product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create product';
            })
            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                if (state.product?.id === action.payload.id) {
                    state.product = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update product';
            })
            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
                if (state.product?.id === action.payload) {
                    state.product = null;
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete product';
            });
    },
});

export default productSlice.reducer; 