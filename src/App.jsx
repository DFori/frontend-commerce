import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/layout/Layout";
import { Home, Menu, Cart, Login, Register, Checkout, AddProductCategory } from "./pages"; 
import Order from "./pages/Order"; 
import UserProfile from "./components/UserProfile"; // Import UserProfile

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/profile" element={<UserProfile />} /> {/* New route for UserProfile */}
              <Route path="/add-product-category" element={<AddProductCategory />} /> {/* New route for AddProductCategory */}
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
