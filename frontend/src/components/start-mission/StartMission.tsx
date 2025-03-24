import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-[600px] flex flex-col items-center gap-12 mx-auto">
        <Header />

        <section id="chat-input-section" className="flex flex-col gap-7">
          <ChatTextarea value={task} onChange={setTask} onSend={handleSend} placeholder="Enter your task here..." />

          <CategorySuggestions
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <TaskSuggestions tasks={taskSuggestions} onSelect={handleClickTask} />
        </section>
      </div>
    </div>
  );
};
