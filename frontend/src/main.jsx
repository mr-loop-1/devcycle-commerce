import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CountryProvider } from './contexts/CountryProvider';
import { CartProvider } from './contexts/CartProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CountryProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </CountryProvider>
  </StrictMode>
);
