import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import LogInPage from './components/LogInForm';
import { Signup } from './components/Signup';

function App() {
  return (~
    <>
      {/* <Navbar /> */}
      <LogInPage />
    </>
  )
}

export default App
