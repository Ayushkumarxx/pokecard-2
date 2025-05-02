import React from "react";

const Button = ({ onClick, disabled, className, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`py-2 px-4 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 shadow-md transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);

export default Button;
