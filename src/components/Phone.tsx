"use client";

import { useContext, useEffect, useRef } from "react";
import { ThemeContext, ThemeType } from "@/providers/ThemeProvider";
import classNames from "classnames";
import { ChatInstance } from "@/types/message";
import { Chat } from "./Chat";
import useAccessPhoneStore from "@/hooks/usePhoneStore";
import { useInView } from "framer-motion";
import Navbar from "./Navbar";

export interface PhoneProps {
  name: string;
  color: "green" | "pink";
  chats?: ChatInstance[];
  isPrompter: boolean;
  className?: string;
}

export default function Phone({
  name,
  color,
  isPrompter,
  className,
}: PhoneProps) {
  const messagesContainer = useRef<HTMLDivElement>(null);
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
        currentTheme == ThemeType.Dark
          ? "border border-gray-500 bg-black"
          : "border bg-white",
        "center-horizontal absolute md:relative border rounded-xl",
        className
      )}
    >
      <div
        className={classNames(
          currentTheme == ThemeType.Dark
            ? "bg-opacity-15 bg-white"
            : "bg-opacity-5 bg-black",
          "backdrop-blur-md py-5 md:h-32 rounded-t-xl grid gap-2 absolute w-full z-10 max-md:grid-cols-2 grid-rows-[1fr,min-content] grid-cols-none"
        )}
      >
        <div
          className={classNames(
            "bg-yellow-300 backdrop-blur-md flex relative h-16 w-16 place-self-center rounded-full justify-self-start md:justify-self-center self-center max-md:ml-5"
          )}
        >
          <h2
            className={
              "hidden md:block text-white text-3xl absolute z-10 center-absolute"
            }
          >
            {name.slice(0, 1)}
          </h2>
          <h2 className="backdrop-blur-md block md:hidden text-white text-lg absolute z-10 center-absolute">
            {name}
          </h2>
        </div>
        <h2 className="hidden md:block text-lg text-center text-gray-400 -translate-y-2">
          {name}
        </h2>
        <Navbar />
      </div>
      <div className="border-t-0 w-80 h-[70vh] rounded-b-xl p-2 justify-between relative bg-none overflow-y-auto no-scrollbar">
        <div className="absolute flex-col top-2 w-[95%]">
          {(!phoneStates.get(name)?.chats ||
            phoneStates.get(name)?.chats?.length === 0) && (
            <div className="absolute loader border-gray-500 mt-52 left-[40%]" />
          )}
          <div
            ref={messagesContainer}
            className="flex flex-col-reverse overflow-y-auto no-scrollbar self-start h-[9999vh] relative mb-2"
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
              className="text-gray-400 text-sm text-center mt-32 mb-2 h-2 w-full"
            ></p>
          </div>
        </div>
      </div>
    </section>
  );
}
