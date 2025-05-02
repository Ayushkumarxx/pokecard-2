import React from "react";


// the small stat bar component
const StatBar = ({ value, maxValue = 255, color }) => {
  const percentage = Math.min(100, (value / maxValue) * 100);

  return (
    <div className="flex items-center w-full">
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden shadow-inner">
        <div
          className={`h-2 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatBar;
