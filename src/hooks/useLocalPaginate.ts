import { PhoneState } from "@/store/store";
import { ChatInstance } from "@/types/message";
import { useEffect } from "react";
import useAccessPhoneStore from "./usePhoneStore";
import { useLocalPhoneConversations } from "./useLocalPhoneConversations";

export function useLocalPaginate() {
  const { phoneStates, getPhoneStateValues, updatePhoneState } =
    useAccessPhoneStore();
  const { getPreviousChats } = useLocalPhoneConversations();

  let shouldPaginate = getPhoneStateValues("shouldPaginate");

  useEffect(() => {
    const paginate = async () => {
      phoneStates.forEach(async (value: PhoneState, key: string) => {
        if (value.cursor && value.shouldPaginate) {
          console.log("paginating");
          let cursor;
          if (value.cursor === value.head) {
            console.log("yes", value.head);
            cursor = value.cursor - 1;
          } else {
            cursor = value.cursor - 10;
          }
          updatePhoneState(key, "shouldPaginate", false);
          updatePhoneState(key, "cursor", cursor);
          await getPreviousChats(cursor, key);
        }
      });
    };
    paginate();
  }, [shouldPaginate]);
} 