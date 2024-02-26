"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Message, { MessageInstance } from "@/components/Message";
import axios from "axios";
import Image from "next/image";
import SuggestionMessage from "@/components/SuggestionMessage";
import { motion } from "framer-motion";

export default function Home() {
  const initMessage =
    "Greetings, my name is Geist. I am an expert on Hegel\u2019s \u2018Phenomenology of the Spirit\u2019. I\u2019m sure you have questions. Please, ask away";
  const suggestionMessages = [
    "What does the term the \u2019unconditioned universal\u2019 mean to Hegel?",
    "Explain Hegel\u2019s conception of dialectic movement.",
  ];
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<MessageInstance[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const scrollToRef = useRef<HTMLDivElement>(null);
  const messagesContainer = useRef<HTMLDivElement>(null);
  const [updated, setUpdated] = useState(false);

  const date = new Date();

  const handleUpdate = () => {
    setShouldScroll(true);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    message?: string
  ) => {
    let prompt = message ? message : input;
    e.preventDefault();
    setMessages((prevState) => [
      ...prevState,
      {
        outbound: true,
        message: prompt,
        loading: false,
        skipUpdate: true,
      },
      { outbound: false, loading: true },
    ]);
    setInput("");
    setLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_GEIST_SERVER}/chat`, {
        prompt: prompt,
      })
      .then((data) => {
        setShouldScroll(true);
        setMessages((prevState) => [
          ...prevState.slice(0, -1),
          {
            outbound: false,
            loading: false,
            message: removeLenticularBrackets(data.data.response),
          },
        ]);
      });
    setLoading(false);
    setInput("");
  };

  useEffect(() => {
    if (!updated) {
      setMessages([{ outbound: false, loading: true, skipUpdate: true }]);
    }
    let intervalId: NodeJS.Timeout;
    intervalId = setInterval(() => {
      setUpdated(true);
      setMessages([
        {
          outbound: false,
          loading: false,
          message: initMessage,
        },
      ]);
    }, 3000);

    if (updated) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [updated]);

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
    <main className="flex h-screen flex-col items-center justify-between p-24">
      <section className="relative border rounded-xl">
        <div className="backdrop-blur-md bg-opacity-5 bg-black h-32 rounded-t-xl grid gap-2 py-2 absolute w-full z-10">
          <div className="relative h-16 w-16 place-self-center">
            <h2 className="text-white text-3xl absolute z-10 center-absolute">
              G
            </h2>
            <Image
              className="absolute center-absolute"
              src="/circle-gradient.png"
              alt="profile"
              width={70}
              height={70}
            />
          </div>
          <h2 className="text-lg text-center text-gray-400">Geist</h2>
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
              {messages?.map((message, index) => (
                <Message
                  className={index == messages.length - 1 ? "mb-24" : "mb-2"}
                  key={index}
                  loading={message.loading}
                  outbound={message.outbound}
                  message={message.message}
                  handleUpdate={handleUpdate}
                  skipUpdate={message.skipUpdate}
                />
              ))}
              <div ref={scrollToRef} />
            </div>
          </div>
        </div>
        {updated && messages.length < 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute w-full bottom-24 p-4 grid grid-rows-[min-content,1fr]"
          >
            <p className="text-royalBlue text-sm mb-2">Suggestions:</p>
            {suggestionMessages.map((message, index) => (
              <SuggestionMessage
                key={index}
                message={message}
                setInput={setInput}
                handleSubmit={handleSubmit}
              />
            ))}
          </motion.div>
        )}
        <form
          className="backdrop-blur-md bg-opacity-5 bg-black grid grid-cols-[1fr,min-content] border-[1.5px] rounded-2xl absolute h-20 bottom-0 w-[95%] m-2 z-10"
          onSubmit={handleSubmit}
        >
          <textarea
            value={input}
            disabled={!updated}
            className={
              "bg-black bg-opacity-5 rounded-xl grid m-2 resize-none text-gray-400 p-2 no-scrollbar"
            }
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <button className={"flex w-10"} type="submit">
            <Image
              className="m-auto"
              src="/submit-button.png"
              alt="profile"
              width={30}
              height={30}
            />
          </button>
        </form>
      </section>
    </main>
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

const removeLenticularBrackets = (input: string): string => {
  const regex = /【.*?†.*?】/g;
  return input.replace(regex, "");
};
