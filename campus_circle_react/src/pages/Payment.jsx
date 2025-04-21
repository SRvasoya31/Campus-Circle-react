import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    alert("✅ Payment successful!");
    navigate("/bookings"); // Redirect to user's bookings
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Payment Page</h1>
      <h2>Total Amount: ₹{amount}</h2>

      <button
        onClick={handlePaymentSuccess}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
