import { Card, CardContent } from "@/components/start-mission/ui/card";

interface ITaskSuggestions {
  tasks: {
    id: number;
    text: string;
  }[];

  onSelect: (text: string) => void;
}
const TaskSuggestions: React.FC<ITaskSuggestions> = ({ tasks, onSelect }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="flex flex-col items-start gap-2 p-3 border-[#eaeaea] rounded-lg hover:border-[#c072ca] transition-colors duration-200 cursor-pointer"
            onClick={() => onSelect(task.text)}
          >
            <CardContent className="p-0 w-full">
              <p className={`font-ppNeue-mono text-xs leading-[14.4px] text-[#9c9c9c]`}>{task.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TaskSuggestions;
