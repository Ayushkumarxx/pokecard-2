import React, { useState, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";

/**
 * SearchBar Component
 * A compact search input with live search capability.
 * Features a clear button and visual feedback while searching.
 */
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Timer reference for debounce behavior
  const timerRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Reset debounce timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (value.length > 0) {
      setIsSearching(true);

      timerRef.current = setTimeout(() => {
        if (onSearch) {
          onSearch(value);
          setIsSearching(false);
        }
      }, 300);
    } else {
      setIsSearching(false);
      if (onSearch) {
        onSearch(""); // Reset search results
      }
    }
  };

  // Clear the search input and reset state
  const clearSearch = () => {
    setQuery("");
    setIsSearching(false);
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="flex items-center gap-4 relative">
      {/* Text input with search and clear icons */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="rounded-full pl-12 pr-10 py-3 bg-[#333333] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCB05] w-48 md:w-64 transition-all duration-300 font-semibold"
        />
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />

        {/* Clear (X) button when input is not empty */}
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Feedback indicator during search debounce */}
      {isSearching && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-[#FFCB05] flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FFCB05] animate-pulse"></div>
          Searching...
        </div>
      )}
    </div>
  );
}

export default SearchBar;
