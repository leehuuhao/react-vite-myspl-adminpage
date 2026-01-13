const express = require('express');
const MySQL = require('mysql2');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Kết nối với MySQL
const db = MySQL.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'haohl1412',
  database: 'shopping_cart'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// API để lấy danh sách sản phẩm
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(results);
  });
});

// API để lấy giỏ hàng
app.get('/api/cart', (req, res) => {
  const query = 'SELECT * FROM cart_items';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch cart' });
    }
    res.json(results);
  });
});

// API để thêm sản phẩm vào giỏ hàng
app.post('/api/cart', (req, res) => {
  const { product_id, name, price, quantity } = req.body;
  
  // Kiểm tra sản phẩm đã có trong giỏ chưa
  const checkQuery = 'SELECT * FROM cart_items WHERE product_id = ?';
  db.query(checkQuery, [product_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to check cart' });
    }

    if (results.length > 0) {
      // Nếu đã có, cập nhật số lượng
      const newQuantity = results[0].quantity + quantity;
      const updateQuery = 'UPDATE cart_items SET quantity = ? WHERE product_id = ?';
      db.query(updateQuery, [newQuantity, product_id], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to update cart' });
        }
        res.json({ id: results[0].id, product_id, name, price, quantity: newQuantity });
      });
    } else {
      // Nếu chưa có, thêm mới
      const insertQuery = 'INSERT INTO cart_items (product_id, name, price, quantity) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [product_id, name, price, quantity], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to add to cart' });
        }
        res.json({
          id: result.insertId,
          product_id,
          name,
          price,
          quantity
        });
      });
    }
  });
});

// API để cập nhật số lượng trong giỏ hàng
app.put('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity <= 0) {
    // Nếu số lượng <= 0, xóa sản phẩm
    const deleteQuery = 'DELETE FROM cart_items WHERE id = ?';
    db.query(deleteQuery, [id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete from cart' });
      }
      res.json({ message: 'Item deleted from cart' });
    });
  } else {
    // Cập nhật số lượng
    const updateQuery = 'UPDATE cart_items SET quantity = ? WHERE id = ?';
    db.query(updateQuery, [quantity, id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update cart' });
      }
      res.json({ id, quantity });
    });
  }
});

// API để xóa sản phẩm khỏi giỏ hàng
app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM cart_items WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete from cart' });
    }
    res.json({ message: 'Item deleted from cart' });
  });
});

// API để xóa toàn bộ giỏ hàng
app.delete('/api/cart', (req, res) => {
  const query = 'DELETE FROM cart_items';
  db.query(query, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to clear cart' });
    }
    res.json({ message: 'Cart cleared' });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});