import { useContext, useEffect, useRef } from "react";
import useAccessPhoneStore from "./usePhoneStore";
import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { useInterval } from "./useInterval";
import { ChatInstance } from "@/types/message";
import { PhoneState } from "@/store/store";
import axios from "axios";

export function useGetLatestChat() {
  let latestChat = useRef<ChatInstance>();
  const fetchedInitChat = useRef<boolean>();

  const { resetResponseTiming } = useContext(ResponseTimingContext);

  const { phoneState, updatePhoneState } = useAccessPhoneStore();

  const getLatestChat = async (): Promise<number | undefined> => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_GEIST_SERVER}/latest-chat`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        }
      })
      .then((data) => {
        console.log(data);
        latestChat.current = data.data;
      });

    /* If the server returns a new chat that hasn't been displayed yet,
        add it to the current chats */
    if (
      latestChat.current != undefined &&
      !phoneState.chats?.find((chat) => chat.id === latestChat.current?.id)
    ) {
      updatePhoneState(
        "chats",
        [latestChat.current] as ChatInstance[],
        "prepend"
      );
      updatePhoneState("head", latestChat.current.id);
      resetResponseTiming(latestChat.current.id);
    }

    return latestChat.current?.id;
  };

  useEffect(() => {
    const instantiateChat = async () => {
      if (!fetchedInitChat?.current) {
        let initCursor = await getLatestChat();
        if (typeof initCursor === "number") {
          updatePhoneState("cursor", initCursor);
        }
        fetchedInitChat.current = true;
      }
    };
    instantiateChat();
  }, []);

  //   If cursor has already been instantiated poll every 20 seconds for new chat
  useInterval(async () => {
    if (fetchedInitChat.current) {
      console.log("polling for latest chat");
      getLatestChat();
    }
  }, 20000);
}
