import React from 'react';
import './HomePage.css'; // Assuming you have a CSS file for styling

function Home() {
  return (
     <div className="App">
      {/* <header className="App-header">
        <div className="logo">CAMPUS CIRCLE</div>
        <nav> */}
    {/* //       <ul>
    //         <li><a href="#home">Home</a></li>
    //         <li><a href="#about">About</a></li>
    //         <li><a href="#services">Services</a></li>
    //         <li><a href="#contact">Contact</a></li>
    //       </ul>
    //     </nav>
    //     <button className="login-button">Log In</button>
    //   </header> */}
     <main>
        <div className="hero-image">
          <img src='../public/bunk-beds.png '  alt="Bunk beds in a room" />
          
          <div className="hero-text">
            <h1>Enjoy Your Life</h1>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
