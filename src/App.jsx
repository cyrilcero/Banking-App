import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import { NavData } from './components/Navdata';
import Navbar from './components/Navbar';

// Test Pages
import CreateAccount from './components/TestPages/CreateAccount';
import SignUp from './components/TestPages/SignUp';
import UsersList from './components/TestPages/UsersList';
import Login from './components/TestPages/Login';
import LandingPage from './components/TestPages/LandingPage';
import LogoutModal from './components/LogoutModal';


function App() {
  return (
    <>
    <main className="App">
      <Router>
        <Routes>       
          {/* Side Navbar Links  */}
          {NavData.map((route, index) => (
            <Route
              key={index}
              path={route.link}
              element={
                <>
                  <Navbar />
                  {route.elementLabel}
                </>
              }/>
          ))}

          {/* Create New Routes here */}
          <Route path="/logout" element={<LogoutModal />} />

          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/" element={<LandingPage />} />

        </Routes>
      </Router>
    </main>
      
    </>
  )
}

export default App
