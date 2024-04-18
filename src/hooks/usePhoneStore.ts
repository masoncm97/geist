import { PhoneStore, usePhoneStore } from "@/store/store";

export default function useAccessPhoneStore(): PhoneStore {
  let updateChats = usePhoneStore().updateChats;
  let updateScroller = usePhoneStore().updateScroller;
  let updateIdInView = usePhoneStore().updateIdInView;
  let phoneStates = usePhoneStore().phoneStates;

  return {
    updateChats,
    updateScroller,
    updateIdInView,
    phoneStates,
  };
}
