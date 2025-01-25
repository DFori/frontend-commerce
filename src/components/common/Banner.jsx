import React, { useEffect, useState } from "react";

const products = [
  {
    id: 1,
    title: "Special Offer: Get your Oraimo Headset at 15% off!",
    description: "Limited time offer. Shop now!",
  },
  {
    id: 2,
    title: "New Arrival: Oraimo Smart Watch!",
    description: "Stay connected with style. Order yours today!",
  },
  {
    id: 3,
    title: "Discount: 20% off on all Oraimo Accessories!",
    description: "Grab the best deals on accessories now!",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 8000); // Change product every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="bg-[#b4166d] text-white text-center py-4 mb-8 transition-opacity duration-1000">
      <h2 className="text-xl font-bold">{products[currentIndex].title}</h2>
      <p>{products[currentIndex].description}</p>
    </div>
  );
};

export default Banner;
