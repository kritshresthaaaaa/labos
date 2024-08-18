import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { url, token, currency } = useContext(StoreContext);
  const location = useLocation();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setOrders(response.data.data);
      setError(null);
    } catch (err) {
      setError("Error fetching orders. Please try again later.");
      toast.error("Error fetching orders. Please try again later."); // Show error notification
    } finally {
      setLoading(false);
    }
  };

  // Define placeOrder function outside of useEffect
  const placeOrder = async (orderData) => {
    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      console.log(response.data);
      if (response.data.success) {
        toast.success("Payment Successful! Your order has been placed.");
        // Ensure setCartItems is defined or handle cart items appropriately
        // setCartItems({});
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error placing order");
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();

      const queryParams = new URLSearchParams(location.search);
      const responseData = queryParams.get("data");
      if (responseData) {
        try {
          const decodedData = JSON.parse(atob(responseData));

          if (decodedData.status === "COMPLETE") {
            const sessionData = sessionStorage.getItem("orderData");
            if (sessionData) {
              try {
                const orderData = JSON.parse(sessionData);
                // Clear session data after retrieving
                sessionStorage.removeItem("orderData");
                placeOrder(orderData);
              } catch (error) {
                toast.error("Invalid session data.");
              }
            }
          } else {
            toast.error("Order placement failed.");
          }
        } catch (error) {
          toast.error("Invalid response data.");
        }
      }
    }
  }, [token, location.search]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="container">
          {orders.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Order Icon" />
              <p>
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index === order.items.length - 1 ? "" : ", "}
                  </span>
                ))}
              </p>
              <p>
                {currency}
                {order.amount}.00
              </p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={() => fetchOrders()}>Refresh Orders</button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer /> {/* Add ToastContainer component */}
    </div>
  );
};

export default MyOrders;
