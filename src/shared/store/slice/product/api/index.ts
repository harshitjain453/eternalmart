import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductService } from '../../../../../infra/api/services'


export const fetchProducts = createAsyncThunk("/product/listing", async (_, { rejectWithValue }) => {
    try {
        const response = await ProductService.productsListing.getAllProducts();

        return response; // This becomes `action.payload`
    } catch (error) {
        return rejectWithValue(error);
    }
})


export const fetchProductByProductId = createAsyncThunk("/product/detail", ({ productId }: { productId: any }, { rejectWithValue }) => {
    try {
        const response = ProductService.productsDetail.getProductDetail(productId)
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }

})