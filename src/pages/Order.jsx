import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import api from "../services/api";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/order/my-orders"); // Adjust the endpoint as necessary
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You have no orders yet.</p>
          <Link to="/menu" className="text-[#b4166d] hover:text-[#690c43]">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg">
              <h2 className="font-semibold">Order ID: {order.id}</h2>
              <p>Status: {order.status}</p>
              <p>Total: ${order.paid_amount}</p>
              {/* Add more order details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
