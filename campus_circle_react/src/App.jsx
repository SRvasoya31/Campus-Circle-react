// // src/App.js
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./AuthContext";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import "./App.css";
// import Home from "./pages/HomePage";
// import About from "./pages/About";
// import ContactForm from "./pages/ContactForm";
// import PGDetail from "./pages/PGDetail";
// import PGList from "./pages/PGLists";
// import SignIn from "./pages/SignIn";
// // import SignUp from "./pages/Signup";
// import PGDetailForm from "./components/PGDetailForm";
// import PGBooking from "./pages/PGBooking";
// import Payment from "./pages/Payment";
// import MyBookings from "./pages/Mybooking";
// import AdminLogin from "./admin/Login";
// import AdminDashboard from "./admin/pages/Dashboard";
// import AdminSignup from "./admin/AdminSignup";
// import PGManagement from "./admin/pages/PGManagement";
// import BookingManagement from "./admin/pages/ManageBookings";
// import ForgotPassword from "./pages/ForgotPassword";
// import SignUp from "./pages/SignUp";

// // ✅ Route protection for Booking & Payment
// const PrivateRoute = ({ element }) => {
//   const { user } = useContext(AuthContext);
//   return user ? element : <Navigate to="/signin" />;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/pgs" element={<PGList />} />
//           <Route path="/pg/:id" element={<PGDetail />} />
//           <Route path="/pgdetailform" element={<PGDetailForm />} />
//           <Route path="/contact" element={<ContactForm />} />
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp/>} />
//           <Route path="/forgot-password" element={<ForgotPassword/>} />


//           {/* ✅ Protected Routes */}
//           <Route path="/booking" element={<PGBooking />} />
//           <Route path="/my-bookings" element={<MyBookings/>} />
//           <Route path="/payment" element={<Payment />} />

//           {/* admin  */}
//           <Route path="/admin/login" element={<AdminLogin/>} />
//           <Route path="/admin" element={<AdminLogin/>} />
//           <Route path="/admin/dashboard" element={<AdminDashboard/>} />
//           <Route path="/admin/signup" element={<AdminSignup/>} />
//           <Route path="/admin/manage-pgs" element={<PGManagement/>} />
//           <Route path="/admin/manage-bookings" element={<BookingManagement/>} />



//           <Route path="*" element={<h1>404 - Page Not Found</h1>} />
//         </Routes>
//         <Footer />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./pages/HomePage";
import About from "./pages/About";
import ContactForm from "./pages/ContactForm";
import PGDetail from "./pages/PGDetail";
import PGList from "./pages/PGLists";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import PGDetailForm from "./components/PGDetailForm";
import PGBooking from "./pages/PGBooking";
import Payment from "./pages/Payment";
import MyBookings from "./pages/Mybooking";
import AdminLogin from "./admin/Login";

import AdminSignup from "./admin/AdminSignup";
import PGManagement from "./admin/pages/PGManagement";
// import BookingManagement from "./admin/pages/ManageBookings";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./admin/pages/adminDashboard";

// ✅ Protected Route Component
const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/signin" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pgs" element={<PGList />} />
          <Route path="/pg/:id" element={<PGDetail />} />
          <Route path="/pgdetailform" element={<PGDetailForm />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ✅ Protected Routes */}
          <Route path="/booking" element={<PrivateRoute element={<PGBooking />} />} />
          <Route path="/my-bookings" element={<PrivateRoute element={<MyBookings />} />} />
          <Route path="/payment" element={<PrivateRoute element={<Payment />} />} />

          {/* ✅ Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/manage-pgs" element={<PGManagement />} />
        
          {/* <Route path="/admin/dashboard" element={<PrivateRoute element={<Dashboard/>} />} /> */}
          {/* <Route path="/admin/signup" element={<PrivateRoute element={<AdminSignup/>} />} /> */}
          {/* <Route path="/admin/manage-pgs" element={<PrivateRoute element={<PGManagement />} />} /> */}
          {/* <Route path="/admin/manage-bookings" element={<PrivateRoute element={<BookingManagement />} />} /> */}

          {/* 404 Page */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
