import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CountryProvider } from './contexts';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CountryProvider>
      <App />
    </CountryProvider>
  </StrictMode>
);
