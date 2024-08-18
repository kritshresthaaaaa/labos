import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>
          Discover Unique Finds at <span className="labos">LABOS</span>
        </h2>
        <p>
          Explore a curated collection of pre-loved fashion and timeless
          treasures. Each piece at <span className="labos text-2xl">LABOS</span>{" "}
          is handpicked to offer you quality, style, and sustainability. Start
          your treasure hunt today and redefine your wardrobe with unique,
          affordable fashion.
        </p>
        <button className="bg-black text-white font-semibold py-2 px-4 rounded transition duration-200 hover:bg-white hover:text-black">
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default Header;
