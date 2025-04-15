

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./PGCard.css";

// const PGCard = ({ pg }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/pg/${pg.id || pg._id}`, { state: { pg } });
//   };

//   return (
//     <div
//       className="pg-card"
//       onClick={handleClick}
//       role="button"
//       tabIndex="0"
//       onKeyPress={(e) => e.key === "Enter" && handleClick()}
//     >
//       <img
//         src={pg.image ? pg.image : "/assets/default-image.jpg"}
//         alt={pg.name}
//         className="pg-image"
//         onError={(e) => (e.target.src = "/assets/default-image.jpg")}
//       />
//       <div className="pg-info">
//         <h3>{pg.name}</h3>
//         <p>{pg.address}</p>
//         <p className="pg-price">₹ {pg.price?.toLocaleString() || "N/A"}/Month</p>
//       </div>
//     </div>
//   );
// };

// export default PGCard;


import React from "react";
import { useNavigate } from "react-router-dom";
import "./PGCard.css";

const PGCard = ({ pg }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pg/${pg.id || pg._id}`, { state: { pg } });
  };

  return (
    <div
      className="pg-card"
      onClick={handleClick}
      role="button"
      tabIndex="0"
      onKeyPress={(e) => e.key === "Enter" && handleClick()}
    >
      <img
        src={pg.image ? pg.image : "/assets/default-image.jpg"}
        alt={pg.name}
        className="pg-image"
        onError={(e) => (e.target.src = "/assets/default-image.jpg")}
      />
      <div className="pg-info">
        <h3>{pg.name}</h3>
        <p>{pg.address}</p>
        {/* ✅ Ensuring price is displayed correctly */}
        <p className="pg-price">₹ {pg.price ? pg.price.toLocaleString() : "Not Available"}/Month</p>
      </div>
    </div>
  );
};

export default PGCard;
