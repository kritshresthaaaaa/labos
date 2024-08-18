import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

const PlaceOrder = () => {
  const [payment, setPayment] = useState("cod");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const {
    getTotalCartAmount,
    token,
    clothing_list,
    cartItems,
    url,
    setCartItems,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    clothing_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryCharge,
    };
    // Store orderData in sessionStorage
    sessionStorage.setItem("orderData", JSON.stringify(orderData));
    if (payment === "esewa") {
      try {
        const total_amount = getTotalCartAmount() + deliveryCharge;
        const transactionUuid = uuidv4();
        const message = `total_amount=${total_amount},transaction_uuid=${transactionUuid},product_code=EPAYTEST`;
        const signature = CryptoJS.HmacSHA256(
          message,
          "8gBm/:&EnhH.1/q"
        ).toString(CryptoJS.enc.Base64);

        // Create and submit eSewa form
        const form = document.createElement("form");
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        form.method = "POST";

        const fields = {
          amount: total_amount.toString(),
          tax_amount: "0",
          total_amount: total_amount.toString(),
          transaction_uuid: transactionUuid,
          product_code: "EPAYTEST",
          product_service_charge: "0",
          product_delivery_charge: "0",
          success_url: "http://localhost:5173/myorders", // Update with your success URL
          failure_url: "http://localhost:5173/payment-failure", // Update with your failure URL
          signed_field_names: "total_amount,transaction_uuid,product_code",
          signature: signature,
        };

        Object.keys(fields).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = fields[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } catch (error) {
        toast.error("Error processing payment");
      }
    } else {
      try {
        let response = await axios.post(
          url + "/api/order/placecod",
          orderData,
          {
            headers: { token },
          }
        );
        if (response.data.success) {
          navigate("/myorders");
          toast.success(response.data.message);
          setCartItems({});
        } else {
          toast.error("Something Went Wrong");
        }
      } catch (error) {
        toast.error("Error placing order");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("To place an order, sign in first");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="First name"
            required
          />
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="Last name"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email address"
          required
        />
        <input
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
          required
        />
        <div className="multi-field">
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
            required
          />
        </div>
        <div className="multi-field">
          <input
            type="text"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder="Zip code"
            required
          />
          <input
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>
                {currency}
                {getTotalCartAmount()}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>
                {currency}
                {getTotalCartAmount() === 0 ? 0 : deliveryCharge}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                {currency}
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryCharge}
              </b>
            </div>
          </div>
        </div>
        <div className="payment">
          <h2>Payment Method</h2>
          <div onClick={() => setPayment("cod")} className="payment-option">
            <img
              src={payment === "cod" ? assets.checked : assets.un_checked}
              alt="Cash on Delivery"
            />
            <p>COD (Cash on delivery)</p>
          </div>
          <div onClick={() => setPayment("esewa")} className="payment-option">
            <img
              src={payment === "esewa" ? assets.checked : assets.un_checked}
              alt="eSewa"
            />
            <p>eSewa Pre-Payment</p>
          </div>
        </div>
        <button className="place-order-submit" type="submit">
          {payment === "cod" ? "Place Order" : "Proceed To Payment"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
