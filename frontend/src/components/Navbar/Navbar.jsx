import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBasketShopping,
  faUser,
  faSignOutAlt,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { StoreContext } from "../../Context/StoreContext";
import "./Navbar.css";
import Search from "../Search/Search";

const Navbar = ({ setShowLogin, scrollToProducts }) => {
  const [menu, setMenu] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear the search input after submitting
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="labos text-6xl">LABOS</h1>
      </Link>

      <ul className="navbar-menu">
        <Search />
      </ul>
      <div className="navbar-right">
        <Link to="/cart" className="navbar-search-icon">
          <FontAwesomeIcon icon={faBasketShopping} className="navbar-icon" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <FontAwesomeIcon icon={faUser} className="navbar-icon" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <FontAwesomeIcon icon={faBagShopping} className="navbar-icon" />{" "}
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="navbar-icon" />{" "}
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
