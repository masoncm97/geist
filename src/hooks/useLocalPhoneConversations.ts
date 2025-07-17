import { useContext, useEffect, useRef, useState } from "react";
import useAccessPhoneStore from "./usePhoneStore";
import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { useInterval } from "./useInterval";
import { ChatInstance } from "@/types/message";
import { PhoneState } from "@/store/store";
import { useLocalConversations } from "./useLocalConversations";

export function useLocalPhoneConversations() {
  const { conversations, loading, getNextConversation, getConversationsBeforeId } = useLocalConversations();
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const conversationsRef = useRef<ChatInstance[]>([]);
  const fetchedInitChat = useRef<boolean>();

  const { resetResponseTiming } = useContext(ResponseTimingContext);
  const { phoneStates, updatePhoneState } = useAccessPhoneStore();

  // Convert Message[] to ChatInstance[]
  useEffect(() => {
    if (conversations.length > 0) {
      conversationsRef.current = conversations.map(conv => ({
        id: conv.id,
        prompt: conv.prompt,
        response: conv.response,
      }));
    }
  }, [conversations]);

  const getNextChat = (): ChatInstance | null => {
    if (conversationsRef.current.length === 0) return null;
    
    const conversation = conversationsRef.current[currentConversationIndex];
    setCurrentConversationIndex((prev) => (prev + 1) % conversationsRef.current.length);
    return conversation;
  };

  const getLatestChat = async (): Promise<number | undefined> => {
    const nextChat = getNextChat();
    if (!nextChat) return undefined;

    // Add the new chat to all phones
    phoneStates.forEach(async (value: PhoneState, key: string) => {
      if (!value.chats?.find((chat) => chat.id === nextChat.id)) {
        updatePhoneState(
          key,
          "chats",
          [nextChat] as ChatInstance[],
          "prepend"
        );
        updatePhoneState(key, "head", nextChat.id);
        resetResponseTiming(nextChat.id);
      }
    });

    return nextChat.id;
  };

  const getPreviousChats = async (cursor: number, name?: string) => {
    const targetIndex = conversationsRef.current.findIndex(conv => conv.id === cursor);
    if (targetIndex === -1) return;
    
    const startIndex = Math.max(0, targetIndex - 10);
    const chats: ChatInstance[] = conversationsRef.current.slice(startIndex, targetIndex).reverse();
    
    if (name) {
      updatePhoneState(name, "chats", chats, "append");
      return;
    }

    phoneStates.forEach(async (_, key: string) => {
      updatePhoneState(key, "chats", chats, "append");
    });
  };

  useEffect(() => {
    const instantiateChat = async () => {
      if (!fetchedInitChat?.current && conversationsRef.current.length > 0) {
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
  }, [conversationsRef.current.length]);

  // Cycle through conversations every 20 seconds instead of polling server
  useInterval(async () => {
    if (fetchedInitChat.current && conversationsRef.current.length > 0) {
      console.log("cycling to next conversation");
      getLatestChat();
    }
  }, 20000);

  return {
    getLatestChat,
    getPreviousChats,
    loading,
  };
} 