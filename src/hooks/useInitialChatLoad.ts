import { useContext, useEffect, useRef } from "react";
import useAccessPhoneStore from "./usePhoneStore";
import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { ChatInstance } from "@/types/message";
import axios from "axios";

export function useInitialChatLoad() {
  const hasInitialized = useRef<boolean>(false);
  const { phoneState, updatePhoneState } = useAccessPhoneStore();
  const { resetResponseTiming } = useContext(ResponseTimingContext);

  const loadInitialChats = async (): Promise<void> => {
    try {
      // First, get the latest chat to establish head and cursor
      const latestResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_GEIST_SERVER}/latest-chat`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
          }
        }
      );

      const latestChat: ChatInstance = latestResponse.data;
      
      if (!latestChat?.id) return;

      // Set up the head and cursor
      updatePhoneState("head", latestChat.id);
      updatePhoneState("cursor", latestChat.id - 1);

      // Now get initial batch of chats including the latest
      const paginateResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_GEIST_SERVER}/paginate-chat`,
        {
          cursor: latestChat.id - 1,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
          }
        }
      );

      let initialChats: ChatInstance[] = paginateResponse.data.messages.reverse();
      
      // Prepend the latest chat to ensure it's included
      const allChats = [latestChat, ...initialChats];
      
      // Remove duplicates based on ID
      const uniqueChats = allChats.filter((chat, index, self) => 
        index === self.findIndex(c => c.id === chat.id)
      );

      // Update state with all chats at once
      updatePhoneState("chats", uniqueChats);
      
      // Don't trigger response timing for initial load
      // This prevents the artificial delays
      
    } catch (error) {
      console.error("Failed to load initial chats:", error);
    }
  };

  useEffect(() => {
    const initializeChats = async () => {
      if (!hasInitialized.current) {
        await loadInitialChats();
        hasInitialized.current = true;
      }
    };
    
    initializeChats();
  }, []);

  return {
    hasInitialized: hasInitialized.current
  };
}