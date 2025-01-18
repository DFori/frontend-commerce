import React, { useState } from "react";
import api from "../services/api"; // Import the API service

const AddProductCategory = () => {
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/", { name: productName });
      setProductName(""); // Clear the input field
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await api.post("/core/category/create/", { name: categoryName });
      setCategoryName(""); // Clear the input field
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Product and Category</h1>
      <form onSubmit={handleAddProduct} className="mb-6">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-2"
        />
        <button className="bg-[#b4166d] text-white py-2 px-4 rounded-lg">
          Add Product
        </button>
      </form>
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-2"
        />
        <button className="bg-[#b4166d] text-white py-2 px-4 rounded-lg">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddProductCategory;
