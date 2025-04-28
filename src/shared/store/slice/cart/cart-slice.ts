import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
    totalQuantity: 0,
    totalPrice: 0,

};

const calculateTotals = (items: CartItem[]) => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            const { totalQuantity, totalPrice } = calculateTotals(state.items);
            state.totalQuantity = totalQuantity;
            state.totalPrice = totalPrice;
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            const { totalQuantity, totalPrice } = calculateTotals(state.items);
            state.totalQuantity = totalQuantity;
            state.totalPrice = totalPrice;
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        loadCartFromStorage: (state) => {
            const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
            state.items = items;
            const { totalQuantity, totalPrice } = calculateTotals(state.items);
            state.totalQuantity = totalQuantity;
            state.totalPrice = totalPrice;
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item) {
                item.quantity = quantity;

                // Recalculate totals
                state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
                state.totalPrice = state.items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, removeFromCart, loadCartFromStorage, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
