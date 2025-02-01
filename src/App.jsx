import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import the CartProvider
import Banner from './components/common/Banner'; // Import the Banner component
import AdvertisementBanner from './components/common/AdvertisementBanner'; // Import the AdvertisementBanner component
import VendorApplication from './pages/VendorApplication';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import UserProfile from './components/UserProfile';
import Menu from './pages/Menu'; // Import the Menu component

const App = () => {
  return (
    <CartProvider> {/* Wrap the component tree with CartProvider */}
      <Router>
        <div>
          <Banner /> {/* Add the Banner component here */}
          <AdvertisementBanner /> {/* Add the AdvertisementBanner component here */}
          <Routes>
            <Route path="/vendor-application" element={<VendorApplication />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/menu" element={<Menu />} /> {/* Add the Menu route */}
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
