import React, { useState } from "react";
import { FiFilter, FiChevronDown, FiX } from "react-icons/fi";
import typeStyles from "../../../shared/utils/typeStyle";

const FilterTypes = ({
  types,
  selectedTypes,
  onTypeToggle,
  onClearAll,
  onSort,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSort, setCurrentSort] = useState({
    field: null,
    direction: "asc",
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSort = (field) => {
    let direction = "asc";
    if (currentSort.field === field) {
      direction = currentSort.direction === "asc" ? "desc" : "asc";
    }

    setCurrentSort({ field, direction });
    if (onSort) onSort(field, direction);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 cursor-pointer">
        <div className="flex items-center gap-2 text-[16px] ">
          <FiFilter className="text-[#FFCB05]" />
          <h3 className="text-white font-bold">Filter by Type</h3>
          {selectedTypes.length > 0 && (
            <button
              onClick={onClearAll}
              className="px-3 py-1.5 rounded-full text-white transition-all duration-300 text-[12px] flex items-center gap-1 font-semibold ml-2 cursor-pointer"
              style={{ background: "rgba(255, 77, 79, 0.8)" }}
            >
              <FiX /> Clear All Filters
            </button>
          )}
        </div>
        <FiChevronDown
          className={`text-white transition-transform duration-300 ${
            isExpanded ? "transform rotate-180" : ""
          }`}
          onClick={toggleExpand}
        />
      </div>

      {isExpanded && (
        <>
          <div className="flex flex-wrap gap-2 animate-fadeIn">
            {types.map((type) => {
              const typeStyle = typeStyles[type] || {
                color: "#CCCCCC",
                gradient: "linear-gradient(135deg, #CCCCCC, #999999)",
              };

              return (
                <button
                  key={type}
                  onClick={() => onTypeToggle(type)}
                  className={`px-3.5 py-2 rounded-full capitalize text-white transition-all duration-300 text-[14px] ${
                    selectedTypes.includes(type)
                      ? "shadow-lg transform scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{
                    background: selectedTypes.includes(type)
                      ? typeStyle.gradient
                      : "rgba(255,255,255,0.1)",
                  }}
                >
                  {type}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 mt-4 mb-4 font-semibold animate-fadeIn">
            <button
              onClick={() => handleSort("id")}
              className={`px-3.5 py-2 rounded-full text-white transition-all duration-300 text-[14px]`}
              style={{
                background:
                  currentSort.field === "id"
                    ? "linear-gradient(135deg, #FFCB05, #FFA500)"
                    : "rgba(255,255,255,0.1)",
              }}
            >
              Sort by ID{" "}
              {currentSort.field === "id" &&
                (currentSort.direction === "asc" ? "↑" : "↓")}
            </button>

            <button
              onClick={() => handleSort("alphabetical")}
              className={`px-3.5 py-2 rounded-full text-white transition-all duration-300 text-[14px]`}
              style={{
                background:
                  currentSort.field === "alphabetical"
                    ? "linear-gradient(135deg, #FFCB05, #FFA500)"
                    : "rgba(255,255,255,0.1)",
              }}
            >
              Sort Alphabetically{" "}
              {currentSort.field === "alphabetical" &&
                (currentSort.direction === "asc" ? "↑" : "↓")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterTypes;
