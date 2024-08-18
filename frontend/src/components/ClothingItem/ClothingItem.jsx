import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ClothingItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const ClothingItem = ({ image, name, price, desc, id }) => {
  const { cartItems, addToCart, removeFromCart, url, currency } =
    useContext(StoreContext);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Handler for image click to navigate to the details page
  const handleImageClick = () => {
    navigate(`/clothing/${id}`); // Navigate to the clothing details page
  };

  return (
    <div className="clothing-item cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg border hover:bg-gray-100 rounded-lg overflow-hidden">
      <div className="clothing-item-img-container relative">
        <img
          className="clothing-item-image "
          src={`${url}/images/${image}`} // Make sure the URL is properly formatted
          alt={name}
          onClick={handleImageClick} // Add click handler to the image
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-gray-600 mt-1 text-sm">{desc}</p>
        <p className="text-lg font-bold mt-2 text-gray-900">
          Rs.
          {price}
        </p>
      </div>
    </div>
  );
};

export default ClothingItem;
