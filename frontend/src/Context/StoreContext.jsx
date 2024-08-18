import { createContext, useEffect, useState } from "react";
import { clothing_list, menu_list } from "../assets/assets"; // Updated to reflect clothing_list
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [clothing_list, setClothingList] = useState([]); // Updated to clothing_list
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const currency = "Rs.";
  const deliveryCharge = 5;
  const categories = [
    { name: "Men" },
    { name: "Women" },
    { name: "Kids" },
    { name: "Outerwear" },
    { name: "Accessories" },
  ];
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          let itemInfo = clothing_list.find((product) => product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        }
      } catch (error) {}
    }
    return totalAmount;
  };

  const fetchClothingList = async () => {
    // Updated function name
    const response = await axios.get(url + "/api/clothing/list");
    setClothingList(response.data.data); // Updated to setClothingList
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } } // Corrected to include braces
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchClothingList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token")); // Removed braces
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,
    categories,
    clothing_list, // Updated to clothing_list
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData,
    setCartItems,
    currency,
    deliveryCharge,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
