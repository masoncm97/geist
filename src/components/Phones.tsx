"use client";

import Phone, { PhoneProps } from "@/components/Phone";
import { useInterval } from "@/hooks/useInterval";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { ChatInstance } from "@/types/message";
import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import useAccessPhoneStore from "@/hooks/usePhoneStore";
import { PhoneState } from "@/store/store";

export default function Phones() {
  let latestChat = useRef<ChatInstance>();
  const fetchedInitChat = useRef<boolean>();

  const { responseLoading, promptLoading, resetResponseTiming } = useContext(
    ResponseTimingContext
  );
  let phones: PhoneProps[] = [
    { name: "Sartre", color: "green", isPrompter: false },
    { name: "Hegel", color: "pink", isPrompter: true },
  ];

  const { phoneStates, getPhoneStateValues, updatePhoneState } =
    useAccessPhoneStore();

  let shouldPaginate = getPhoneStateValues("shouldPaginate");

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
        updatePhoneState(
          key,
          "chats",
          [latestChat.current] as ChatInstance[],
          "prepend"
        );
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
        let chats: ChatInstance[] = data.data.messages.reverse();
        console.log("fuck", chats);
        if (name) {
          updatePhoneState(name, "chats", chats, "append");
          return;
        }

        phoneStates.forEach(async (_, key: string) => {
          updatePhoneState(key, "chats", chats, "append");
        });
      });
  };

  useEffect(() => {
    const paginate = async () => {
      if (fetchedInitChat.current) {
        phoneStates.forEach(async (value: PhoneState, key: string) => {
          if (value.cursor && value.shouldPaginate) {
            console.log("paginating");
            let cursor;
            if (value.cursor === latestChat.current.id) {
              console.log("yes", latestChat.current.id);
              cursor = value.cursor - 1;
            } else {
              cursor = value.cursor - 10;
            }
            updatePhoneState(key, "shouldPaginate", false);
            updatePhoneState(key, "cursor", cursor);
            await getPreviousChats(cursor, key);
          }
        });
      }
    };
    paginate();
  }, [shouldPaginate]);

  useEffect(() => {
    const instantiateChat = async () => {
      if (!fetchedInitChat?.current) {
        let initCursor = await getLatestChat();
        phoneStates.forEach(async (_, key: string) => {
          if (typeof initCursor === "number") {
            updatePhoneState(key, "cursor", initCursor);
          }
        });
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
