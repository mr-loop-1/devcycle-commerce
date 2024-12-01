import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='' Component={HomePage}/>
      </Routes>
    </Router>
  )
}

export default App
