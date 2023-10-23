import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import { Signup } from './components/Signup';

function App() {
  return (
    <>
      <Navbar />
      <Signup/>
    </>
  )
}

export default App
