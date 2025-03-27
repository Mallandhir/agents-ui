import useStore from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import ServerWebsocket from "@/services/ServerWebsocket";
import { createTextMessageObj } from "@/utils/messageUtils";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { CenterCard } from "../agent-circle/components/CenterCard";
import { DonutChart, DonutChartRef } from "../agent-circle/components/DonutChart";
import { AIMessage } from "../plan-chat/components/AIMessage";
import { UserMessage } from "../plan-chat/components/UserMessage";
import { agentCircleVariants, containerVariants } from "./animations";
import { ChatInput } from "./components/ChatInput";

const chartSize = 650;

const AgentChat: React.FC = () => {
  const store = useStore();
  const donutChartRef = useRef<DonutChartRef>(null);

  const agentId = store.groupChat.activeAgentId;
  const agents = store.groupChat.agents;

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);

    const messageObj = createTextMessageObj(message);
    if (agentId) {
      const teamId = Object.values(store.groupChat.teams).find((team) => team.agentIds.includes(agentId))?.id;
      ServerWebsocket.send({
        topic: "AGENT_USER_INPUT",
        data: {
          body: {
            agent_id: agentId,
            message: messageObj,
            team_id: teamId
          }
        }
      });
    } else {
      store.groupChat.kickoffTeam({
        teamId: "Outbound Orchestrator Team",
        message: messageObj,
        callbacks: {
          onHandoff: (event) => {
            console.log("Handoff event:", event);
          }
        }
      });
    }
  };

  const handleVoiceInput = () => {
    console.log("Voice input activated");
  };

  const agent = agents.find((agent) => agent.id === agentId);

  return (
    <motion.div
      layout
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-row justify-between gap-2 w-[100vw] overflow-x-hidden p-4 h-[100vh]"
    >
      <motion.div id="agent-view" className="rounded-xl w-full flex flex-col min-w-1/2 max-w-[625px] bg-white">
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col w-full max-w-lg mx-auto gap-4 p-4">
            {agent?.events?.map((event, index) => {
              if (event.data.type !== "full_assistant_message") return null;
              const message = event.data.message;
              return (
                <>
                  {message.type === "user" ? (
                    <UserMessage key={`message-${index}`} message={message} />
                  ) : (
                    <AIMessage key={`message-${index}`} message={message} />
                  )}
                </>
              );
            })}
          </div>
        </div>

        <ChatInput placeholder="Chat with Nova" onSend={handleSendMessage} onVoice={handleVoiceInput} />
      </motion.div>
      <motion.div
        variants={agentCircleVariants}
        initial="hidden"
        animate="visible"
        id="team-view"
        className={cn("self-center", agentId ? "-mr-48  " : "w-full flex justify-center")}
      >
        {agents.length > 0 && (
          <>
            <div className={`relative w-[${chartSize}px] h-[${chartSize}px]`}>
              <DonutChart
                ref={donutChartRef}
                data={agents}
                activeEntity={agent}
                width={chartSize}
                height={chartSize}
                onEntityClick={(entity) => {
                  store.groupChat.setActiveAgentId(entity.id);
                }}
                centerContent={
                  agent && <CenterCard entity={agent} onEntityClick={() => {}} onClickDetails={() => {}} />
                }
              />
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default observer(AgentChat);
