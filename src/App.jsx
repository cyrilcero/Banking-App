import React from 'react';
import { Outlet } from 'react-router-dom';

// Pages
import Home from "./pages/Home";

// Components
import { HomeNavBar } from './components/HomeNavBar';

function App() {
  return (
    <>
      <HomeNavBar />
      <Outlet />
    </>
  );
}

export default App;
