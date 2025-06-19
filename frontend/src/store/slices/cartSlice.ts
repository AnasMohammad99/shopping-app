import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types';

interface CartState {
    items: CartItem[];
    total: number;
}

const initialState: CartState = {
    items: [],
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.cartQuantity < existingItem.quantity) {
                    existingItem.cartQuantity += 1;
                    state.total += existingItem.price;
                }
            } else {
                state.items.push({ ...action.payload, cartQuantity: 1 });
                state.total += action.payload.price;
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const index = state.items.findIndex((item) => item.id === action.payload);
            if (index !== -1) {
                const item = state.items[index];
                state.total -= item.price * item.cartQuantity;
                state.items.splice(index, 1);
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item && item.cartQuantity > 1) {
                item.cartQuantity -= 1;
                state.total -= item.price;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
        updateCartItem: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                const oldItem = state.items[index];
                const newItem = action.payload;
                state.total -= oldItem.price * oldItem.cartQuantity;
                state.total += newItem.price * oldItem.cartQuantity;
                state.items[index] = { ...newItem, cartQuantity: oldItem.cartQuantity };
            }
        },
    },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer; 