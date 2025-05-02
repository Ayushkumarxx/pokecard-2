import React from "react";
import Exports from "../utils/export"; // Adjust the path based on your folder structure

const SectionLoader = ({ message = "Loading Pokémon...", minHeight = "min-h-[500px]" }) => {
  return (
    <div className={`${minHeight} flex justify-center items-center`}>
      <div className="text-center">
        <img
          src={Exports.images.pokeBall}
          alt="Loading"
          className="w-16 h-16 mx-auto mb-3 animate-spin"
        />
        <p className="text-lg text-[#FFCB05] font-bold text-border-md">
          {message}
        </p>
      </div>
    </div>
  );
};

export default SectionLoader;