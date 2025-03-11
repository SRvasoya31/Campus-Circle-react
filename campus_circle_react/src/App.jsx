import React from 'react';
import './App.css'; // Assuming you have a CSS file for styling
import Navbar from './components/navbar';
import Home from './pages/HomePage';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import ContactForm from './pages/ContactForm';
import PGDetail from './pages/PGDetail';
import PGList from './pages/PGLists';
import SignUp from './pages/Signup';
import SignIn from './pages/SignIn';
import PGDetailForm from './components/PGDetailForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/" element={<PGList />} />
        <Route path="/pg/:id" element={<PGDetail />} />
        <Route path="/contact" element={<ContactForm />} /> 
        <Route path="/PGForm" element={<PGDetailForm />} /> 
        

      </Routes>
      <PGList/>
      <About/>
      <ContactForm />
      <Footer />
    </Router>
  );
}

export default App;
