// import useAccessPhoneStore from "@/hooks/usePhoneStore";
// import { ChatInstance } from "@/types/message";
// import axios from "axios";

// export const getPreviousChats = async (cursor: number, name?: string) => {
//   const { phoneStates, getPhoneStateValues, updatePhoneState } =
//     useAccessPhoneStore();

//   await axios
//     .post(`${process.env.NEXT_PUBLIC_GEIST_SERVER}/paginate-chat`, {
//       cursor: cursor,
//     })
//     .then((data) => {
//       let chats: ChatInstance[] = data.data.messages.reverse();
//       if (name) {
//         updatePhoneState(name, "chats", chats, "append");
//         return;
//       }

//       phoneStates.forEach(async (_, key: string) => {
//         updatePhoneState(key, "chats", chats, "append");
//       });
//     });
// };

// const getLatestChat = async (): Promise<number | undefined> => {
//   const { phoneStates, getPhoneStateValues, updatePhoneState } =
//     useAccessPhoneStore();
//   await axios
//     .get(`${process.env.NEXT_PUBLIC_GEIST_SERVER}/latest-chat`)
//     .then((data) => {
//       console.log(data);
//       latestChat.current = data.data;
//     });

//   /* If the server returns a new chat that hasn't been displayed yet,
//       add it to the current chats */
//   phoneStates.forEach(async (value: PhoneState, key: string) => {
//     if (
//       latestChat.current != undefined &&
//       !value.chats?.find((chat) => chat.id === latestChat.current?.id)
//     ) {
//       updatePhoneState(
//         key,
//         "chats",
//         [latestChat.current] as ChatInstance[],
//         "prepend"
//       );
//       updatePhoneState(key, "head", latestChat.current.id);
//       resetResponseTiming(latestChat.current.id);
//     }
//   });

//   return latestChat.current?.id;
// };
