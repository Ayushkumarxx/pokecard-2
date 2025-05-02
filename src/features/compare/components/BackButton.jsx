import React from "react";

import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick} // Navigate back to the homepage using useNavigate
    className="text-white font-bold text-[18px] mb-4 py-2 px-4 flex items-center hover:bg-gray-800 cursor-pointer rounded-full "
  >
    <FaArrowLeft className="mr-2" /> Back
  </button>
);

export default BackButton;
