export interface CartItemType {
id: number;
name: string;
price: number;
quantity: number;
}
export interface ProductInput {
name: string;
price: number | string;
quantity: number | string;
}