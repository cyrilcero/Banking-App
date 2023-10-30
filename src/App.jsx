
import React from 'react';
import { HomeNavBar } from './components/HomeNavBar';
import Home from "./pages/Home";
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <HomeNavBar />
      <Outlet />
    </>
  );
}

export default App;
