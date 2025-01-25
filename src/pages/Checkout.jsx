import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { useNavigate } from "react-router-dom"; // Added import for useNavigate
import { useState, useEffect } from "react";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { createOrder } from "../services/api"; // Importing createOrder function
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe
import { Elements, CardElement } from "@stripe/react-stripe-js"; // Import Elements and CardElement

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY"); // Replace with your Stripe publishable key

const Checkout = () => {
  const navigate = useNavigate();
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth(); // Get user from context
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: user ? user.email : "", // Get email from logged-in user
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    paymentMethod: "card",
    stripe_token: "", // Placeholder for stripe token
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const stripe = await stripePromise; // Await the stripePromise to get the stripe instance
    const cardElement = document.getElementById("card-element");
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error("Stripe error:", error);
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        address: formData.address,
        ziocode: formData.zipCode,
        place: formData.city,
        phone: formData.phone,
        stripe_token: token.id, // Include stripe token
        items: items.map((item) => ({
          price: item.price,
          product: item.id,
          quantity: item.quantity,
        })),
      };

      await createOrder(orderData); // Using createOrder function
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card title="Order Summary" className="h-fit">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Delivery Details Form */}
          <Card title="Delivery Details">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    first_name: e.target.value,
                  })
                }
                required
              />
              <Input
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    last_name: e.target.value,
                  })
                }
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                required
              />
              <Input
                label="Delivery Address"
                name="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      city: e.target.value,
                    })
                  }
                  required
                />

                <Input
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      zipCode: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <CardElement id="card-element" className="border p-2" />
              </div>

              <Button type="submit" loading={loading} className="w-full">
                Place Order
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </Elements>
  );
};

export default Checkout;
