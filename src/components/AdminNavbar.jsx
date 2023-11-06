import { useState } from "react";
import { Link } from "react-router-dom";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { BiLogOutCircle } from "react-icons/bi";

import { AdminNavData } from "./AdminNavData"
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
    <div className={`anavbar ${isNavbarOpen ? "anavbar" : "anavbar-closed"}`}>
      <button className="admin-menu-btn" onClick={toggleNavbar}>
        {isNavbarOpen ? <FaAnglesLeft /> : <FaAnglesRight />}
      </button>

      <div className="side-item-wrapper">
        <div className="img-wrapper">
          <img src="../src/assets/react.svg" alt="" className="navbar-img" />
        </div>

        {AdminNavData.map((item) => {
          return (
            <Link
              key={item.id}
              className="side-item"
              to={item.link}
            >
              <i className="navbar-icons">{item.icon}</i>
              <span className={isNavbarOpen ? "link-text" : "link-text-closed"}>
                {item.text}
              </span>
            </Link>
          );
        })}

        {/* Logout */}
        <button className="admin-logout-btn" onClick={openLogoutModal}>
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
