import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { ChatProps } from "@/types/message";
import classNames from "classnames";
import { useContext } from "react";
import { Message } from "./Message";
import MessageLoad from "./MessageLoad";

export function Chat({
  className,
  id,
  isPrompter,
  prompt,
  response,
  setChatRef,
}: ChatProps) {
  const { chatId, responseLoading, promptLoading } = useContext(
    ResponseTimingContext
  );
  const latestChat = chatId === id;

  return (
    <div className={classNames(className, "mx-1 grid")}>
      {/* Loading Bubbles between chat instances */}
      {latestChat && promptLoading && (
        <MessageLoad
          className={classNames(
            isPrompter ? "place-self-end" : "place-self-start"
          )}
        />
      )}
      {/* Chat Prompt instance */}
      {(!latestChat || !promptLoading) && (
        <Message
          className={classNames(
            isPrompter ? "place-self-end" : "place-self-start",
            "max-w-[85%] mb-2"
          )}
          outbound={isPrompter}
          message={prompt}
          setChatRef={setChatRef}
          id={id}
        />
      )}
      {/* Loading Bubbles between prompt and response */}
      {latestChat && !promptLoading && responseLoading && (
        <MessageLoad
          className={classNames(
            isPrompter ? "place-self-start" : "place-self-end"
          )}
        />
      )}
      {/* Chat Response instance */}
      {(!latestChat || !responseLoading) && (
        <Message
          className={classNames(
            isPrompter ? "place-self-start" : "place-self-end",
            "max-w-[85%]"
          )}
          outbound={!isPrompter}
          message={response}
          setChatRef={setChatRef}
          id={id && id + 0.5}
        />
      )}
      {/* Loading Bubbles between chat instances */}
      {latestChat && !responseLoading && !promptLoading && (
        <MessageLoad
          className={classNames(
            isPrompter ? "place-self-end" : "place-self-start"
          )}
        />
      )}
    </div>
  );
}
