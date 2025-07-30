import { PhoneState } from "@/store/store";
import { ChatInstance } from "@/types/message";
import axios from "axios";
import { useEffect } from "react";
import useAccessPhoneStore from "./usePhoneStore";

export function usePaginate() {
  const { phoneStates, getPhoneStateValues, updatePhoneState } =
    useAccessPhoneStore();

  let shouldPaginate = getPhoneStateValues("shouldPaginate");

  const getPreviousChats = async (cursor: number, name?: string) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_GEIST_SERVER}/paginate-chat`, {
        cursor: cursor,
      }, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        }
      })
      .then((data) => {
        let chats: ChatInstance[] = data.data.messages.reverse();
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
