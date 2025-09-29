import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";

const Navbar = () => {
  const navRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 90) {
          navRef.current.classList.add("nav-dark");
        } else {
          navRef.current.classList.remove("nav-dark");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Search" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="Notification" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="User Profile" className="profile" />
          <img src={caret_icon} alt="Dropdown Arrow" />
          <div className="dropdown">
            <p
              onClick={() => {
                logout();
              }}
            >
              Sign out
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
