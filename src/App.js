import React from "react";
import "./App.css";
import "./components/HeroSection.css";
import "./components/Navbar.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
    </div>
  );
}

export default App;
