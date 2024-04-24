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
// import { PhoneContext } from "@/providers/PhoneContextProvider";
import useAccessPhoneStore from "@/hooks/usePhoneStore";
import { useInView } from "framer-motion";

export interface PhoneProps {
  name: string;
  color: "green" | "pink";
  chats?: ChatInstance[];
  isPrompter: boolean;
}

export default function Phone({ name, color, chats, isPrompter }: PhoneProps) {
  const messagesContainer = useRef<HTMLDivElement>(null);
  const date = new Date();
  const theme = useContext(ThemeContext);
  const currentTheme = theme?.themeType;
  const scroller = useRef<HTMLDivElement>(null);
  const paginator = useRef<HTMLDivElement>(null);
  const isInView = useInView(paginator);

  const { phoneStates, updatePhoneState } = useAccessPhoneStore();

  useEffect(() => {
    updatePhoneState(
      name,
      "scroller",
      scroller.current ? scroller.current : undefined
    );
  }, [scroller]);

  useEffect(() => {
    updatePhoneState(name, "shouldPaginate", isInView);
  }, [isInView]);

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
      <div className="border-t-0 w-80 h-[70vh] rounded-b-xl p-2 justify-between relative bg-none overflow-y-auto">
        <div className="absolute flex-col top-2 w-[95%] border border-blue-500">
          <div
            ref={messagesContainer}
            className="flex flex-col-reverse overflow-y-auto no-scrollbar self-start h-[300vh] relative mb-2 border border-red-500"
          >
            <div ref={scroller} />
            {phoneStates.get(name)?.chats?.map((chat, index) => (
              <Chat
                name={name}
                key={index}
                promptLoading={false}
                responseLoading={false}
                prompt={chat.prompt}
                response={chat.response}
                isPrompter={isPrompter}
                id={chat.id}
              />
            ))}
            <p
              ref={paginator}
              className="text-gray-400 text-sm text-center mt-24 md:mt-20 mb-2 border border-green-500 h-2 w-full"
            >
              {/* Today {formatDate(date)} */}
            </p>
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
