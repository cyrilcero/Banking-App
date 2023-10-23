import React, { useState } from 'react';
import { NavData } from './Navdata';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";


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
