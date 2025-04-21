


// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import emailjs from "@emailjs/browser";
// import "./PGBooking.css";

// const PGBooking = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { pg } = state || {};

//   if (!pg) return <p>PG not found</p>;

//   // 🌟 User details from localStorage
//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   // 🎯 Form state
//   const [name, setName] = useState(user?.name || "");
//   const [email] = useState(user?.email || "");
//   const [phone, setPhone] = useState(user?.phone || "");
//   const [checkInDate, setCheckInDate] = useState("");
//   const [duration, setDuration] = useState(1);
//   const [totalAmount, setTotalAmount] = useState(pg.price || 0);
//   const pgEmail = pg.email || "SRvasoya5@gmail.com"; // ✅ Default PG owner email

//   // 💰 Recalculate total price on duration change
//   useEffect(() => {
//     setTotalAmount((pg.price || 0) * duration);
//   }, [duration, pg.price]);

//   // 🛠️ Razorpay Payment Integration
//   const handlePayment = () => {
//     const options = {
//       key: "rzp_test_MHEsre9OM0EK7N", // Replace with Razorpay Key ID
//       amount: totalAmount * 100,
//       currency: "INR",
//       name: "Campus Circle",
//       description: `Booking PG: ${pg.name}`,
//       handler: function (response) {
//         alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
//         sendConfirmationEmail(); // ✅ Send email after payment success
//         navigate("/");
//       },
//       prefill: {
//         name: name,
//         email: email,
//         contact: phone,
//       },
//       notes: {
//         pgName: pg.name,
//         checkInDate,
//         duration,
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };

//     const razor = new window.Razorpay(options);
//     razor.open();
//   };

//   // 📧 Send email with EmailJS
//   const sendConfirmationEmail = () => {
//     const emailParams = {
//       name,
//       email,
//       pgName: pg.name,
//       pgEmail, // ✅ Include PG owner's email
//       checkInDate,
//       duration,
//       totalAmount: `₹${totalAmount.toLocaleString()}`,
//     };

//     emailjs
//       .send("service_g5uvc0p", "template_l3ppe8l", emailParams, "iBdT8L3ohJTHo2MAa")
//       .then((response) => {
//         console.log("Email sent!", response.status, response.text);
//         alert("Booking confirmation email sent!");
//       })
//       .catch((error) => {
//         console.error("Failed to send email:", error);
//         alert("Failed to send confirmation email.");
//       });
//   };

//   // 🚀 Handle form submission
//   const handleBooking = (e) => {
//     e.preventDefault();

//     if (!name || !email || !phone || !checkInDate || duration <= 0) {
//       alert("Please fill in all the details correctly.");
//       return;
//     }

//     handlePayment(); // 🔥 Trigger Razorpay Payment
//   };

//   return (
//     <div className="booking-page-container">
//       <h1>Book {pg.name}</h1>

//       <form onSubmit={handleBooking} className="booking-form">
//         <label>Name:</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

//         <label>Email:</label>
//         <input type="email" value={email} readOnly />

//         <label>Phone:</label>
//         <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

//         <label>Check-in Date:</label>
//         <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required />

//         <label>Duration (Months):</label>
//         <input
//           type="number"
//           min="1"
//           value={duration}
//           onChange={(e) => setDuration(Number(e.target.value))}
//           required
//         />

//         <h3>
//           Total: <span style={{ color: "red" }}>₹{totalAmount.toLocaleString()}</span>
//         </h3>

//         {/* ✅ Show PG owner email */}
//         <p>
//           <strong>PG Owner Email:</strong> <a href={`mailto:${pgEmail}`}>{pgEmail}</a>
//         </p>

//         <button type="submit" className="confirm-button">
//           Proceed to Payment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PGBooking;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./PGBooking.css";

const PGBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { pg } = state || {};

  if (!pg) return <p>PG not found</p>;

  // 🌟 User details from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // 🎯 Form state
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [checkInDate, setCheckInDate] = useState("");
  const [duration, setDuration] = useState(1);
  const [totalAmount, setTotalAmount] = useState(pg.price || 0);
  const [loading, setLoading] = useState(false);
  const pgEmail = pg.email || "SRvasoya5@gmail.com";

  // 💰 Recalculate total price on duration change
  useEffect(() => {
    setTotalAmount((pg.price || 0) * duration);
  }, [duration, pg.price]);

  // 🛠️ Razorpay Payment Integration
  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    setLoading(true);
    const options = {
      key: "rzp_test_MHEsre9OM0EK7N", // Replace with real key for production
      amount: totalAmount * 100,
      currency: "INR",
      name: "Campus Circle",
      description: `Booking PG: ${pg.name}`,
      handler: function (response) {
        setLoading(false);
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        sendConfirmationEmail();
        navigate("/");
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      notes: {
        pgName: pg.name,
        checkInDate,
        duration,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

    razor.on("payment.failed", function (response) {
      setLoading(false);
      alert("Payment failed. Please try again.");
      console.error("Payment failed:", response.error);
    });
  };

  // 📧 Send email with EmailJS
  const sendConfirmationEmail = () => {
    const emailParams = {
      name,
      email,
      pgName: pg.name,
      pgEmail,
      checkInDate,
      duration,
      totalAmount: `₹${totalAmount.toLocaleString()}`,
    };

    emailjs
    .send("service_g5uvc0p", "template_l3ppe8l", emailParams, "iBdT8L3ohJTHo2MAa")
      .then((response) => {
        console.log("Email sent!", response.status, response.text);
        alert("Booking confirmation email sent!");
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        alert("Failed to send confirmation email.");
      });
  };

  // 🚀 Handle form submission
  const handleBooking = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !checkInDate || duration <= 0) {
      alert("Please fill in all the details correctly.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    handlePayment(); // Trigger Razorpay Payment
  };

  return (
    <div className="booking-page-container">
      <h1>Book {pg.name}</h1>

      <form onSubmit={handleBooking} className="booking-form">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input type="email" value={email} readOnly />

        <label>Phone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="[0-9]{10}"
          title="Phone number must be 10 digits"
          onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
          required
        />

        <label>Check-in Date:</label>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          required
        />

        <label>Duration (Months):</label>
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
        />

        <h3>
          Total: <span style={{ color: "red" }}>₹{totalAmount.toLocaleString()}</span>
        </h3>

        <p>
          <strong>PG Owner Email:</strong>{" "}
          <a href={`mailto:${pgEmail}`}>{pgEmail}</a>
        </p>

        <button type="submit" className="confirm-button" disabled={loading}>
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
};

export default PGBooking;
