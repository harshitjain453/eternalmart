import { API_BASE_URL } from "../../core/constant";

interface APIENDPOINTS {
    GET_PRODUCTS: string,
    GET_PRODUCT_BY_ID: (productId: string) => string
    CREATE_PRODUCT: string

}

export const apiEndPoints: APIENDPOINTS = {
    GET_PRODUCTS: `${API_BASE_URL}/products`,
    GET_PRODUCT_BY_ID: (productId: string) => `${API_BASE_URL}/products/${productId}`,
    CREATE_PRODUCT: `${API_BASE_URL}/products/create`
}