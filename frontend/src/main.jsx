import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CountryProvider } from './contexts/CountryProvider';
import { CartProvider } from './contexts/CartProvider';
import { InspectProvider } from './contexts/inspectProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CountryProvider>
      <CartProvider>
        <InspectProvider>
          <App />
        </InspectProvider>
      </CartProvider>
    </CountryProvider>
  </StrictMode>
);
