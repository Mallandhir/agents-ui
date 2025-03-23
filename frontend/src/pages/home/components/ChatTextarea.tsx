import { ArrowUp } from "lucide-react";

import { AudioLines } from "lucide-react";
import { CardContent } from "../../../components/home/ui/card";

import { Card } from "../../../components/home/ui/card";

interface ChatTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

const ChatTextarea: React.FC<ChatTextareaProps> = ({ value, onChange }) => {
  return (
    <>
      <Card className="w-full bg-[#00000008] rounded-xl border-[1px] border-[#00000008]">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="font-ppNeue-book text-[#292929] text-sm leading-[19.6px] bg-transparent resize-none outline-none w-full min-h-[48px]"
              rows={2}
              placeholder="Enter your task here..."
            />
            <div className="flex items-center justify-end">
              <div className="flex gap-2">
                <button className="flex w-6 h-6 min-w-[24px] min-h-[24px] items-center justify-center p-1.5 rounded-full overflow-hidden shadow-[inset_0px_4px_8.9px_#ffffff40] [background:linear-gradient(175deg,rgba(187,144,242,1)_0%,rgba(227,146,227,1)_100%)] hover:opacity-90 hover:scale-105 transition-all duration-200 cursor-pointer">
                  <AudioLines className="w-3 h-3 text-white" />
                </button>
                <button className="flex w-6 h-6 min-w-[24px] min-h-[24px] items-center justify-center p-1.5 rounded-full overflow-hidden shadow-[inset_0px_4px_8.9px_#ffffff40] [background:linear-gradient(175deg,rgba(187,144,242,1)_0%,rgba(227,146,227,1)_100%)] hover:opacity-90 hover:scale-105 transition-all duration-200 cursor-pointer">
                  <ArrowUp className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ChatTextarea;
