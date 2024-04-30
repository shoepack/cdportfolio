import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-top">
        <a href="https://portfolio-site-chi-wine.vercel.app/">Jason Artley</a>
      </div>
      <div className="navbar-bottom">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
