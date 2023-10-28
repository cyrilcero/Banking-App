import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import './App.css';
import './home.css';
import "./components/Navbar.css";

import { HomeNavBar } from './components/NavBar';
import Home from './components/pages/Home';
import Loans from './components/pages/Loans';
import Cards from './components/pages/Cards';
import Insurance from './components/pages/Insurance';
import Investments from './components/pages/Investments';
import PromAndRe from './components/pages/PromAndRe';

function App() {
  return (
    <>
      <Router>
      <HomeNavBar/>
      <Routes>
      <Route path='/' exact element={ <Home />}></Route>
      <Route path='/loans' exact element={ <Loans />}></Route>
      <Route path='/cards' exact element={ <Cards />}></Route>
      <Route path='/insurance' exact element={ <Insurance />}></Route>
      <Route path='/investments' exact element={ <Investments />}></Route>
      <Route path='/promos-rewards' exact element={ <PromAndRe />}></Route>
      </Routes>
      </Router>
    </>
  )
} 

export default App
