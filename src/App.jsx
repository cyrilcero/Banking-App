import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import { NavData } from './components/NavData';
import Navbar from './components/NavBar';
import LogoutModal from './components/LogoutModal';
import AdminDash from './components/AdminDash';

// Test Pages -- Remove later
import CreateAccount from './components/TestPages/CreateAccount';
import UsersList from './components/TestPages/UsersList';
import Login from './components/TestPages/Login';
import LandingPage from './components/TestPages/LandingPage';


import { Signup } from './components/Signup';

function App() {
  const currentUser = JSON.parse(localStorage.getItem('CurrentUser') || '{}');
  const accountID = currentUser.accountID;

  return (
    <>
    <main className="App">
        <Routes>       
          {/* Side Navbar Links  */}
          {NavData.map((route, index) => (
            <Route
              key={index}
              path={`${route.link}/${accountID}`}
              element={
                <>
                  <Navbar />
                  {route.elementLabel}
                </>
              }/>
          ))}

          {/* Create New Routes here */}
          <Route path="/logout" element={<LogoutModal />} />
          <Route path="/admin" element={<AdminDash />} />

          {/* Test Pages -- Remove later */}
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/" element={<LandingPage />} />

          {/* Reminder to do error page route eme */}

        </Routes>
    </main>
      
    </>
  )
}

export default App
