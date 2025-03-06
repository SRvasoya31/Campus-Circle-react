import React from "react";
import { useNavigate } from "react-router-dom";
import "./PGCard.css";

const PGCard = ({ pg }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pg/${pg.id}`, { state: { pg } });
  };

  return (
    <div className="pg-card" onClick={handleClick}>
      <img src={pg.image} alt={pg.name} className="pg-image" />
      <div className="pg-info">
        <h3>{pg.name}</h3>
        <p>{pg.address}</p>
        <p className="pg-price">₹ {pg.price}/Month</p>
      </div>
    </div>
  );
};

export default PGCard;
