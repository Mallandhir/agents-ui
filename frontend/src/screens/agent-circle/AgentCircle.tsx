import React, { useState } from "react";
import { EntityData } from "./types";
import { entitiesData } from "./data";
import { CenterCard } from "./components/CenterCard";
import { DonutChart } from "./components/DonutChart";

export const AgentCircle = (): JSX.Element => {
  const [selectedEntity, setSelectedEntity] = useState<EntityData>(entitiesData[0]);

  const handleEntityClick = (entity: EntityData) => {
    console.log(`Clicked entity: ${entity.name} (${entity.id})`);
    setSelectedEntity(entity);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="relative w-[738px] h-[738px]">
        {/* Donut Chart */}
        <div className="absolute inset-0">
          <DonutChart data={entitiesData} width={738} height={738} onEntityClick={handleEntityClick} />
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
