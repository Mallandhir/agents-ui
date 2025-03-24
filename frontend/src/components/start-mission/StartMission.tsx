import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { containerVariants, itemVariants } from "./animations";
import CategorySuggestions from "./components/CategorySuggestions";
import ChatTextarea from "./components/ChatTextarea";
import Header from "./components/Header";
import TaskSuggestions from "./components/TaskSuggestions";
import { categories } from "./data";

export const StartMission: React.FC = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categories[0].id);

  const handleClickTask = (text: string) => {
    setTask(text);
  };

  const taskSuggestions = categories.find((category) => category.id === selectedCategory)?.tasks ?? [];

  const handleSend = (value: string) => {
    navigate("/planner");
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4"
    >
      <div className="w-full max-w-[600px] flex flex-col items-center gap-12 mx-auto">
        <motion.div variants={itemVariants}>
          <Header />
        </motion.div>

        <section id="chat-input-section" className="flex flex-col gap-7 w-full">
          <motion.div variants={itemVariants}>
            <ChatTextarea value={task} onChange={setTask} onSend={handleSend} placeholder="Enter your task here..." />
          </motion.div>

          <motion.div variants={itemVariants}>
            <CategorySuggestions
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TaskSuggestions tasks={taskSuggestions} onSelect={handleClickTask} />
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};
