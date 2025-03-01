import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookAppointment.css';

const BookAppointment = () => {
  const [form, setForm] = useState({ name: '', date: '', time: '', doctor: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = () => {
    if (!form.name || !form.date || !form.time || !form.doctor) {
      alert("All fields are required!");
      return;
    }

    // ✅ Save details in localStorage
    localStorage.setItem("appointmentDetails", JSON.stringify(form));

    // ✅ Redirect to Payment Page
    navigate('/payment');
  };

  return (
    <div className="appointments-container">
      <h2>Book an Appointment</h2>
      <form>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="time" name="time" value={form.time} onChange={handleChange} required />
        <input type="text" name="doctor" value={form.doctor} onChange={handleChange} placeholder="Doctor" required />
        <button type="button" onClick={handleProceedToPayment}>Proceed to Payment</button>
      </form>
    </div>
  );
};

export default BookAppointment;
