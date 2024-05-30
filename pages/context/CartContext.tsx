import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextProps {
  cart: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<string[]>([]);

  const addToCart = (id: string) => {
    setCart((prevCart) => [...prevCart, id]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((itemId) => itemId !== id));
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
