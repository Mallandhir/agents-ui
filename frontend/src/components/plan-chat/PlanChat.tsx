import { AgentCircle } from "@/components/agent-circle";
import { DeployCard } from "@/components/deploy-card";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatTextarea from "../start-mission/components/ChatTextarea";
import { chatSectionVariants, containerVariants, sidebarVariants } from "./animations";
import ChatSection from "./components/ChatSection";

export const PlanChat: React.FC = () => {
  const navigate = useNavigate();
  const [showAgentCircle, setShowAgentCircle] = useState(false);

  const toggleAgentCircle = () => {
    setShowAgentCircle((prev) => !prev);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="min-h-screen max-h-screen flex flex-row justify-center gap-10 w-full py-3 pe-2"
    >
      <AnimatePresence>
        <motion.div
          layout
          id="chat-section"
          className="flex flex-col justify-between"
          variants={chatSectionVariants}
          animate={showAgentCircle ? "shifted" : "initial"}
          exit="exit"
        >
          <ChatSection onClickDetails={toggleAgentCircle} />

          <div className="flex flex-col w-full max-w-lg mx-auto items-end">
            <ChatTextarea
              placeholder="Type your instructions here..."
              value={""}
              onChange={() => {}}
              onSend={() => {}}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showAgentCircle && (
          <motion.div
            id="output-section"
            className="bg-white rounded-xl p-3"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div>
              <AgentCircle
                onClickDetails={() => {
                  navigate("/agent-view");
                }}
                onClickEntity={() => {
                  // navigate("/agent-view");
                }}
                size={575}
              />
            </motion.div>

            <motion.div>
              <DeployCard onDeploy={() => navigate("/agent-view")} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
