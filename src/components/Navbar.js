import React from "react";
import { Link } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <a href="https://portfolio-site-chi-wine.vercel.app/">Jason Artley</a>
      </div>
      {/* The container itself is flex and centers the links, regardless of .navbar-left */}
      <div className="navbar-center">
        <Link to="/about">About</Link>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </header>
  );
}

export default Navbar;
