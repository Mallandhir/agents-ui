import React from "react";

interface ToggleButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ isExpanded, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-5 z-50 bg-white rounded-full p-2 border border-gray-200 hover:bg-gray-50 transition-colors duration-200 w-8 h-8 flex items-center justify-center ${
        isExpanded ? "-right-4" : "-right-10"
      }`}
    >
      {isExpanded ? (
        <img src="/collapse-icon.svg" alt="Collapse" className="w-4 h-4" />
      ) : (
        <img src="/expand-icon.svg" alt="Expand" className="w-4 h-4" />
      )}
    </button>
  );
};
