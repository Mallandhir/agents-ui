import { AgentCircle } from "@/components/agent-circle";
import { entitiesData } from "@/components/agent-circle/data";
import { useNavigate } from "react-router-dom";
const TeamView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen w-full p-4">
        <div className="text-light">Your Virtual Team</div>
        <div className="flex justify-center items-center">
          <AgentCircle
            entities={entitiesData}
            onClickDetails={() => {
              navigate("/agent-view");
            }}
            onClickEntity={() => {}}
            size={625}
          />
        </div>
      </div>
    </>
  );
};

export default TeamView;
