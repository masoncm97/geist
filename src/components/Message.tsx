import classNames from "classnames";
import { ThemeType } from "@/providers/ThemeProvider";
import { MessageProps } from "@/types/message";

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
            : "bg-opacity-5 bg-black text-gray-400",
          "rounded-3xl py-3 px-3",
          className
        )}
      >
        {message}
      </div>
      <div
        className={classNames(
          interlocutor?.color == "green" ? "bg-green-200" : "bg-pink-200",
          isPrompt ? "justify-self-end" : "justify-self-start",
          "flex relative h-6 w-6 rounded-full mb-2"
        )}
      >
        <h2 className={"text-white text-sm absolute z-10 center-absolute"}>
          {interlocutor?.name.slice(0, 1)}
        </h2>
      </div>
    </>
  );
}
