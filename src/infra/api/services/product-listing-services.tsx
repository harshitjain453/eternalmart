import { apiEndPoints } from "../../endpoints/endpoint";

export class ProductDetail {
  async getProductDetail(productId: any) {
    const response = await fetch(apiEndPoints.GET_PRODUCT_BY_ID(productId), {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      return data;
    }
  }
}
