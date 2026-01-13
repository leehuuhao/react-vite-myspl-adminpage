import axios from "axios";
import type { CartItemType, ProductInput } from "./Types";
const API_URL = "http://localhost:5000/api/cart";
export const getCartItems = () => {
return axios.get<CartItemType[]>(API_URL);
};
export const addToCart = (product: ProductInput) => {
return axios.post<CartItemType>(API_URL, product);
};