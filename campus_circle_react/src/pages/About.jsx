import React from 'react';
import './About.css';

const teamMembers = [
  { name: 'Sahil Vasoya', id: '21SOECE11148', image: '../assets/archil.jpg' },
//   { name: 'Sahil Vasoya', id: '21SOECE11148', image: '/public/sahil.j' },
  { name: 'Archil', id: '22SOECE11018', image: '../assets/archil.jpg' },
  { name: 'Brijesh', id: '22SOECE11048', image: '../assets/archil.jpg' },
  // { name: 'Brijesh', id: '22SOECE11048', image: '../archil.jpg' },
];

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p className='about-p'>
      We build faimilies. We bring together people from different places searching for one common thing i.e. HOME. We try our 
best to get you the most affordable yet worthy of your staying so that you feel at home even after being miles away from it.
<br/>
<br/>

We at Hostel Basera have already experienced staying away from home and so we know what it takes to bring up 
courage and efforts to just make the decision of staying away from home.
<br/>
<br/>

So we bring you the perfect experience for searching the best home away home so 
that your stay is pleasentfull and so you don't miss your home.😊      </p>
      <h2>Meet Our Team</h2>
      <div className="team-members">
        {teamMembers.map(member => (
          <div key={member.id} className="team-member">
            <img src={member.image} alt={member.name} />
            <div className="member-details">
              <h3>{member.name}</h3>
              <p className='about-p'>{member.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
