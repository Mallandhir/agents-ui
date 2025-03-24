import React from "react";
import { EntityData } from "../types";

interface ChartLabelProps {
  entity: EntityData;
  isActive: boolean;
}

export const ChartLabel: React.FC<ChartLabelProps> = ({ entity, isActive }) => (
  <div className="flex flex-col items-center pointer-events-none">
    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
      <img src={entity.imageSrc} alt={entity.name} className="w-full h-full object-cover" />
    </div>
    <div className={`text-center font-montreal text-base ${isActive ? "text-white" : "text-custom-text-primary"}`}>
      {entity.name}
    </div>
    <div
      className={`text-center font-montreal-mono text-xs ${isActive ? "text-white/60" : "text-custom-text-secondary"}`}
    >
      {entity.role}
    </div>
  </div>
);

export default ChartLabel;
