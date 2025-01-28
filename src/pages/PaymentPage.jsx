// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/paymentform";

const stripePromise = loadStripe(
  "pk_test_51QkyVACQCYGpSyxCJm3P7kxsmaqLKofxYlbCxeGXnN2KiVZ18g1yc1dP467rm0GeNE64wYc3wKyUeOUp91x8lsJE00Ie0F77m3"
); // Replace with your Stripe publishable key

const PaymentPage = () => {
  const location = useLocation();
  const { clientSecret } = location.state || {};
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (clientSecret) {
      setOptions({
        clientSecret,
        appearance: {
          theme: "stripe",
        },
      });
    }
  }, [clientSecret]);

  return (
    <div className="container">
      <h1>Complete Your Payment</h1>
      {options ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default PaymentPage;
