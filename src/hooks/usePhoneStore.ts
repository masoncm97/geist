import { PhoneStore, usePhoneStore } from "@/store/store";

export default function useAccessPhoneStore(): PhoneStore {
  let updateChats = usePhoneStore().updateChats;
  let updateScroller = usePhoneStore().updateScroller;
  let updateIdInView = usePhoneStore().updateIdInView;
  let updateCursor = usePhoneStore().updateCursor;
  let updatePaginating = usePhoneStore().updatePaginating;
  let getIdsInView = usePhoneStore().getIdsInView;
  let getCursors = usePhoneStore().getCursors;
  let phoneStates = usePhoneStore().phoneStates;

  return {
    updateChats,
    updateScroller,
    updateIdInView,
    updateCursor,
    updatePaginating,
    getIdsInView,
    getCursors,
    phoneStates,
  };
}
