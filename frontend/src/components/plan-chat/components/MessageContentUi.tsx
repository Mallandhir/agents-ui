import { IAIChatMessage } from "@/types/ai/chat.types";
import { convertSnakeCaseToTitleCase } from "@/utils/textUtils";
import { observer } from "mobx-react-lite";
import Markdown from "react-markdown";
import { Fragment } from "react/jsx-runtime";

const safeParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
};

const MessageContentUi: React.FC<{ message: IAIChatMessage }> = ({ message }) => {
  let screenshot = "";
  if (message?.type === "tool_result") {
    const block = message.content?.[0];
    if (block?.type === "text") {
      const parsedMessage = safeParse(block.text);
      if (parsedMessage) {
        screenshot = parsedMessage.result?.data?.data?.screenshot;
      }
    }
  }
  return (
    <>
      {message?.content?.map((block, i) => {
        return (
          <Fragment key={block.type + i}>
            {block.type === "text" && (
              <>
                {message?.type === "tool_result" ? (
                  <div>
                    <h5 className="fw-bold">{convertSnakeCaseToTitleCase(message.type)}</h5>
                    <pre>{JSON.stringify(safeParse(block.text), null, 2)}</pre>
                    {screenshot && <img src={screenshot} alt="Firecrawl-web-scrape-screenshot" />}
                  </div>
                ) : (
                  <Markdown>{block.text}</Markdown>
                )}
              </>
            )}

            {block.type === "tool_use" && (
              <div>
                <h5 className="fw-bold">{convertSnakeCaseToTitleCase(block.type)}</h5>
                <h6 className="text-success fw-bold">{convertSnakeCaseToTitleCase(block.name)}</h6>
                <pre>{JSON.stringify(block.input, null, 2)}</pre>
              </div>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default observer(MessageContentUi);
