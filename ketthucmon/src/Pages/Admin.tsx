import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import '../styles/Admin.css';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, addToCart, cartItems } = useCart();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Product>({ id: 0, name: '', price: 0, stock: 0 });

  const handleAddProduct = () => {
    if (formData.name && formData.price > 0 && formData.stock >= 0) {
      if (editingId !== null) {
        updateProduct(editingId, { ...formData, id: editingId });
        setEditingId(null);
      } else {
        const newId = Math.max(...products.map(p => p.id), 0) + 1;
        addProduct({ ...formData, id: newId });
      }
      setFormData({ id: 0, name: '', price: 0, stock: 0 });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ id: 0, name: '', price: 0, stock: 0 });
  };

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const totalItems = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div className="admin-container">
      <h2>Quản Lý Kho Hàng</h2>
      
      <div className="admin-layout">
        <div className="products-section">
          <div className="add-product-form">
            <h3>{editingId !== null ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h3>
            <div className="form-group">
              <label>Tên sản phẩm</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nhập tên sản phẩm"
              />
            </div>
            <div className="form-group">
              <label>Giá</label>
              <input 
                type="number" 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                placeholder="Nhập giá"
              />
            </div>
            <div className="form-group">
              <label>Kho (số lượng)</label>
              <input 
                type="number" 
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                placeholder="Nhập số lượng"
              />
            </div>
            <div className="form-actions">
              <button onClick={handleAddProduct} className={editingId !== null ? 'btn-update' : 'btn-add'}>
                {editingId !== null ? 'Cập nhật' : 'Thêm'}
              </button>
              {editingId !== null && (
                <button onClick={handleCancel} className="btn-cancel">
                  Hủy
                </button>
              )}
            </div>
          </div>

          <div className="products-list">
            <h3>Danh sách sản phẩm ({products.length})</h3>
            {products.length === 0 ? (
              <p>Chưa có sản phẩm nào</p>
            ) : (
              products.map(product => (
                <div key={product.id} className="product-item">
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className="product-price">${product.price}</p>
                    <p className="product-stock">Kho: {product.stock} cái</p>
                  </div>
                  <div className="product-actions">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="btn-edit"
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="btn-delete"
                    >
                      Xóa
                    </button>
                    <button 
                      onClick={() => addToCart(product)}
                      className="btn-to-cart"
                      disabled={product.stock === 0}
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-label">Tổng sản phẩm</div>
            <div className="stat-value">{products.length}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Tổng kho</div>
            <div className="stat-value">{totalItems}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Giá trị kho</div>
            <div className="stat-value">VND {totalValue.toFixed(2)}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Giỏ hàng</div>
            <div className="stat-value">{cartItems.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
