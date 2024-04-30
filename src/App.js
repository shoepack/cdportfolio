import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import "./App.css";
import "./components/HeroSection.css";
import "./components/Navbar.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

/*
function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
    </div>
  );
}
*/
export default App;
