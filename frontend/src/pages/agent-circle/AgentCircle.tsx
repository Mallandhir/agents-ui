import { useState } from "react";
import { CenterCard } from "./components/CenterCard";
import { DonutChart } from "./components/DonutChart";
import { entitiesData } from "./data";
import { EntityData } from "./types";

export const AgentCircle: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<EntityData>(entitiesData[0]);
  const [data, setData] = useState<EntityData[]>(entitiesData);

  const handleEntityClick = (entity: EntityData) => {
    console.log(`Clicked entity: ${entity.name} (${entity.id})`);
    setSelectedEntity(entity);
  };

  return (
    <div>
      <div className="relative w-[738px] h-[738px]">
        {/* Donut Chart */}
        <div className="absolute inset-0">
          <DonutChart data={data} width={738} height={738} onEntityClick={handleEntityClick} />
        </div>

        {/* Center card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <CenterCard entity={selectedEntity} onEntityClick={handleEntityClick} />
          </div>
        </div>
      </div>
    </div>
  );
};
