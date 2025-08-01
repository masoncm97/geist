import { PhoneState } from "@/store/store";
import { ChatInstance } from "@/types/message";
import axios from "axios";
import { useEffect } from "react";
import useAccessPhoneStore from "./usePhoneStore";

export function usePaginate() {
  const { phoneState, getPhoneStateValue, updatePhoneState } =
    useAccessPhoneStore();

  let shouldPaginate = getPhoneStateValue("shouldPaginate");

  const getPreviousChats = async (cursor: number) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_GEIST_SERVER}/paginate-chat`, 
        {
          cursor: cursor,
        }, 
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
          }
        }
      );

      let chats: ChatInstance[] = response.data.messages.reverse();
      updatePhoneState("chats", chats, "append");
    } catch (error) {
      console.error("Failed to paginate chats:", error);
    }
  };

  useEffect(() => {
    const paginate = async () => {
      // Only paginate if:
      // 1. We should paginate (scroll triggered)
      // 2. We have a cursor set
      // 3. We already have chats loaded (not initial load)
      if (
        phoneState.cursor && 
        phoneState.shouldPaginate && 
        phoneState.chats && 
        phoneState.chats.length > 0
      ) {
        console.log("paginating from scroll");
        
        // Calculate next cursor for pagination
        const cursor = phoneState.cursor - 10;
        
        updatePhoneState("shouldPaginate", false);
        updatePhoneState("cursor", cursor);
        await getPreviousChats(cursor);
      }
    };
    paginate();
  }, [shouldPaginate]);
}
