import React, { useState, useEffect } from 'react';
import { NavData } from './Navdata';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import { Button } from './Button';
//import './Navbar.css';


 export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  function toggleNavbar () {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className = {`navbar ${isNavbarOpen ? "navbar" : "navbar-closed"}`}>

      <button className="menu-btn" onClick={toggleNavbar}>
        {isNavbarOpen ? <FaAnglesLeft/> : <FaAnglesRight/>}
      </button>

      <div className='img-wrapper'>
        <img src="./src/assets/react.svg" alt="" className='navbar-img'/>
      </div>

      <div>
        {NavData.map(item =>  {   
          return (
          <div 
            key = {item.id} 
            className = "side-item"
            to = "item.link">
              <i className = "navbar-icons">{item.icon}</i>
              <span className ={isNavbarOpen ? "link-text" : "link-text-closed"}>
                {item.text}
              </span>
          </div>
          )
        })}
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
