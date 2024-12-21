import React, { createContext, useContext, useReducer } from 'react';
import cartReducer from './reducer';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  let localCart = localStorage.getItem('cart');
  if (!localCart || !Array.isArray(JSON.parse(localCart))) {
    localStorage.setItem('cart', '[]');
    localCart = '[]';
  }
  localCart = JSON.parse(localCart);
  const [cart, dispatch] = useReducer(cartReducer, localCart);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
