import React, { useState } from "react";
import axios from "axios";
import { FaRupeeSign, FaDonate, FaCreditCard, FaDiagnoses } from "react-icons/fa";

export default function Donation() {
  const [cause, setCause] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  const handleDonate = async () => {
    if (!cause || !amount || !method) {
      alert("Please fill in all fields before donating.");
      return;
    }

    const token = localStorage.getItem("token"); // Get JWT from localStorage

    try {
      await axios.post(
        "http://localhost:5000/api/donations",
        {
          cause,
          amount: parseInt(amount),
          method,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token
          },
        }
      );

      alert(`🎉 Thank you for donating ₹${amount} to "${cause}" via ${method}!`);

      setCause("");
      setAmount("");
      setMethod("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to record donation.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Support Our Alumni Association</h2>
      <p className="text-center mb-5">
        Your donation helps fund scholarships, events, and campus improvements.
      </p>

      <div className="card mx-auto shadow p-4" style={{ maxWidth: "500px", borderRadius: "12px" }}>
        <h4 className="text-center mb-4"><FaDonate className="me-2" />Make a Donation</h4>

        {/* Cause */}
        <div className="mb-3">
          <label className="form-label">Choose a Cause</label>
          <select className="form-select" value={cause} onChange={(e) => setCause(e.target.value)}>
            <option value="">-- Select a Cause --</option>
            <option value="Scholarships">🎓 Scholarships</option>
            <option value="Campus Events">📅 Campus Events</option>
            <option value="Infrastructure Development">🏗 Infrastructure</option>
          </select>
        </div>

        {/* Amount */}
        <div className="mb-3">
          <label className="form-label">Enter Amount (₹)</label>
          <div className="input-group">
            <span className="input-group-text"><FaRupeeSign /></span>
            <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
          </div>
        </div>

        {/* Method */}
        <div className="mb-4">
          <label className="form-label">Payment Method</label>
          <select className="form-select" value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="">-- Select Payment Method --</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>

        {/* Button */}
        <button className="btn btn-success w-100" onClick={handleDonate}>
          <FaCreditCard className="me-2" />
          Donate Now
        </button>
      </div>
    </div>
  );
}
    
 