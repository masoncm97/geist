import { useContext, useRef } from "react";
import useAccessPhoneStore from "./usePhoneStore";
import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { useInterval } from "./useInterval";
import { ChatInstance } from "@/types/message";
import axios from "axios";

export function useGetLatestChat() {
  let latestChat = useRef<ChatInstance>();
  const { resetResponseTiming } = useContext(ResponseTimingContext);
  const { phoneState, updatePhoneState } = useAccessPhoneStore();

  const pollForNewChat = async (): Promise<void> => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_GEIST_SERVER}/latest-chat`, 
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
          }
        }
      );

      latestChat.current = response.data;

      // Only add if this is a genuinely new chat that we don't have yet
      if (
        latestChat.current?.id &&
        phoneState.head &&
        latestChat.current.id > phoneState.head &&
        !phoneState.chats?.find((chat) => chat.id === latestChat.current?.id)
      ) {
        console.log("New chat detected, adding to state");
        updatePhoneState(
          "chats",
          [latestChat.current] as ChatInstance[],
          "prepend"
        );
        updatePhoneState("head", latestChat.current.id);
        
        // Only trigger response timing for new chats (not initial load)
        resetResponseTiming(latestChat.current.id);
      }
    } catch (error) {
      console.error("Failed to poll for new chat:", error);
    }
  };

  // Poll every 20 seconds for new chats (only after initial load is complete)
  useInterval(async () => {
    if (phoneState.chats && phoneState.chats.length > 0) {
      console.log("polling for latest chat");
      await pollForNewChat();
    }
  }, 20000);
}
