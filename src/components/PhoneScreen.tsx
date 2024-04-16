"use client";

import {
  FormEvent,
  MutableRefObject,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Message } from "@/components/Message";
import axios from "axios";
import { ThemeContext, ThemeType } from "@/providers/ThemeProvider";
import classNames from "classnames";
import { ChatInstance, MessageInstance } from "@/types/message";
import { Chat } from "./Chat";

export interface PhoneScreenProps {
  name: string;
  color: "green" | "pink";
  chats: ChatInstance[];
  isPrompter: boolean;
  setChatRef: (node: HTMLDivElement | null, id: string) => void;
}
export default function PhoneScreen({
  name,
  color,
  chats,
  isPrompter,
  setChatRef,
}: PhoneScreenProps) {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<MessageInstance[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const scrollToRef = useRef<HTMLDivElement>(null);
  const messagesContainer = useRef<HTMLDivElement>(null);
  const [updated, setUpdated] = useState(false);
  const date = new Date();
  const theme = useContext(ThemeContext);
  const currentTheme = theme?.themeType;
  const messageRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // const handleUpdate = () => {
  //   setShouldScroll(true);
  // };

  // async function scrollMessages() {
  //   for (const ref of messageRefs.current) {
  //     ref[1].scrollIntoView({
  //       behavior: "smooth",
  //       block: "end",
  //     });
  //     await delay(2000); // Wait for 2 seconds before the next iteration
  //   }
  // }

  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setShouldScroll(false);
    }
  }, [messages, loading, shouldScroll]);

  return (
    <section
      className={classNames(
        currentTheme == ThemeType.Dark ? "border border-gray-500" : "border",
        "relative border rounded-xl"
      )}
    >
      <div
        className={classNames(
          currentTheme == ThemeType.Dark
            ? "bg-opacity-15 bg-white"
            : "bg-opacity-5 bg-black",
          "backdrop-blur-md h-32 rounded-t-xl grid gap-2 py-2 absolute w-full z-10"
        )}
      >
        <div
          className={classNames(
            color == "green" ? "bg-green-200" : "bg-pink-200",
            "relative h-16 w-16 place-self-center rounded-full"
          )}
        >
          <h2 className={"text-white text-3xl absolute z-10 center-absolute"}>
            {name.slice(0, 1)}
          </h2>
        </div>
        <h2 className="text-lg text-center text-gray-400">{name}</h2>
      </div>
      <div className="border-t-0 w-80 h-[70vh] rounded-b-xl p-2 justify-between relative bg-none">
        <div className="absolute flex-col bottom-2 w-[95%]">
          <div
            ref={messagesContainer}
            className="flex flex-col overflow-y-auto no-scrollbar self-start h-[60vh] relative mb-2"
          >
            {messages.length != 0 && (
              <p className="text-gray-400 text-sm text-center mt-245 md:mt-16 mb-2">
                Today {formatDate(date)}
              </p>
            )}
            {chats?.map((chat, index) => (
              <Chat
                key={index}
                promptLoading={false}
                responseLoading={false}
                prompt={chat.prompt}
                response={chat.response}
                isPrompter={isPrompter}
                id={chat.id}
              />
            ))}
            <div ref={(node) => setChatRef(node, name.toString())} />
          </div>
        </div>
      </div>
    </section>
  );
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}