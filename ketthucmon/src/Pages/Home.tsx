import { useCart } from '../hooks/useCart';

function Home() {
  const { products, addToCart } = useCart();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Trang Chủ</h2>
      
      {products.length === 0 ? (
        <p>Chưa có sản phẩm nào</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {products.map(product => (
            <div 
              key={product.id} 
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3>{product.name}</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }}>
                {product.price.toLocaleString('vi-VN')} VND
              </p>
              <p style={{ color: product.stock > 0 ? '#27ae60' : '#e74c3c' }}>
                {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
              </p>
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                style={{
                  padding: '10px 20px',
                  backgroundColor: product.stock === 0 ? '#ccc' : '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '16px'
                }}
              >
                {product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;