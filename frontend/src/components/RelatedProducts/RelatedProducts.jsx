import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import ClothingItem from "../ClothingItem/ClothingItem";

const RelatedProducts = ({ currentId }) => {
  const { clothing_list } = useContext(StoreContext);

  const relatedProducts = clothing_list
    .filter((item) => item._id !== currentId)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Related Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {relatedProducts.map((item) => (
          <ClothingItem
            key={item._id}
            image={item.image}
            name={item.name}
            desc={item.description}
            price={item.price}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
