import { Switch } from "@/components/ui/Switch";
import useStore from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import ServerWebsocket from "@/services/ServerWebsocket";
import { IAgentThinkingStep } from "@/stores/GroupChat";
import { IAIChatMessage } from "@/types/ai/chat.types";
import { createTextMessageObj } from "@/utils/messageUtils";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useRef, useState } from "react";
import { DonutChart, DonutChartRef } from "../agent-circle/components/DonutChart";
import { AIMessage } from "../plan-chat/components/AIMessage";
import MessageContentUi from "../plan-chat/components/MessageContentUi";
import { UserMessage } from "../plan-chat/components/UserMessage";
import { agentCircleVariants, containerVariants } from "./animations";
import { ChatInput } from "./components/ChatInput";
import { Header } from "./components/Header";
import { OutputDataCard } from "./components/OutputDataCard";
import { ThinkingProcessCard } from "./components/ThinkingProcessCard";
import { PROGRESS_VALUE } from "./constants";
import { Button } from "./ui/button";

const chartSize = 650;

const AgentChat: React.FC = () => {
  const store = useStore();
  const donutChartRef = useRef<DonutChartRef>(null);

  const [showReport, setShowReport] = useState(false);
  const [preview, setPreview] = useState<IAgentThinkingStep | null>(null);
  const [initialMessage, setInitialMessage] = useState<IAIChatMessage | null>(null);

  const agentId = store.groupChat.activeAgentId;
  const agents = store.groupChat.agents;

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);

    const messageObj = createTextMessageObj(message);
    if (agentId) {
      const teamId = Object.values(store.groupChat.teams).find((team) => team.agentIds.includes(agentId))?.id;
      runInAction(() => {
        store.groupChat.agentsRecord[agentId].events.push({
          data: {
            type: "full_assistant_message",
            message: messageObj,
            agent_id: agentId,
            team_id: teamId
          },
          topic: "AGENT_RUN",
          timestamp: new Date().getTime(),
          reqId: ""
        });
      });
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
      setInitialMessage(messageObj);
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
      <motion.div id="agent-view" className="rounded-xl w-full flex flex-col min-w-1/2 max-w-[625px] bg-white px-4 ">
        {agent && (
          <div className="py-3">
            <Header
              title={agent.name ?? ""}
              subtitle={agent.name ?? ""}
              progress={PROGRESS_VALUE}
              avatarUrl={agent.imageSrc ?? ""}
            />
          </div>
        )}
        <div className="absolute top-3 right-12">
          <Switch
            checked={showReport}
            onCheckedChange={setShowReport}
            className="data-[state=checked]:bg-[#DB91E560]"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <>
            {!showReport && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex flex-col w-full max-w-lg mx-auto gap-4 px-4">
                  {initialMessage && <UserMessage key={`message-${initialMessage.id}`} message={initialMessage} />}
                  {agent?.events?.map((event, index) => {
                    if (event.data.type !== "full_assistant_message") return null;
                    const message = event.data.message;
                    return (
                      <>
                        {message.role === "user" ? (
                          <UserMessage key={`message-${index}`} message={message} />
                        ) : (
                          <AIMessage key={`message-${index}`} message={message} />
                        )}
                      </>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </>

          {showReport && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-4"
              >
                {initialMessage && <UserMessage key={`message-${initialMessage.id}`} message={initialMessage} />}

                <ThinkingProcessCard
                  title="THINKING PROCESS"
                  steps={agent?.report?.thinking?.steps ?? []}
                  onClickPreview={(step) => {
                    setPreview(step);
                  }}
                />
                {agent?.report?.output?.text && <OutputDataCard title="OUTPUT" output={agent?.report?.output} />}
              </motion.div>
            </>
          )}
        </div>

        <ChatInput placeholder="Chat with Nova" onSend={handleSendMessage} onVoice={handleVoiceInput} />
      </motion.div>

      {preview ? (
        <>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div className="p-4 pt-[40px] max-w-lg ">
              <div className="flex flex-col gap-4 w-fit ">
                <Button variant="outline" className="w-fit cursor-pointer" onClick={() => setPreview(null)}>
                  <ArrowLeftIcon /> Back
                </Button>
                <div className="">
                  <MessageContentUi message={preview.toolResult as any}></MessageContentUi>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            variants={agentCircleVariants}
            initial="hidden"
            animate="visible"
            id="team-view"
            className={cn("self-center", agentId ? "  " : "w-full flex justify-center")}
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
                  />
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default observer(AgentChat);
