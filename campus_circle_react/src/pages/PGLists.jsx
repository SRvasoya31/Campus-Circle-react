
import React, { useEffect, useState } from "react";
import axios from "axios";
import PGCard from "./PGCard";
import "./PGLists.css";

// ✅ Default static PG data with email
const defaultPgData = [
  { id: 1, name: "Angel Girls PG", address: "203, Sigma II Building, SBI Bank, Vastrapur, Ahmedabad", price: 8000, image: "/assets/image1.jpg", email: "contact@angelpg.com" },
  { id: 2, name: "Angel Boys PG", address: "203, Sigma II Building, SBI Bank, Vastrapur, Ahmedabad", price: 7500, image: "/assets/image1.jpg", email: "contact@angelpg.com" },
  { id: 3, name: "Patel PG", address: "203, Sigma II Building, SBI Bank, Vastrapur, Ahmedabad", price: 6400, image: "/assets/image1.jpg", email: "info@patelpg.com" },
  { id: 4, name: "Patel PG", address: "202, Maruti Center, Panjab Honda, Gurukul, Ahmedabad", price: 6000, image: "/assets/image1.jpg", email: "info@patelpg.com" },
  { id: 5, name: "Angel Boys PG", address: "202, Maruti Center, Panjab Honda, Gurukul, Ahmedabad", price: 8000, image: "/assets/image1.jpg", email: "contact@angelpg.com" },
  { id: 6, name: "Angel Girls PG", address: "203, Sigma II Building, SBI Bank, Vastrapur, Ahmedabad", price: 8000, image: "/assets/image1.jpg", email: "contact@angelpg.com" },
  { id: 7, name: "Sunrise PG", address: "Near Ganesh Nagar, Satellite, Ahmedabad", price: 7000, image: "/assets/image1.jpg", email: "info@sunrisepg.com" },
  { id: 8, name: "Shree Girls PG", address: "Opp. Law Garden, Ellis Bridge, Ahmedabad", price: 8500, image: "/assets/image1.jpg", email: "support@shreepg.com" },
  { id: 9, name: "City View PG", address: "Drive-In Road, Memnagar, Ahmedabad", price: 9000, image: "/assets/image1.jpg", email: "info@cityviewpg.com" },
];

const PGList = () => {
  const [pgData, setPgData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/pgs");
        console.log("✅ API PG Data:", res.data);

        const BASE_URL = "http://localhost:5000";

        const formattedData = res.data.map((pg) => {
          const normalizePath = (path) =>
            path ? `${BASE_URL}/${path.replace(/\\/g, "/")}` : "/assets/default.jpg";

          return {
            id: pg._id,
            name: pg.name || pg.pgName || "PG Name Not Available",
            address: pg.address || pg.location || "Address Not Available",
            price: pg.rentPrice || "Not Available",
            image: pg.images?.length > 0 ? normalizePath(pg.images[0]) : "/assets/default.jpg",
            email: pg.email || "info@defaultpg.com",
          };
        });

        const mergedData = [...formattedData, ...defaultPgData].slice(0, 9);
        setPgData(mergedData);
      } catch (error) {
        console.error("❌ Failed to fetch PG data:", error);
        setPgData(defaultPgData);
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);

  const handleViewMore = () => setVisibleCount((prev) => prev + 6);

  if (loading) return <h3>Loading PGs...</h3>;

  return (
    <div className="pg-list">
      <h2>Featured Properties</h2>
      <div className="pg-grid">
        {pgData.length > 0 ? (
          pgData.slice(0, visibleCount).map((pg, index) => (
            <PGCard key={pg.id || index} pg={pg} />
          ))
        ) : (
          <p>No PGs found.</p>
        )}
      </div>

      {visibleCount < pgData.length && (
        <button className="view-more-btn" onClick={handleViewMore}>
          More PG
        </button>
      )}
    </div>
  );
};

export default PGList;
