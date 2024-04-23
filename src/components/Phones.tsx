"use client";

import Phone, { PhoneProps } from "@/components/Phone";
import { useInterval } from "@/hooks/useInterval";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChatInstance } from "@/types/message";
import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { PhoneContext, PhoneState } from "@/providers/PhoneContextProvider";
import useAccessPhoneStore from "@/hooks/usePhoneStore";
import { useInitialRender } from "@/hooks/useInitialRender";

export default function Phones() {
  let latestChat = useRef<ChatInstance>();
  let [cursorInitialized, setCursorInitialized] = useState<boolean>(false);
  let [shouldPaginate, setShouldPaginate] = useState<boolean>(false);
  const [fetchedInitChat, paginateInit] = useInitialRender(4);
  // const idsInView: number[] = [];
  const { responseLoading, promptLoading, resetResponseTiming } = useContext(
    ResponseTimingContext
  );
  let phones: PhoneProps[] = [
    { name: "Sartre", color: "green", isPrompter: false },
    { name: "Hegel", color: "pink", isPrompter: true },
  ];

  const {
    updateChats,
    phoneStates,
    updateCursor,
    updatePaginating,
    getIdsInView,
    getCursors,
  } = useAccessPhoneStore();

  let idsInView = getIdsInView();
  let cursors = getCursors();
  // let [cursors, setCursors] = useState<(number | undefined)[]>(
  //   new Array<number | undefined>(idsInView.length)
  // );

  const getLatestChat = async (): Promise<number | undefined> => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_GEIST_SERVER}/latest-chat`)
      .then((data) => {
        console.log(data);
        latestChat.current = data.data;
      });

    /* If the server returns a new chat that hasn't been displayed yet, 
      add it to the current chats */
    phoneStates.forEach(async (value: PhoneState, key: string) => {
      if (
        latestChat.current != undefined &&
        !value.chats?.find((chat) => chat.id === latestChat.current?.id)
      ) {
        updateChats(key, [latestChat.current] as ChatInstance[], "append");
        resetResponseTiming(latestChat.current.id);
      }
    });

    return latestChat.current?.id;
  };

  const getPreviousChats = async (cursor: number, name?: string) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_GEIST_SERVER}/paginate-chat`, {
        cursor: cursor,
      })
      .then((data) => {
        let chats: ChatInstance[] = data.data.messages.slice(0, -1);
        console.log("fuck", chats);
        if (name) {
          updateChats(name, chats, "prepend");
          return;
        }

        phoneStates.forEach(async (_, key: string) => {
          updateChats(key, chats, "prepend");
        });
      });
  };

  useEffect(() => {
    const paginate = async () => {
      if (cursorInitialized) {
        phoneStates.forEach(async (value: PhoneState, key: string) => {
          console.log(value.idInView);
          console.log(value.cursor);
          if (value.idInView && value.cursor) {
            console.log(value.cursor - value.idInView >= 7);
          }
          // console.log(value.idInView - value.cursor <= 5);
          if (
            value.idInView &&
            value.cursor &&
            value.cursor - value.idInView >= 7
          ) {
            console.log("fuckkkk");
            console.log(value.cursor - value.idInView >= 7);
            updateCursor(key, value.cursor - 10);
            await getPreviousChats(value.cursor - 10, key);
          }
        });
      }
    };
    paginate();
  }, [idsInView]);

  useEffect(() => {
    const instantiateChat = async () => {
      if (!fetchedInitChat?.current) {
        let initCursor = await getLatestChat();
        console.log("updating cursor");
        phoneStates.forEach(async (_, key: string) => {
          if (typeof initCursor === "number") {
            updateCursor(key, initCursor);
          }
        });
        setCursorInitialized(true);
        fetchedInitChat.current = true;
      }
    };
    instantiateChat();
  }, []);

  // If cursor has already been instantiated poll every 20 seconds for new chat
  useInterval(async () => {
    if (fetchedInitChat.current) {
      console.log("polling for latest chat");
      getLatestChat();
    }
  }, 20000);

  // Paginate initial chats
  useEffect(() => {
    const getInitialChats = async () => {
      phoneStates.forEach(async (value: PhoneState, key: string) => {
        if (value.cursor) {
          await getPreviousChats(value.cursor, key);
        }
      });
    };
    getInitialChats();
  }, [cursorInitialized]);

  useEffect(() => {
    const paginate = async () => {
      // if (!paginateInit.current) {
      //   await delayFn(5000, () => {
      //     paginateInit.current = true;
      //     console.log("delayed");
      //   });
      // }

      if (shouldPaginate) {
        console.log("checking pagination", phoneStates);
        phoneStates.forEach(async (value: PhoneState, key: string) => {
          if (!value.paginating && value.idInView && value.cursor) {
            console.log("paginating");
            // updatePaginating(key, true);
            updateCursor(key, value.cursor - 10);
            await getPreviousChats(value.cursor - 10, key);
          }
          // updatePaginating(key, false);
          // setShouldPaginate(false);
        });
      }
    };

    paginate();
  }, [shouldPaginate]);

  useEffect(() => {
    async function scrollMessages() {
      console.log("should scroll");
      for (let [_, value] of phoneStates.entries()) {
        value?.scroller?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
        await delay(2000);
      }
    }
    scrollMessages();
  }, [responseLoading, promptLoading]);

  return (
    <>
      {phones.map((prop) => (
        <Phone
          key={prop.name}
          name={prop.name}
          color={prop.color}
          isPrompter={prop.isPrompter}
        />
      ))}
    </>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const delayFn = (ms: number, fn: () => void) =>
  new Promise(() => setTimeout(fn, ms));
