import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  useIsDevCycleInitialized,
  withDevCycleProvider,
} from '@devcycle/react-client-sdk';

import './App.css';
import HomePage from './pages/Home';
import { LoadingSpinner } from '@/components/Spinner';
import RecommendPage from './pages/Suggest';
import CartPage from './pages/Cart';

function App() {
  const devCycleReady = useIsDevCycleInitialized();
  console.log('🚀 ~ App ~ devCycleReady:', devCycleReady);

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

const devCycleConfig = {
  sdkKey: import.meta.env.VITE_SDK_KEY,
  user: { country: 'IN' },
};
console.log('🚀 ~ devCycleConfig.sdkKey:', devCycleConfig.sdkKey);

// refresh page after setting the country to force this
const country = localStorage.getItem('forceCountry');
if (country) {
  devCycleConfig.user = { country: 'IN' };
}

export default withDevCycleProvider(devCycleConfig)(App);
