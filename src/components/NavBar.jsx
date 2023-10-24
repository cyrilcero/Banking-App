import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

import { NavData } from './Navdata';


export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  function toggleNavbar () {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className = {`navbar ${isNavbarOpen ? "navbar" : "navbar-closed"}`}>

      <button className="menu-btn" onClick={toggleNavbar}>
        {isNavbarOpen ? <FaAnglesLeft/> : <FaAnglesRight/>}
      </button>

      <div className='side-item-wrapper'>
        <div className='img-wrapper'>
          <img src="./src/assets/react.svg" alt="" className='navbar-img'/>
        </div>

        {NavData.map(item =>  {   
          return (
          <Link 
            key = {item.id} 
            className = "side-item"
            to = {item.link}>
              <i className = "navbar-icons">{item.icon}</i>
              <span className ={isNavbarOpen ? "link-text" : "link-text-closed"}>
                {item.text}
              </span>
          </Link>
          )
        })}
      </div>

    </div>
  )
}
