import React, { useState } from "react";
import Web3 from "web3";
import "./ContactForm.css";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });

  const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS"; // Replace with your contract address
  const contractABI = [ 
    {
      "constant": false,
      "inputs": [
        { "name": "name", "type": "string" },
        { "name": "email", "type": "string" },
        { "name": "contact", "type": "string" },
        { "name": "subject", "type": "string" },
        { "name": "message", "type": "string" }
      ],
      "name": "submitContact",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!window.ethereum) {
      alert("Please install MetaMask to use Web3 features.");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const accounts = await web3.eth.getAccounts();

      await contract.methods
        .submitContact(form.name, form.email, form.contact, form.subject, form.message)
        .send({ from: accounts[0] });

      alert("Contact form submitted successfully on blockchain!");

      setForm({ name: "", email: "", contact: "", subject: "", message: "" });

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Check console for details.");
    }
  };

  return (
    <div className="contact-container">
      <h2>CONTACT US</h2>
      <p className="welcome">WELCOME TO CAMPUS CIRCLE</p>
      <p>We’re always eager to hear from you!</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <input type="text" name="contact" placeholder="Contact no." value={form.contact} onChange={handleChange} required />
          <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
        </div>
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
