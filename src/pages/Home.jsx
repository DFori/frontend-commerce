import React from "react";
import { ShoppingCart, CheckCircle, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const featuredCategories = [
    { id: 1, slug: "pizza", image: "/path/to/pizza.jpg", name: "Pizza" },
    { id: 2, slug: "sushi", image: "/path/to/sushi.jpg", name: "Sushi" },
    { id: 3, slug: "burgers", image: "/path/to/burgers.jpg", name: "Burgers" },
    {
      id: 4,
      slug: "desserts",
      image: "/path/to/desserts.jpg",
      name: "Desserts",
    },
  ];
  const steps = [
    {
      title: "Choose Your Meal",
      description: "Select from a variety of meals.",
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
      <div className="relative h-[500px] bg-gray-900">
        <img
          src="/api/placeholder/1920/500"
          alt="Hero"
          className="w-full h-full object-cover opacity-50"
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
