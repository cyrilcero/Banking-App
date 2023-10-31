
import React from 'react';
import { Outlet } from 'react-router-dom';

import { HomeNavBar } from './components/HomeNavBar';
import Home from "./pages/Home";

function App() {
  return (
    <>
      <HomeNavBar />
      <Outlet />
    </>
  );
}

export default App;
