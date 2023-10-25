import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import { NavData } from './components/Navdata';


function App() {
  return (
    <>
    <main className="App">         
    <Router>
        <Navbar />
          <Routes>
            {NavData.map((route, index) => (
              <Route 
                key = {index}
                path = {route.link}
                element = {route.elementLabel}>
              </Route>
            ))}
          </Routes>
      </Router>
    </main>
    </>
  )
}

export default App
