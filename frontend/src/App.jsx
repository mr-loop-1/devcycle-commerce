import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  useIsDevCycleInitialized,
  withDevCycleProvider,
} from '@devcycle/react-client-sdk';

import './App.css';
import HomePage from './pages/Home';
import { LoadingSpinner } from '@/components/Spinner';

function App() {
  const devCycleReady = useIsDevCycleInitialized();

  if (!devCycleReady) return <LoadingSpinner />;

  return (
    <Router>
      <Routes>
        <Route path="" Component={HomePage} />
        <Route path="/recommend" Component={SuggestPage} />
        <Route path="/cart" Component={CartPage} />
      </Routes>
    </Router>
  );
}

const devCycleConfig = {
  sdkKey: import.meta.env.VITE_SDK_KEY,
};

// refresh page after setting the country to force this
const country = localStorage.getItem('forceCountry');
if (country) {
  devCycleConfig.user = { country: JSON.parse(country) };
}

export default withDevCycleProvider(devCycleConfig)(App);
