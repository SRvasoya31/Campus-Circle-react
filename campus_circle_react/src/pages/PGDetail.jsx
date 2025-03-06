import React from "react";
import { useLocation } from "react-router-dom";

const PGDetail = () => {
  const location = useLocation();
  const { pg } = location.state || {};

  if (!pg) return <p>PG not found</p>;

  return (
    <div className="pg-detail">
      <img src={pg.image} alt={pg.name} />
      <h2>{pg.name}</h2>
      <p>{pg.address}</p>
      <h3>Rent: ₹{pg.price}/Month</h3>
    </div>
  );
};

export default PGDetail;
