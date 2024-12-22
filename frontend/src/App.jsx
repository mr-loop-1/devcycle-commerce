import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  useDevCycleClient,
  useIsDevCycleInitialized,
  useVariableValue,
  withDevCycleProvider,
} from '@devcycle/react-client-sdk';

import './App.css';
import HomePage from './pages/Home';
import { LoadingSpinner } from '@/components/Spinner';
import RecommendPage from './pages/Recommend';
import CartPage from './pages/Cart';
import { useCountry } from './contexts/CountryProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import ControlBar from './components/ControlBar';

function App() {
  const devcycleClient = useDevCycleClient();

  const { country } = useCountry();

  devcycleClient.identifyUser({
    country: country || 'US',
  });

  const devCycleReady = useIsDevCycleInitialized();
  if (!devCycleReady) return <LoadingSpinner />;

  return (
    <div>
      <Router>
        <Header />
        <ControlBar />
        <Routes>
          <Route path="" Component={HomePage} />
          <Route path="/recommend" Component={RecommendPage} />
          <Route path="/cart" Component={CartPage} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default withDevCycleProvider({
  sdkKey: import.meta.env.VITE_SDK_KEY,
  options: {
    deferInitialization: true,
  },
})(App);
