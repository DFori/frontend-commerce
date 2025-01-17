import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom"; // Correct import for Link and useNavigate
import { useState } from "react"; // Added import for useState
import CartItem from "../components/cart/CartItem"; // Import CartItem

const Cart = () => {
  const { items, cartTotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Correctly placed navigate declaration

  const handleCheckout = async () => {
    try {
      setIsSubmitting(true);
      // Process checkout logic here
      navigate("/checkout");
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/menu" className="text-orange-500 hover:text-orange-600">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
