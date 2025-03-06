import React from "react";
import PGCard from "./PGCard";
import "./PGLists.css";

const pgData = [
  {
    id: 1,
    name: "Angel Girls PG",
    address: "203, Sigma II Building, SBI Bank, Vastrapur, Ahmedabad",
    price: 8000,
    image: "image1.jpg",
  },
  {
    id: 2,
    name: "Angel Boys PG",
    address: "203, Sigma II Building, SBI Bank, Vastrapur, Ahmedabad",
    price: 8000,
    image: "image1.jpg",
  },
  {
    id: 3,
    name: "Patel PG",
    address: "203, Sigma II Building, SBI Bank, Vastrapur, Ahmedabad",
    price: 8000,
    image: "image1.jpg",
  },
  {
    id: 4,
    name: "Patel PG",
    address: "202, Maruti Center, Panjab Honda, Gurukul, Ahmedabad",
    price: 8000,
    image: "image1.jpg",
  },
  {
    id: 5,
    name: "Angel Boys PG",
    address: "202, Maruti Center, Panjab Honda, Gurukul, Ahmedabad",
    price: 8000,
    image: "image1.jpg",
  },
  {
    id: 6,
    name: "Angel Girls PG",
    address: "203, Sigma II Building, SBI Bank, Vastrapur, Ahmedabad",
    price: 8000,
    image: "image1.jpg",
  },
];

const PGList = () => {
  return (
    <div className="pg-list">
      <h2>Featured Properties</h2>
      <div className="pg-grid">
        {pgData.map((pg) => (
          <PGCard key={pg.id} pg={pg} />
        ))}
      </div>
    </div>
  );
};

export default PGList;
