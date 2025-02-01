import React, { useState, useEffect } from "react";
import { createVendor } from "../services/api.js";
import { getCurrentUser } from "../services/auth"; // Import the function

const VendorApplication = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [id, setId] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData.id); // Assuming the user ID is in userData.id
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const vendorData = { id, user, phoneNumber, address, businessName };
    
    const submitVendor = async () => {
      try {
        const data = await createVendor(vendorData);
        console.log('Vendor created successfully:', data);
      } catch (error) {
        console.error('Error creating vendor:', error);
      }
    };

    submitVendor();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Apply to be a Vendor</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default VendorApplication;
