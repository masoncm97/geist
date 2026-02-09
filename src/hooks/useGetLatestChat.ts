import { useContext } from "react";
import useAccessPhoneStore from "./usePhoneStore";
import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { useInterval } from "./useInterval";
import { ChatInstance } from "@/types/message";
import {
  getAllConversations,
  getNextDripIndex,
  setNextDripIndex,
} from "./useInitialChatLoad";

export function useGetLatestChat() {
  const { resetResponseTiming } = useContext(ResponseTimingContext);
  const { phoneState, updatePhoneState } = useAccessPhoneStore();

  useInterval(() => {
    const all = getAllConversations();
    const idx = getNextDripIndex();

    if (idx >= all.length) return; // nothing left to drip
    if (!phoneState.chats || phoneState.chats.length === 0) return;

    const nextChat = all[idx] as ChatInstance;
    setNextDripIndex(idx + 1);

    updatePhoneState("chats", [nextChat] as ChatInstance[], "prepend");
    updatePhoneState("head", nextChat.id);
    resetResponseTiming(nextChat.id);
  }, 20000);
}
