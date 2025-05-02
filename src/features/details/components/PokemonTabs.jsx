import React from "react";

// Reusable PokemonTabs Component
const PokemonTabs = ({ activeTab, setActiveTab }) => (
  <div className="w-full overflow-x-auto mb-8 px-2">
    <div className="flex space-x-2 py-2 px-2 bg-[#1E1E1E] rounded-full min-w-max max-md:min-w-[80vw] max-md:justify-between">
      {["stats", "evolution", "abilities", "moves"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium capitalize flex-shrink-0 whitespace-nowrap transition-all duration-200 ${
            activeTab === tab
              ? "bg-indigo-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

export default PokemonTabs;
