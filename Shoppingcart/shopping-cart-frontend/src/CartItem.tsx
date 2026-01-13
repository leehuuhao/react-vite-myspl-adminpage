import React from "react";
import type { CartItemType } from "./Types";
interface Props {
item: CartItemType;
}
const CartItem: React.FC<Props> = ({ item }) => {
return (
<tr>
<td>{item.name}</td>
<td>{item.price} VND</td>
<td>{item.quantity}</td>
</tr>
);
};
export default CartItem;