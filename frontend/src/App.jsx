import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  useIsDevCycleInitialized,
  withDevCycleProvider,
} from '@devcycle/react-client-sdk';

import './App.css';
import HomePage from './pages/home';
import { LoadingSpinner } from '@/components/Spinner';

function App() {
  let devCycleReady = false;
  try {
    devCycleReady = useIsDevCycleInitialized();
  } catch (err) {
    console.error(err);
    return <LoadingSpinner />;
  }

  if (!devCycleReady) return <LoadingSpinner />;

  return (
    <Router>
      <Routes>
        <Route path="" Component={HomePage} />
      </Routes>
    </Router>
  );
}

export default withDevCycleProvider({
  sdkKey: import.meta.env.VITE_SDK_KEY,
})(App);
