import { ChatInstance } from "@/types/message";
import { useEffect } from "react";
import useAccessPhoneStore from "./usePhoneStore";
import {
  getAllConversations,
  getOldestLoadedIndex,
  setOldestLoadedIndex,
} from "./useInitialChatLoad";

const PAGE_SIZE = 10;

export function usePaginate() {
  const { phoneState, getPhoneStateValue, updatePhoneState } =
    useAccessPhoneStore();

  let shouldPaginate = getPhoneStateValue("shouldPaginate");

  useEffect(() => {
    if (
      !phoneState.shouldPaginate ||
      !phoneState.chats ||
      phoneState.chats.length === 0
    ) {
      return;
    }

    updatePhoneState("shouldPaginate", false);

    const all = getAllConversations();
    const currentOldest = getOldestLoadedIndex();

    if (currentOldest <= 0) return; // no older messages

    const newStart = Math.max(0, currentOldest - PAGE_SIZE);
    const olderChats = all.slice(newStart, currentOldest);
    setOldestLoadedIndex(newStart);

    // Older chats need to be reversed (newest first) then appended to the end
    updatePhoneState("chats", [...olderChats].reverse() as ChatInstance[], "append");
    updatePhoneState("cursor", newStart);
  }, [shouldPaginate]);
}
