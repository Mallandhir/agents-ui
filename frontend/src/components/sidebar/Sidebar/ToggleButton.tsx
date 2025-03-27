import React from "react";

interface ToggleButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ isExpanded, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-3.5 z-50 rounded-full p-2 transition-colors duration-200 w-8 h-8 flex items-center justify-center ${
        isExpanded ? "right-5" : "-right-8"
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
