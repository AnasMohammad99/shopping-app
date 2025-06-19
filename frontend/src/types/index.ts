export interface Product {
    id: number;
    name: string;
    weight: number;
    price: number;
    quantity: number;
    picture: string;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem extends Product {
    cartQuantity: number;
}

export interface RootState {
    products: Product[];
    cart: CartItem[];
    loading: boolean;
    error: string | null;
} 