import { ProductDetail } from "./product-listing-services"
import { Products } from "./product-detail-services"

class ProductClass {
    productsListing: Products
    productsDetail: ProductDetail


    constructor() {
        this.productsListing = new Products();
        this.productsDetail = new ProductDetail();

    }
}

export const ProductService = new ProductClass()
