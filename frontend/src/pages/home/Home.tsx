import { Button } from "@/components/home/ui/button";
import { Card, CardContent } from "@/components/home/ui/card";
import { useState } from "react";
import ChatTextarea from "./components/ChatTextarea";
import { categories } from "./data";

export const Home: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categories[0].id);

  const handleTaskClick = (text: string) => {
    setPrompt(text);
  };

  const taskSuggestions = categories.find((category) => category.id === selectedCategory)?.tasks ?? [];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-[600px] flex flex-col items-center gap-12 mx-auto">
        <header className="w-full text-center space-y-6">
          <h1 className="text-black text-3xl sm:text-[32px] font-ppNeue-regular tracking-[-0.31px] leading-[1.2]">
            Welcome!
          </h1>
          <div className="space-y-1">
            <p className="text-[#8b8b8b] text-lg sm:text-[22px] font-ppNeue-regular tracking-[-0.15px] leading-[1.2]">
              Let&apos;s Supercharge Your Productivity with
            </p>
            <p className="text-black text-lg sm:text-[22px] font-ppNeue-regular tracking-[-0.15px] leading-[1.2]">
              AI &amp; Human Agents!
            </p>
          </div>
        </header>

        <section className="w-full flex flex-col gap-7">
          <div className="w-full">
            <ChatTextarea value={prompt} onChange={setPrompt} />
          </div>

          <div className="flex flex-wrap items-start justify-center gap-2 w-full">
            {categories.map((category) => {
              const isActive = category.id === selectedCategory;
              return (
                <>
                  <Button
                    key={category.id}
                    variant="outline"
                    className={`px-3 py-1 h-auto rounded-lg shadow-[inset_0px_4px_8.9px_#ffffff40] ${
                      isActive
                        ? "[background:linear-gradient(0deg,rgba(218,203,225,0.13)_0%,rgba(218,203,225,0.13)_100%),linear-gradient(173deg,rgba(187,144,242,1)_0%,rgba(227,146,227,1)_100%)] border-none"
                        : "[background:linear-gradient(0deg,rgba(218,203,225,0.13)_0%,rgba(218,203,225,0.13)_100%)] border-[#00000008]"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span
                      className={`font-ppNeue-medium text-[10px] leading-[14px] whitespace-nowrap text-[#353535]  ${
                        isActive ? "text-white" : "text-[#353535]"
                      }`}
                    >
                      {category.name}
                    </span>
                  </Button>
                </>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
            {taskSuggestions.map((task) => (
              <Card
                key={task.id}
                className="flex flex-col items-start gap-2 p-3 border-[#eaeaea] rounded-lg hover:border-[#c072ca] transition-colors duration-200 cursor-pointer"
                onClick={() => handleTaskClick(task.text)}
              >
                <CardContent className="p-0 w-full">
                  <p className={`font-ppNeue-mono text-xs leading-[14.4px] text-[#9c9c9c]`}>{task.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
