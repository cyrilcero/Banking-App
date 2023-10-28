import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import { Button } from './Button';
//import './Navbar.css';
import { BiLogOutCircle } from "react-icons/bi";

import { NavData } from './NavData';
import LogoutModal from './LogoutModal';


 export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('CurrentUser') || '{}');
  const accountID = currentUser.accountID;

  function toggleNavbar () {
    setIsNavbarOpen(!isNavbarOpen);
  };

  function openLogoutModal () {
    setShowLogoutModal(true);
  };

  function closeLogoutModal () {
    setShowLogoutModal(false);
  };

  return (
    <div className = {`navbar ${isNavbarOpen ? "navbar" : "navbar-closed"}`}>

      <button className="menu-btn" onClick={toggleNavbar}>
        {isNavbarOpen ? <FaAnglesLeft/> : <FaAnglesRight/>}
      </button>

      <div className='side-item-wrapper'>
        <div className='img-wrapper'>
          <img src="../src/assets/react.svg" alt="" className='navbar-img'/>
        </div>

        {NavData.map(item =>  {   
          return (
          <Link 
            key = {item.id} 
            className = "side-item"
            to = {`${item.link}/${accountID}`}>
              <i className = "navbar-icons">{item.icon}</i>
              <span className ={isNavbarOpen ? "link-text" : "link-text-closed"}>
                {item.text}
              </span>
          </Link>
          )
        })}

        {/* Logout */}
        <button className='logout-btn' onClick={openLogoutModal}>
          <i className = "navbar-icons logout-icon"><BiLogOutCircle /></i> 
          <span className ={isNavbarOpen ? "link-text" : "link-text-closed"}>Logout</span>
        </button>

        <LogoutModal show={showLogoutModal} onClose={closeLogoutModal}>
          <h3>Logout</h3>
          <p>Are you sure you want to log out?</p>
        </LogoutModal>

      </div>
  
    </div>
  )
}

//----------------------------DOnni Rhey---------------------------------------------------------------------------
export const HomeNavBar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
 
    if (window.innerWidth >= 768 && window.innerWidth <= 1100) {
      setButton(false);
    }else{
      setButton(true);
    }
  };


  useEffect(() => {
    showButton(); 
    return () => {
      window.removeEventListener('resize', showButton);
    };
  }, []);

  return (

    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src="src/images/Group_2.png" alt="Logo" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/cards" className="nav-links" onClick={closeMobileMenu}>
                Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/loans" className="nav-links" onClick={closeMobileMenu}>
                Loans
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/investments" className="nav-links" onClick={closeMobileMenu}>
                Investments
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/insurance" className="nav-links" onClick={closeMobileMenu}>
                Insurance
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/promos-rewards" className="nav-links" onClick={closeMobileMenu}>
                Promos & Rewards
              </Link>
            </li>
          
            {button && ( 
              <>
                <li className="buttons1">
                  <Button buttonStyle='btn--outline'>LOGIN TO WIND ONLINE</Button>
                </li>
                <li className="buttons1">
                  <Button buttonStyle='btn--outline'>Create Account</Button>
                </li>
              </>
            )}
          </ul>
          <div className='otherButton'>
          <Button buttonStyle='btn--outline'>LOGIN TO WIND ONLINE</Button> 
          <Button buttonStyle='btn--outline'>Create Account</Button>
            </div>
        </div>
      </nav>
    </>
    
  );
};
