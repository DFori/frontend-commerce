import React from "react";
import { Star, Clock } from "lucide-react";
import { useCart } from "../../context/CartContext";

const FoodCard = ({ food }) => {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{food.name}</h3>
            <p className="text-gray-600 text-sm">{food.category_name}</p>
          </div>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            ${food.price}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {food.description}
        </p>
        <div className="flex items-center mt-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            {food.rating}
          </div>
          <div className="flex items-center ml-4">
            <Clock className="h-4 w-4 text-gray-400 mr-1" />
            {food.preparation_time} min
          </div>
        </div>
        <button
          onClick={() => addItem(food)}
          className="w-full mt-4 bg-[#b4166d] text-white py-2 rounded-lg hover:bg-[#b4166d]-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
