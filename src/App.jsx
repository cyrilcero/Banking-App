import React from 'react';
import { Outlet } from 'react-router-dom';
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
