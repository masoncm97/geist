"use client";

import PhoneScreen from "@/components/PhoneScreen";
import { useInterval } from "@/hooks/useInterval";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChatInstance } from "@/types/message";
import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";

export default function Phones() {
  let [chats, setChats] = useState<ChatInstance[]>([]);
  let [cursor, setCursor] = useState<number | undefined>(undefined);
  let latestChat = useRef<ChatInstance>();
  let initial = useRef<boolean>(true);
  const chatWindowRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const { responseLoading, promptLoading, resetResponseTiming } = useContext(
    ResponseTimingContext
  );

  const getLatestChat = async (): Promise<number | undefined> => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_GEIST_SERVER}/latest-chat`)
      .then((data) => {
        latestChat.current = data.data;
      });

    /* If the server returns a new chat that hasn't been displayed yet, 
      add it to the current chats */
    if (
      latestChat.current != undefined &&
      !chats.find((chat) => chat.id === latestChat.current!.id)
    ) {
      setChats((prevState) => [
        ...prevState,
        latestChat.current as ChatInstance,
      ]);
      resetResponseTiming(latestChat.current.id);
    }

    return latestChat.current?.id;
  };

  const getPreviousChats = async (cursor: number) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_GEIST_SERVER}/paginate-chat`, {
        cursor: cursor,
      })
      .then((data) => {
        console.log(data);
      });
  };

  // Get Latest Chat on Start
  useEffect(() => {
    const instantiateChat = async () => {
      if (initial.current) {
        initial.current = false;
        let cursor = await getLatestChat();
        if (cursor) setCursor(cursor);
      }
    };
    instantiateChat();
  }, []);

  // If cursor has already been instantiated poll every 20 seconds for new chat
  useInterval(async () => {
    if (cursor) getLatestChat();
  }, 20000);

  // Paginate old chats
  useEffect(() => {
    if (cursor) {
      getPreviousChats(cursor);
    }
  }, [cursor]);

  const setChatRef = useCallback((node: HTMLDivElement | null, id: string) => {
    if (node !== null) {
      chatWindowRefs.current.set(id, node);
    }
  }, []);

  useEffect(() => {
    async function scrollMessages() {
      for (const [_, ref] of chatWindowRefs.current) {
        ref.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
        await delay(2000);
      }
    }
    scrollMessages();
  }, [chats, responseLoading, promptLoading]);

  return (
    <>
      <PhoneScreen
        name="Sartre"
        color="green"
        chats={chats}
        isPrompter={false}
        setChatRef={setChatRef}
      />
      <PhoneScreen
        name="Hegel"
        color="pink"
        chats={chats}
        isPrompter={true}
        setChatRef={setChatRef}
      />
    </>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
