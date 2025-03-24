import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export const NewMissionButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Button
      variant="outline"
      className="inline-flex items-center gap-3 px-4 py-2 relative w-full rounded-lg border border-solid border-[#00000008] shadow-[inset_0px_4px_9px_#ffffff40] [background:linear-gradient(0deg,rgba(218,203,225,0.13)_0%,rgba(218,203,225,0.13)_100%)]"
      onClick={handleClick}
    >
      <img className="w-5 h-5" alt="Button" src="/button.svg" />
      <span className="font-medium text-[#292929] text-xs tracking-[0] leading-4 whitespace-nowrap">NEW MISSION</span>
    </Button>
  );
};
