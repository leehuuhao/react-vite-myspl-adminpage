import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Navbar from './compoments/Router';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;