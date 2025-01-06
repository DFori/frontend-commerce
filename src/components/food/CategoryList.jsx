const CategoryList = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex overflow-x-auto pb-4 hide-scrollbar">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-6 py-2 rounded-full mr-3 whitespace-nowrap ${
          !activeCategory
            ? "bg-orange-500 text-white"
            : "bg-white text-gray-600 hover:bg-gray-100"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-6 py-2 rounded-full mr-3 whitespace-nowrap ${
            activeCategory === category.id
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
export default CategoryList;
