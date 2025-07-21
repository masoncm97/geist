import classNames from "classnames";
import { ThemeType } from "@/providers/ThemeProvider";
import { MessageProps } from "@/types/message";
import ReactMarkdown from "react-markdown";

export function Message({
  className,
  isPrompt,
  message,
  currentTheme,
  interlocutor,
}: MessageProps) {
  console.log(interlocutor);
  return (
    <>
      <p
        className={classNames(
          "text-xs text-end mr-1 mt-1 text-gray-400 mb-2",
          isPrompt ? "justify-self-end" : "justify-self-start"
        )}
      >
        {interlocutor.name}
      </p>
      <div
        className={classNames(
          isPrompt
            ? "bg-royalBlue text-white"
            : currentTheme == ThemeType.Dark
            ? "bg-opacity-15 bg-white text-gray-400"
            : "bg-opacity-20 bg-white text-gray-300",
          "rounded-3xl py-3 px-3",
          className
        )}
      >
        {message ? (
          <ReactMarkdown
            components={{
              strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
              em: ({node, ...props}) => <em className="italic" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 my-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-2" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
              p: ({node, ...props}) => <p className="mb-2" {...props} />,
              br: () => <br />,
            }}
          >
            {message}
          </ReactMarkdown>
        ) : null}
      </div>
      <div
        className={classNames(
          interlocutor?.color == "green" ? "bg-green-200" : "bg-pink-200",
          isPrompt ? "justify-self-end" : "justify-self-start",
          "flex relative h-6 w-6 rounded-full mb-2"
        )}
      >
        <h2 className={"text-white text-sm absolute z-5 center-absolute"}>
          {interlocutor?.name.slice(0, 1)}
        </h2>
      </div>
    </>
  );
}
