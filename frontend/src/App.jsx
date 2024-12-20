import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  useDevCycleClient,
  useIsDevCycleInitialized,
  withDevCycleProvider,
} from '@devcycle/react-client-sdk';

import './App.css';
import HomePage from './pages/Home';
import { LoadingSpinner } from '@/components/Spinner';
import RecommendPage from './pages/Suggest';
import CartPage from './pages/Cart';
import { useCountry } from './contexts/CountryProvider';

function App() {
  const devcycleClient = useDevCycleClient();

  const { country } = useCountry();

  devcycleClient.identifyUser({
    country: country || 'US',
  });

  const devCycleReady = useIsDevCycleInitialized();
  if (!devCycleReady) return <LoadingSpinner />;

  return (
    <Router>
      <Routes>
        <Route path="" Component={HomePage} />
        <Route path="/recommend" Component={RecommendPage} />
        <Route path="/cart" Component={CartPage} />
      </Routes>
    </Router>
  );
}

// const devCycleConfig = {
//   sdkKey: import.meta.env.VITE_SDK_KEY,
// };

export default withDevCycleProvider({
  sdkKey: import.meta.env.VITE_SDK_KEY,
  options: {
    deferInitialization: true,
  },
})(App);
