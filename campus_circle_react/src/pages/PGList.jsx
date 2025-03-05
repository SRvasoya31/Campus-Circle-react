import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PGDetails from './PGDetails';
import './PGList.css';

const pgList = [
    {
        id: 1,
        name: 'Angel Girls PG',
        address: '203, Sigma II Building, Vastrapur, Ahmedabad',
        rent: '₹ 8000/Month',
        image: 'image1.jpg',  // Add image URLs here
    },
    {
        id: 2,
        name: 'Angel Boys PG',
        address: '203, Sigma II Building, Vastrapur, Ahmedabad',
        rent: '₹ 8000/Month',
        image: 'image1.jpg',  // Add image URLs here
    },
    {
        id: 3,
        name: 'Patel PG',
        address: '202, 2nd Floor, Maruti Center, Gurukul, Ahmedabad',
        rent: '₹ 8000/Month',
        image: 'image1.jpg',  // Add image URLs here
    },
    {
        id: 4,
        name: 'Angel Girls PG',
        address: '203, Sigma II Building, Vastrapur, Ahmedabad',
        rent: '₹ 8000/Month',
        image: 'image1.jpg',  // Add image URLs here
    },
    {
        id: 5,
        name: 'Angel Boys PG',
        address: '203, Sigma II Building, Vastrapur, Ahmedabad',
        rent: '₹ 8000/Month',
        image: 'image1.jpg',  // Add image URLs here
    },
    {
        id: 6,
        name: 'Patel PG',
        address: '202, 2nd Floor, Maruti Center, Gurukul, Ahmedabad',
        rent: '₹ 8000/Month',
        image: 'image1.jpg',  // Add image URLs here
    },
    // Add more PG listings here
];

function PGList() {
    return (
        <Router>
            <div>
                <h2>Featured Properties</h2>
                <ul>
                    {pgList.map(pg => (
                        <li key={pg.id}>
                            <Link to={`/pgdetails/${pg.id}`}>
                                <img src={pg.image} alt={pg.name} width="100" height="100" />
                                <div>
                                    <h3>{pg.name}</h3>
                                    <p className='pglistP'>{pg.address}</p>
                                    <p className='pglistP'>{pg.rent}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Routes>
                    {pgList.map(pg => (
                        <Route key={pg.id} path={`/pgdetails/${pg.id}`} element={<PGDetails pg={pg} />} />
                    ))}
                </Routes>
            </div>
        </Router>
    );
}

export default PGList;
