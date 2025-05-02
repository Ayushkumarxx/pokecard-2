import React from "react";
import { FiSearch } from 'react-icons/fi';

/**
 * NoResults Component
 * Displays a message when no Pokémon are found matching the search term.
 */
const NoResults = ({ searchTerm }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
      {/* ? Pokémon search icon inside a styled circle */}
      <div className="bg-gray-800/40 p-6 rounded-full mb-6">
        <FiSearch className="text-[#FFCB05] text-5xl" />
      </div>
      
      {/* ? Heading for no results found */}
      <h2 className="text-2xl font-bold text-white mb-2">No Pokémon Found</h2>
      
      {/* ? Message with highlighted search term */}
      <p className="text-gray-400 text-center max-w-md mb-6">
        We couldn't find any Pokémon matching "<span className="text-[#FFCB05]">{searchTerm}</span>".
        Try a different search term or check your filters.
      </p>
      
      {/* ? Loading animation using bouncing dots */}
      <div className="flex gap-3">
        {[0, 150, 300].map((delay) => (
          <div
            key={delay}
            className="w-3 h-3 bg-[#FFCB05] rounded-full animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default NoResults;
