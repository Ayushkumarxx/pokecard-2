import React from "react";
import Exports from "../utils/export"; 

// Loader component with optional message and height
const SectionLoader = ({ message = "Loading Pokémon...", minHeight = "min-h-[500px]" }) => {
  return (
    <div className={`${minHeight} flex justify-center items-center`}>
      <div className="text-center">
        {/* Spinner icon */}
        <img
          src={Exports.images.pokeBall}
          alt="Loading"
          className="w-16 h-16 mx-auto mb-3 animate-spin"
        />
        {/* Loading message */}
        <p className="text-lg text-[#FFCB05] font-bold text-border-md">
          {message}
        </p>
      </div>
    </div>
  );
};

export default SectionLoader;
