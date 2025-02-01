/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/orders", // Replace with your success URL
      },
    });

    if (error) {
      setMessage(error.message || "An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement className="border p-2 rounded" />
        <button 
          type="submit" 
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400" 
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
