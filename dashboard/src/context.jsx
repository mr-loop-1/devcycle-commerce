import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiContext = createContext();

export const useCart = () => useContext(ApiContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </CartContext.Provider>
  );
};
