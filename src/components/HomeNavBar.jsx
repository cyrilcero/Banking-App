import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import logo from '../assets/Group_2.png'


export const HomeNavBar = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth >= 768 && window.innerWidth <= 1100) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
  
    useEffect(() => {
      showButton();
      return () => {
        window.removeEventListener("resize", showButton);
      };
    }, []);
  
    return (
      <>
        <nav className="home-navbar">
          <div className="home-navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <img src={logo} alt="Logo" />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "home-nav-menu active" : "home-nav-menu"}>
              <li className="home-nav-item">
                <Link to="/cards" className="home-nav-links" onClick={closeMobileMenu}>
                  Cards
                </Link>
              </li>
              <li className="home-nav-item">
                <Link to="/loans" className="home-nav-links" onClick={closeMobileMenu}>
                  Loans
                </Link>
              </li>
              <li className="home-nav-item">
                <Link
                  to="/investments"
                  className="home-nav-links"
                  onClick={closeMobileMenu}
                >
                  Investments
                </Link>
              </li>
              <li className="home-nav-item">
                <Link
                  to="/insurance"
                  className="home-nav-links"
                  onClick={closeMobileMenu}
                >
                  Insurance
                </Link>
              </li>
              <li className="home-nav-item">
                <Link
                  to="/promos-rewards"
                  className="home-nav-links"
                  onClick={closeMobileMenu}
                >
                  Promos & Rewards
                </Link>
              </li>
  
              {button && (
                <>
                  <li className="buttons1">
                    <Button link="/login" buttonStyle="btn--outline"  onClick={closeMobileMenu}>
                      LOGIN TO WIND ONLINE
                    </Button>
                  </li>
                  <li className="buttons1">
                    <Button link="/create-account" buttonStyle="btn--outline" onClick={closeMobileMenu}>CREATE ACCOUNT</Button>
                  </li>
                </>
              )}
                {button && (
                <>
                  <li className="burgerMobileButton">
                    <Button link="/login" buttonStyle="burger-button"   onClick={closeMobileMenu}>
                    <span className="btn-text-large">LOGIN TO WIND ONLINE</span>
                    </Button>
                  </li>
                  <li className="burgerMobileButton">
                    <Button link="/create-account" buttonStyle="burger-button"   onClick={closeMobileMenu}>
                    <span className="btn-text-large">CREATE ACCOUNT</span>
                      </Button>
                  </li>
                </>
              )}
            </ul>
            <div className="otherButton">
              <Button link="/login" buttonStyle="btn--outline">LOGIN TO WIND ONLINE</Button>
              <Button link="/create-account" buttonStyle="btn--outline">CREATE ACCOUNT</Button>
            </div>
          </div>
        </nav>
      </>
    );
  };