import { AgentCircle } from "@/components/agent-circle";
import { useNavigate } from "react-router-dom";
const TeamView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <AgentCircle
        onClickDetails={() => {
          navigate("/agent-view");
        }}
      />
    </>
  );
};

export default TeamView;
