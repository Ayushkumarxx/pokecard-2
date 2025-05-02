import React from "react";
import Exports from "../utils/export";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

/**
 * Navbar Component
 * Displays logo, site title, and the search bar.
 */
const Navbar = ({ onSearch }) => {
  const navigate = useNavigate(); // To navigate back to the homepage

  return (
    <nav className="max-w-[1440px] mx-auto px-4 py-4 flex flex-col md:flex-row gap-8 md:gap-0 justify-between items-center">
      <div className="flex flex-col gap-2 items-center">
        <img src={Exports.images.logo} alt="logo" className="w-[140px]" />
        <h1 className="text-[18px] font-[700] text-[#FFCB05] text-border-md leading-0">
          CARDS
        </h1>
      </div>

      <div className="flex gap-4 max-md:gap-2 items-center">
        <Exports.components.searchBar onSearch={onSearch} />

        <button
          className="py-3 px-4 max-md:px-3 bg-[#333333] rounded-full cursor-pointer flex gap-2 items-center "
          onClick={() => navigate("/favorites")}
        >
          <FaHeart className="text-gray-300 text-[20px] md:text-[20px] " />{" "}
          <p className="text-gray-300 text-[14px] font-bold">Favorites</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
