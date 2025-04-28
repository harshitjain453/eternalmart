import { apiEndPoints } from "../../endpoints/endpoint";

export class Products {
  async getAllProducts() {
    const response = await fetch(apiEndPoints.GET_PRODUCTS, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      console.log("data", data);
      return data;
    }
  }
}
