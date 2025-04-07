import { useEffect, useState } from "react";
import axios from "axios";

function PGManagement() {
  const [pgs, setPgs] = useState([]);

  useEffect(() => {
    const fetchPGs = async () => {
      const res = await axios.get("/api/pgs");
      setPgs(res.data);
    };
    fetchPGs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`/api/pg/${id}`);
      setPgs(pgs.filter((pg) => pg._id !== id));
    }
  };

  return (
    <div>
      <h2>Manage PGs</h2>
      {pgs.map((pg) => (
        <div key={pg._id}>
          <h3>{pg.pgName}</h3>
          <button onClick={() => handleDelete(pg._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default PGManagement;
