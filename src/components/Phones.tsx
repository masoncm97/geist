"use client";

import Phone from "@/components/Phone";
import { useInterval } from "@/hooks/useInterval";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChatInstance } from "@/types/message";
import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { PhoneContext, PhoneState } from "@/providers/PhoneContextProvider";

export default function Phones() {
  let [chats, setChats] = useState<ChatInstance[]>([]);
  let [cursor, setCursor] = useState<number | undefined>(undefined);
  let [paginating, setPaginating] = useState<boolean>(false);
  let latestChat = useRef<ChatInstance>();
  let initial = useRef<boolean>(true);
  let initial2 = useRef<boolean>(true);
  const phoneStateRefs = useRef<Map<PhoneState, HTMLDivElement>>(new Map());
  const { responseLoading, promptLoading, resetResponseTiming } = useContext(
    ResponseTimingContext
  );

  const { phoneStates, primaryIdInView } = useContext(PhoneContext);

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
        let chats: ChatInstance[] = data.data.messages.slice(0, -1);
        setChats((prevState) => [...chats, ...prevState]);
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
    if (cursor) {
      getLatestChat();
    }
  }, 20000);

  // Paginate old chats
  useEffect(() => {
    const getInitialChats = async () => {
      if (cursor) {
        console.log(cursor);
        await getPreviousChats(cursor);
      }
    };
    getInitialChats();
  }, [cursor]);

  useEffect(() => {
    const paginate = async () => {
      console.log("cursor", cursor);
      console.log("prim", primaryIdInView);

      // if (initial2.current) {
      //   await delayFn(5000, () => {
      //     initial2.current = false;
      //     console.log("delayed");
      //   });
      // }
      if (
        !paginating &&
        cursor &&
        primaryIdInView &&
        primaryIdInView - cursor <= 5
      ) {
        setPaginating(true);
        console.log("paginating");
        setCursor(cursor - 10);
        await getPreviousChats(cursor - 10);
      }
      setPaginating(false);
    };

    paginate();

    window.addEventListener("scroll", paginate);

    return () => {
      window.removeEventListener("scroll", paginate);
    };
  }, [cursor, primaryIdInView]);

  useEffect(() => {
    async function scrollMessages() {
      console.log(phoneStates);
      console.log(paginating);
      if (!paginating) {
        for (let [_, value] of phoneStates.entries()) {
          // value?.scroller?.scrollIntoView({
          //   behavior: "smooth",
          //   block: "end",
          // });
          // await delay(2000);
        }
      }
    }
    scrollMessages();
  }, [chats, responseLoading, promptLoading]);

  return (
    <>
      <Phone name="Sartre" color="green" chats={chats} isPrompter={false} />
      <Phone name="Hegel" color="pink" chats={chats} isPrompter={true} />
    </>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const delayFn = (ms: number, fn: () => void) =>
  new Promise(() => setTimeout(fn, ms));
