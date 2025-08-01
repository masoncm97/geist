import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { ChatProps } from "@/types/message";
import classNames from "classnames";
import { useContext, useEffect, useRef } from "react";
import { Message } from "./Message";
import MessageLoad from "./MessageLoad";
import { useInView } from "framer-motion";
import useAccessPhoneStore from "@/hooks/usePhoneStore";
import { Interlocutor } from "@/store/store";
import { ThemeContext } from "@/providers/ThemeProvider";

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

  const { updatePhoneState, phoneState } = useAccessPhoneStore();
  const theme = useContext(ThemeContext);

  const latestChat = chatId === id;
  

  useEffect(() => {
    if (isInView) {
      updatePhoneState("idInView", id);
    }
  }, [isInView, id, updatePhoneState]);


  const prompter: Interlocutor = { name: "Hegel", color: "pink" };
  const responder: Interlocutor = { name: "Sartre", color: "green" };

  return (
    <div ref={ref} className={classNames(className, "mx-1 grid")}>
      {/* Loading Bubbles before prompt - always show for latest chat or when prompt is loading */}
      {(latestChat && promptLoading) && (
        <MessageLoad
          className={classNames(
            isPrompter ? "place-self-end" : "place-self-start",
            "mb-2"
          )}
        />
      )}
      {/* Chat Prompt instance - always show unless it's the latest chat and prompt is still loading */}
      {(!latestChat || !promptLoading) && (
        <Message
          className={classNames(
            isPrompter ? "place-self-end" : "place-self-start",
            "max-w-[85%] mb-2"
          )}
          isPrompt={isPrompter}
          message={prompt}
          setChatRef={setChatRef}
          interlocutor={prompter}
          currentTheme={theme.themeType}
          id={id}
        />
      )}
      {/* Loading Bubbles between prompt and response - always show for latest chat or when response is loading */}
      {(latestChat && !promptLoading && responseLoading) && (
        <MessageLoad
          className={classNames(
            isPrompter ? "place-self-start" : "place-self-end",
            "mb-2"
          )}
        />
      )}
      {/* Chat Response instance - always show unless it's the latest chat and response is still loading */}
      {(!latestChat || !responseLoading) && (
        <Message
          className={classNames(
            isPrompter ? "place-self-start" : "place-self-end",
            "max-w-[85%] mb-2"
          )}
          isPrompt={!isPrompter}
          message={response}
          setChatRef={setChatRef}
          interlocutor={responder}
          currentTheme={theme.themeType}
          id={id && id + 0.5}
        />
      )}
      {/* Loading Bubbles after response - always show */}
      <MessageLoad
        className={classNames(
          isPrompter ? "place-self-end" : "place-self-start",
          "mb-2"
        )}
      />
    </div>
  );
}
