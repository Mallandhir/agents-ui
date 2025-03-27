const AgentReport: React.FC = () => {
  return (
    <div>
      {/* {agentId && (
        <motion.div
          id="agent-view"
          className="rounded-xl bg-white w-full h-full flex flex-col justify-between min-w-1/2 max-w-[625px]"
        >
          <div className="flex flex-col w-full items-start gap-3 p-4">
            <Header
              title={HEADER_INFO.title}
              subtitle={HEADER_INFO.subtitle}
              progress={PROGRESS_VALUE}
              avatarUrl={novaimage}
            />
            <ReportsSnapshot
              title="Reports Snapshot"
              dateRange="1 Mar - Today"
              badges={[BADGES.ENTIRE_PERIOD, BADGES.DATE_RANGE]}
              summaryData={{
                text: SUMMARY_TEXT
              }}
              outputData={{
                label: "Recommended Industries",
                industries: RECOMMENDED_INDUSTRIES
              }}
              thinkingProcess={{
                steps: THINKING_STEPS
              }}
            />
          </div>
          <ChatInput placeholder="Chat with Nova" onSend={handleSendMessage} onVoice={handleVoiceInput} />
        </motion.div>
      )} */}
    </div>
  );
};

export default AgentReport;
