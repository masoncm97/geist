import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { ChatProps } from "@/types/message";
import classNames from "classnames";
import { useContext, useEffect, useRef } from "react";
import { Message } from "./Message";
import MessageLoad from "./MessageLoad";
import { PhoneContext } from "@/providers/PhoneContextProvider";
import { useInView } from "framer-motion";
import useAccessPhoneStore from "@/hooks/usePhoneStore";

export function Chat({
  className,
  id,
  isPrompter,
  prompt,
  response,
  name,
  setChatRef,
}: ChatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const { chatId, responseLoading, promptLoading } = useContext(
    ResponseTimingContext
  );

  const { updateIdInView } = useAccessPhoneStore();

  const latestChat = chatId === id;

  useEffect(() => {
    if (isInView) {
      updateIdInView(name, id);
    }
  }, [isInView]);

  return (
    <div ref={ref} className={classNames(className, "mx-1 grid")}>
      {/* Loading Bubbles between chat instances */}
      {/* {latestChat && promptLoading && (
        <MessageLoad
          className={classNames(
            isPrompter ? "place-self-end" : "place-self-start"
          )}
        />
      )} */}
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
