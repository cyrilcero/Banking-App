import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import LogInPage from './components/LogInForm';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <LogInPage />
    </>
  )
}

export default App
