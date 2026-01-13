import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function Navbar() {
  const { cartItems } = useCart();

  return (
    <nav style={{ padding: 15, background: '#333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: 20 }}>
          Trang chủ
        </Link>
        <Link to="/admin" style={{ color: 'white', marginRight: 20 }}>
          Quản lý kho
        </Link>
      </div>
      <div style={{ color: 'white' }}>
        Giỏ hàng: {cartItems.length}
      </div>
    </nav>
  );
}

export default Navbar;