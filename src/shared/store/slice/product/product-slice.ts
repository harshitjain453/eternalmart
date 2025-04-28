import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchProducts } from './api';


interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}


interface ProductState {
    // details: productDetail; listings: productListing;
    listings: {
        items: Product[];
        loading: boolean;
        error: string | null;
    };
    categories: string[];

}
const initialState: ProductState = {

    listings: {
        loading: false,
        error: null,
        items: []

    },
    categories: []
}


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<string[]>) => {
            state.categories = action.payload;
        },
        loadProductsFromStorage: (state) => {
            const cachedProducts = localStorage.getItem("products");
            const cachedCategories = localStorage.getItem("categories");

            if (cachedProducts) {
                state.listings.items = JSON.parse(cachedProducts);
            }

            if (cachedCategories) {
                state.categories = JSON.parse(cachedCategories);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {

            state.listings.loading = true

            state.listings.error = null
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {

            state.listings.loading = false

            state.listings.items = action.payload


            // Extract unique categories

            const categories = [...new Set(action.payload.map((product: Product) => product.category))];
            //@ts-ignore
            state.categories = categories;


            // Save to localStorage
            localStorage.setItem("products", JSON.stringify(state.listings.items));
            localStorage.setItem("categories", JSON.stringify(state.categories));


        })
        builder.addCase(fetchProducts.rejected, (state, action) => {

            state.listings.loading = false

            state.listings.error = action.payload as string
        })

    }

})
export const { loadProductsFromStorage } = productSlice.actions;

export default productSlice.reducer