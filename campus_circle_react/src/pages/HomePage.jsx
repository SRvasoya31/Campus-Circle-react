import React from 'react';
import PGCard from './PGCard';
import './HomePage.css'; // Assuming you have a CSS file for styling
import About from './About';
import ContactForm from './ContactForm';
import PGList from './PGLists';

function Home() {
  return (
    
    <div>
     <main>
        <div className="hero-image">
          <img src='../assets/bunk-beds.png '  alt="Bunk beds in a room" />
          
          <div className="hero-text">
            <h1 className='text'>Enjoy Your Life</h1>
          </div>
        </div>
      </main>
      <div className="pg-list">
      <PGList/>
      <About/>
      <ContactForm/>
      
      </div>

    </div>
  
  );
}

export default Home;
