import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/images/backg.jpg"; // Import the default background image
import image1 from "../assets/images/back.jpg"; // Import additional images for the slideshow
import image2 from "../assets/images/background.jpeg";
import image3 from "../assets/images/bg.jpg";
import carrotImage from "../assets/images/carot.jpg"; // Import product images
import moimoiImage from "../assets/images/coffee.jpg";
import palmWineImage from "../assets/images/palm_wine.jpeg";
import pastriesImage from "../assets/images/pastries.jpg";
import { ShoppingCart, CheckCircle, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const images = [image1, image2, image3]; // Array of images for the slideshow

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for current image index
  const [fade, setFade] = useState(false); // State for fade effect

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Trigger fade out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle through images
        setFade(false); // Trigger fade in
      }, 1000); // Duration of fade out
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const featuredCategories = [
    { id: 1, slug: "pastry", image: pastriesImage, name: "Pastry" },
    { id: 2, slug: "carrot", image: carrotImage, name: "Carrot" },
    { id: 3, slug: "palm-wine", image: palmWineImage, name: "Palm wine" },
    {
      id: 4,
      slug: "coffee",
      image: moimoiImage,
      name: "Coffee",
    },
  ];

  const steps = [
    {
      title: "Select The Product",
      description: "Select from a variety of foods.",
      icon: <ShoppingCart />,
    },
    {
      title: "Place Your Order",
      description: "Add to cart and checkout.",
      icon: <CheckCircle />,
    },
    {
      title: "Enjoy Your Food",
      description: "Your meal will be delivered to you.",
      icon: <Truck />,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gray-900">
        <img
          src={images[currentImageIndex]} // Use current image from state
          alt="Hero Slideshow"
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'}`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Delicious Food Delivered
            </h1>
            <p className="text-xl mb-8">
              Order your favorite meals from the best restaurants
            </p>
            <Link
              to="/menu"
              className="bg-[#b4166d] text-white px-8 py-3 rounded-lg hover:bg-[#690c43] transition-colors"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                to={`/menu?category=${category.slug}`}
                className="group relative rounded-lg overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <span className="text-white text-xl font-semibold p-4">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-purple-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
