import React, { createContext, useState, type ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  products: Product[];
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  updateProduct: (id: number, product: Product) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
 
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      updateQuantity(product.id, existing.quantity + 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id: number, updatedProduct: Product) => {
    setProducts(products.map(p => p.id === id ? updatedProduct : p));
  };

  return (
    <CartContext.Provider 
      value={{ 
        products, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        addProduct,
        deleteProduct,
        updateProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
