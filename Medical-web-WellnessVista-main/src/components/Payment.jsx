import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../components/Payment.css";

const Payment = () => {
  const [amount, setAmount] = useState("500");
  const navigate = useNavigate();
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    // ✅ Load appointment details from localStorage
    const details = JSON.parse(localStorage.getItem("appointmentDetails"));
    if (!details) {
      alert("No appointment details found. Please book an appointment first.");
      navigate("/bookappointment");
    } else {
      setAppointmentDetails(details);
    }

    // ✅ Load Razorpay SDK dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [navigate]);

  const handlePayment = (e) => {
    e.preventDefault();

    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Please refresh and try again.");
      return;
    }

    const options = {
      key: 'rzp_test_pOkrQJ8yw0RvHS',
      amount: Number(amount) * 100, 
      currency: 'INR',
      name: 'Hospital',
      description: 'Appointment Fees',
      handler: function (response) {
      alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

        // ✅ Send appointment details to backend after successful payment
        fetch('http://localhost:8000/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...appointmentDetails,  // Send stored details
            payment_id: response.razorpay_payment_id
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert("Appointment booked successfully!");
            localStorage.removeItem("appointmentDetails"); // ✅ Clear stored details
            navigate("/"); // Redirect to Home page or Confirmation page
          } else {
            alert("Failed to book appointment. Please try again.");
          }
        })
        .catch(error => console.error('Error booking appointment:', error));
      },
      prefill: {
        name: appointmentDetails?.name || "",
        email: "madhavan6778@gmail.com",
        contact: "9344298942",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div className="payment_container">
      <div className="payment_con">
        <h1 className="payment_heading">Razorpay Payment</h1>
        <p className="payment_inputbox">Appointment Fees: ₹{amount}</p>
        <button className="payment_button" onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
};

export default Payment;
