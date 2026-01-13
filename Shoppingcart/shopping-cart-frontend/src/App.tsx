import { useEffect, useState } from "react";
import { getCartItems, addToCart } from "./api";
import type { CartItemType, ProductInput } from "./Types";
import CartItem from "./CartItem";
import "./App.css";
function App() {
const [cart, setCart] = useState<CartItemType[]>([]);
const [product, setProduct] = useState<ProductInput>({
name: "",
price: "",
quantity: 1
});
// Lấy danh sách giỏ hàng từ backend
useEffect(() => {
getCartItems()
.then((response: any) => setCart(response.data))
.catch((error: any) => console.error(error));
}, []);
// Thêm sản phẩm
const handleAddToCart = () => {
addToCart(product)
.then((response: any) => {
setCart((prev) => [...prev, response.data]);
setProduct({ name: "", price: "", quantity: 1 });
})
.catch((error: any) => console.error(error));
};
return (
<div>
<h1>Giỏ hàng</h1>
<div>
<input
type="text"
placeholder="Tên sản phẩm"
value={product.name}
onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
setProduct({ ...product, name: e.target.value })
}
/>
<input
type="number"
placeholder="Giá"
value={product.price}
onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
setProduct({ ...product, price: Number(e.target.value) })
}
/>
<input
type="number"
placeholder="Số lượng"
value={product.quantity}
onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
setProduct({ ...product, quantity: Number(e.target.value) })
}
/>
<button onClick={handleAddToCart}>Thêm vào giỏ</button>
</div>
<h2>Sản phẩm trong giỏ hàng</h2>
<table>
<thead>
<tr>
<th>Tên sản phẩm</th>
<th>Giá</th>
<th>Số lượng</th>
</tr>
</thead>
<tbody>
{cart.map((item) => (
<CartItem key={item.id} item={item} />
))}
</tbody>
</table>
</div>
);
}
export default App;