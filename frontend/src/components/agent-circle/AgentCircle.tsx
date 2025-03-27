import { CenterCard } from "./components/CenterCard";
import { DonutChart } from "./components/DonutChart";
import { EntityData } from "./types";

interface AgentCircleProps {
  onClickEntity: (entity: EntityData) => void;
  onClickDetails: (entity: EntityData) => void;
  size?: number;
  entities: EntityData[];
  activeEntity?: EntityData;
}

export const AgentCircle: React.FC<AgentCircleProps> = ({
  entities,
  onClickEntity,
  onClickDetails,
  size = 500,
  activeEntity
}) => {
  if (!entities.length) return null;

  const handleEntityClick = (entity: EntityData) => {
    console.log(`Clicked entity: ${entity.name} (${entity.id})`);
    onClickEntity(entity);
  };

  return (
    <div>
      <div className={`relative w-[${size}px] h-[${size}px]`}>
        {/* Donut Chart */}
        <div>
          <DonutChart
            data={entities}
            activeEntity={activeEntity}
            width={size}
            height={size}
            onEntityClick={handleEntityClick}
            centerContent={
              activeEntity && (
                <CenterCard entity={activeEntity} onEntityClick={handleEntityClick} onClickDetails={onClickDetails} />
              )
            }
          />
        </div>
      </div>
    </div>
  );
};
