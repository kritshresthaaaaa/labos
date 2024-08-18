import React, { useContext, useEffect } from "react";
import "./ExploreMenu.css"; // Optional if you want to keep some custom styles
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list, clothing_list } = useContext(StoreContext);

  // Filter clothing_list based on the selected category
  const filteredClothing = clothing_list.filter(
    (item) => category === "All" || item.category === category
  );

  useEffect(() => {
    if (filteredClothing.length === 0 && category !== "All") {
      toast.info(
        "Currently, there are no products available in this category."
      );
    }
  }, [category, filteredClothing]);

  if (!menu_list || menu_list.length === 0) {
    return (
      <div className="explore-menu p-6 text-center bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">Explore Our Menu</h1>
        <p className="mt-4 text-gray-600">
          Currently, there are no menu items available. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="explore-menu p-6 text-center bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800">Explore Our Menu</h1>
      <p className="mt-4 text-gray-600">
        Discover unique thrifted treasures that celebrate style and
        sustainability, one find at a time.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            className={`flex flex-col items-center cursor-pointer ${
              category !== item.menu_name && category !== "All"
                ? "grayscale"
                : ""
            }`} // Apply grayscale if not selected
          >
            <img
              src={item.menu_image}
              className="w-60 rounded-md h-80 object-cover mb-2 transition-transform duration-300 ease-in-out transform hover:scale-95 hover:shadow-lg" // Increased height
              alt={item.menu_name}
            />
            <p className="text-sm font-semibold text-gray-700">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      {filteredClothing.length === 0 && category !== "All" && (
        <div className="no-products mt-6 p-4 text-center bg-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800">
            No Products Available
          </h2>
          <p className="mt-2 text-gray-600">
            Currently, there are no products available in this category.
          </p>
        </div>
      )}
      <hr className="my-6 border-gray-300" />
    </div>
  );
};

export default ExploreMenu;
