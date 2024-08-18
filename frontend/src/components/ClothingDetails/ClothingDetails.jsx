import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";

const ClothingDetails = () => {
  const { id } = useParams();
  const { clothing_list, url, cartItems, addToCart, removeFromCart, currency } =
    useContext(StoreContext);

  const [animate, setAnimate] = useState(false);

  const item = clothing_list.find((item) => item._id === id);

  const handleAddToCart = (itemId) => {
    addToCart(itemId);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000); // Remove animation class after 1 second
  };

  if (!item) {
    return (
      <div className="text-center p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Item Not Found</h2>
        <p className="text-lg text-gray-600">Please check other items.</p>
      </div>
    );
  }

  return (
    <div className="p-6 m-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex flex-col lg:flex-row">
        {/* Image Container */}
        <div className="lg:w-1/2 mb-6 lg:mb-0 lg:mr-6 flex justify-center">
          <img
            src={`${url}/images/${item.image}`}
            alt={item.name}
            className="w-full h-auto max-h-[600px] object-cover rounded-xl shadow-md"
          />
        </div>
        {/* Item Details */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              {item.name}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{item.description}</p>
            <p className="text-2xl font-semibold mb-6 text-gray-900">
              {currency}
              {item.price}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 mt-6">
            {!cartItems[id] ? (
              <button
                onClick={() => handleAddToCart(id)}
                className="flex items-center px-6 py-3 bg-[#1c1c1c] text-white rounded-lg hover:bg-[#333333] transition duration-300 ease-in-out"
              >
                <FaCartPlus
                  className={`mr-2 text-xl ${animate ? "animate-green" : ""}`}
                />
                Add to Cart
              </button>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => removeFromCart(id)}
                    className="flex items-center px-4 py-2 bg-[#1c1c1c] text-white rounded-lg hover:bg-[#333333] transition duration-300 ease-in-out"
                  >
                    <FaMinus className="text-lg" />
                  </button>
                  <p className="text-xl font-semibold">{cartItems[id]}</p>
                  <button
                    onClick={() => addToCart(id)}
                    className="flex items-center px-4 py-2 bg-[#1c1c1c] text-white rounded-lg hover:bg-[#333333] transition duration-300 ease-in-out"
                  >
                    <FaPlus className="text-lg" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <RelatedProducts currentId={item._id} />
    </div>
  );
};

export default ClothingDetails;
