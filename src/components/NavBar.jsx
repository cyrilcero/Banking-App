import { useState } from "react";
import { Link } from "react-router-dom";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { BiLogOutCircle } from "react-icons/bi";
import profile from '../assets/profile.png';
import { NavData } from "./NavData";
import LogoutModal from "./LogoutModal";
import '../App.css'

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("CurrentUser") || "{}");
  const accountID = currentUser.accountID;

  function toggleNavbar() {
    setIsNavbarOpen(!isNavbarOpen);
  }

  function openLogoutModal() {
    setShowLogoutModal(true);
  }

  function closeLogoutModal() {
    setShowLogoutModal(false);
  }

  return (
    <div className={`navbar ${isNavbarOpen ? "navbar" : "navbar-closed"}`}>
      <button className="menu-btn" onClick={toggleNavbar}>
        {isNavbarOpen ? <FaAnglesLeft /> : <FaAnglesRight />}
      </button>

      <div className="side-item-wrapper">
        <div className="img-wrapper">
          <img src={profile} alt="profile picture" className="client-navbar-img" />
        </div>

        <div className="side-items">
          {NavData.map((item) => {
            return (
              <Link
                key={item.id}
                className="side-item"
                to={`${item.link}/${accountID}`}
              >
                <i className="navbar-icons">{item.icon}</i>
                <span className={isNavbarOpen ? "link-text" : "link-text-closed"}>
                  {item.text}
                </span>
              </Link>
            );
          })}

        </div>

        

        {/* Logout */}
        <button className="logout-btn" onClick={openLogoutModal}>
          <i className="navbar-icons logout-icon">
            <BiLogOutCircle />
          </i>
          <span className={isNavbarOpen ? "link-text" : "link-text-closed"}>
            Logout
          </span>
        </button>

        <LogoutModal show={showLogoutModal} onClose={closeLogoutModal}>
          <h3>Logout</h3>
          <p>Are you sure you want to log out?</p>
        </LogoutModal>
      </div>
    </div>
  );
}
