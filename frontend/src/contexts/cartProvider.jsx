import React, { createContext, useContext, useReducer } from 'react';
import cartReducer from './reducer';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CountryProvider = ({ children }) => {
  const localCart = JSON.parse(localStorage.getItem('cart'));
  const [cart, dispatch] = useReducer(cartReducer, localCart || []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
