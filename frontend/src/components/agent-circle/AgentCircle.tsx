import { useState } from "react";
import { CenterCard } from "./components/CenterCard";
import { DonutChart } from "./components/DonutChart";
import { entitiesData } from "./data";
import { EntityData } from "./types";

interface AgentCircleProps {
  onClickEntity: (entity: EntityData) => void;
  onClickDetails: (entity: EntityData) => void;
  size?: number;
}

export const AgentCircle: React.FC<AgentCircleProps> = ({ onClickEntity, onClickDetails, size = 500 }) => {
  const [selectedEntity, setSelectedEntity] = useState<EntityData>(entitiesData[0]);
  const [data, setData] = useState<EntityData[]>(entitiesData);

  const handleEntityClick = (entity: EntityData) => {
    console.log(`Clicked entity: ${entity.name} (${entity.id})`);
    setSelectedEntity(entity);
    onClickEntity(entity);
  };

  return (
    <div>
      <div className={`relative w-[${size}px] h-[${size}px]`}>
        {/* Donut Chart */}
        <div>
          <DonutChart data={data} width={size} height={size} onEntityClick={handleEntityClick} />
        </div>

        {/* Center card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <CenterCard entity={selectedEntity} onEntityClick={handleEntityClick} onClickDetails={onClickDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};
