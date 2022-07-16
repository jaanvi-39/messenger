import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

//STYLES AND LOGO
import logo from "../assets/logo.png";
import "./Navbar.css";
import menu from "../assets/menu.png";
import cross from "../assets/cross.png";
const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const history = useNavigate();
  console.log(currentUser);
  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    await logout();
    setLoading(false);
    history("/login");
    setNavOpen(false);
  };
  const handleToggle = () => {
    setNavOpen(!navOpen);
  };

  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="logo" />
          <Link to="/" className="title">
            <h2>Messenger</h2>
          </Link>
        </div>
        <div className="nav-items">
          <div className="nav-list">
            {!currentUser ? (
              <>
                <Link to="/signup"> Sign up</Link>
                <Link to="/login">Log in </Link>
              </>
            ) : (
              <>
                <Link to="/userprofile" className="my-profile">
                  {/* <img src={currentUser.photoURL} alt="profile pic" /> */}
                  My Profile
                </Link>
                {loading && <button className="btn-logout">Logging Out</button>}
                {!loading && (
                  <button onClick={handleLogout} className="btn-logout">
                    Log Out
                  </button>
                )}
              </>
            )}
          </div>
          <div className="nav-burger">
            <button className="btn-burger" onClick={handleToggle}>
              {/* {navOpen ? "close" : "open"} */}
              <img src={menu} alt="burger-nav" />
            </button>
          </div>
        </div>
      </div>
      <div className={`burger-items ${navOpen ? "show" : "hide"}`}>
        {!currentUser ? (
          <>
            <div>
              <button className="btn-cross" onClick={handleToggle}>
                <img src={cross} alt="burger-nav" />
              </button>
            </div>
            <Link
              to="/signup"
              className="burger-item"
              onClick={() => {
                setNavOpen(false);
              }}
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="burger-item"
              onClick={() => {
                setNavOpen(false);
              }}
            >
              Log in
            </Link>
          </>
        ) : (
          <>
            <div>
              <button className="btn-cross" onClick={handleToggle}>
                <img src={cross} alt="burger-nav" />
              </button>
            </div>
            <Link
              to="/userprofile"
              className="burger-item"
              onClick={() => {
                setNavOpen(false);
              }}
            >
              My Profile
            </Link>
            {loading && <button className="btn-logout">Logging Out</button>}
            {!loading && (
              <button onClick={handleLogout} className="btn-logout">
                Log Out
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
