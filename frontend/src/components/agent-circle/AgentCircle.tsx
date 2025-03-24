import { useState } from "react";
import { CenterCard } from "./components/CenterCard";
import { DonutChart } from "./components/DonutChart";
import { entitiesData } from "./data";
import { EntityData } from "./types";

interface AgentCircleProps {
  onClickDetails: () => void;
}

export const AgentCircle: React.FC<AgentCircleProps> = ({ onClickDetails }) => {
  const [selectedEntity, setSelectedEntity] = useState<EntityData>(entitiesData[0]);
  const [data, setData] = useState<EntityData[]>(entitiesData);

  const handleEntityClick = (entity: EntityData) => {
    console.log(`Clicked entity: ${entity.name} (${entity.id})`);
    setSelectedEntity(entity);
  };

  return (
    <div>
      <div className={`relative w-[575px] h-[575px]`}>
        {/* Donut Chart */}
        <div>
          <DonutChart data={data} width={575} height={575} onEntityClick={handleEntityClick} />
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
