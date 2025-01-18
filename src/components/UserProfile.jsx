import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/auth"; // Import the function
import { Link } from "react-router-dom"; // Import Link for navigation

const UserProfile = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        console.log("Fetched user data:", userData); // Log the fetched user data
        setUsername(userData.username); // Assuming the username is in userData
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="flex items-center mb-6">
        <img
          src="path/to/user/profile/picture.jpg" // Placeholder for user picture
          alt="User Profile"
          className="w-16 h-16 rounded-full mr-4"
        />
        <h2 className="text-xl font-semibold">{username}</h2> {/* Display fetched username */}
      </div>
      <Link to="/add-product-category" className="text-blue-500 underline">
        Add Products and Categories
      </Link>
      {/* Other form elements */}
    </div>
  );
};

export default UserProfile;
