import React from "react";
import { FiSearch } from 'react-icons/fi';

/**
 * A component that displays a message when no Pokémon are found.
 */
const NoResults = ({ searchTerm }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
      {/* Display the Pokémon search icon in a yellow circle */}
      <div className="bg-gray-800/40 p-6 rounded-full mb-6">
        <FiSearch className="text-[#FFCB05] text-5xl" />
      </div>
      
      {/* Display the heading message */}
      <h2 className="text-2xl font-bold text-white mb-2">No Pokémon Found</h2>
      
      {/* Display the message with the search term highlighted */}
      <p className="text-gray-400 text-center max-w-md mb-6">
        We couldn't find any Pokémon matching "<span className="text-[#FFCB05]">{searchTerm}</span>".
        Try a different search term or check your filters.
      </p>
      
      {/* Display the loading animation */}
      <div className="flex gap-3">
        <div className="w-3 h-3 bg-[#FFCB05] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-[#FFCB05] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-[#FFCB05] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default NoResults;