import { useContext, useRef } from "react";
import "./ClothingDisplay.css";
import ClothingItem from "../ClothingItem/ClothingItem"; // Assuming you have a ClothingItem component
import { StoreContext } from "../../Context/StoreContext";

const ClothingDisplay = ({ category }) => {
  const { clothing_list } = useContext(StoreContext);
  // Check if clothing_list is defined and has items
  if (!clothing_list || clothing_list.length === 0) {
    return (
      <div className="clothing-display text-center p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">No Clothing Items Available</h2>
        <p className="mt-2 text-gray-600">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="clothing-display mt-6" id="clothing-display">
      <h2 className="text-3xl font-bold text-center mb-6">
        Top Clothing Picks for You
      </h2>
      <div className="clothing-display-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {clothing_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <ClothingItem
                key={item._id}
                image={item.image}
                name={item.name}
                desc={item.description}
                price={item.price}
                id={item._id}
              />
            );
          }
          return null; // Return null for items not matching category
        })}
      </div>
    </div>
  );
};

export default ClothingDisplay;
