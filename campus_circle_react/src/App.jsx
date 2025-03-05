import React from 'react';
import './App.css'; // Assuming you have a CSS file for styling
import Navbar from './components/navbar';
import Home from './pages/HomePage';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      <About/>
      <Footer />
    </Router>
  );
}

export default App;
