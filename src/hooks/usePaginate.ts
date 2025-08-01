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
        updatePhoneState("chats", chats, "append");
      });
  };

  useEffect(() => {
    const paginate = async () => {
      if (phoneState.cursor && phoneState.shouldPaginate) {
        console.log("paginating");
        let cursor;
        if (phoneState.cursor === phoneState.head) {
          console.log("yes", phoneState.head);
          cursor = phoneState.cursor - 1;
        } else {
          cursor = phoneState.cursor - 10;
        }
        updatePhoneState("shouldPaginate", false);
        updatePhoneState("cursor", cursor);
        await getPreviousChats(cursor);
      }
    };
    paginate();
  }, [shouldPaginate]);
}
