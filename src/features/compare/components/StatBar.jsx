import React from "react";

const StatBar = ({ value, maxValue = 255, color }) => {
  const percentage = Math.min(100, (value / maxValue) * 100);

  return (
    <div className="flex items-center w-full">
      <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className={`h-4 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-sm font-bold text-white ml-2">{value}</span>
    </div>
  );
};

export default StatBar;
