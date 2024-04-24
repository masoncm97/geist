import { PhoneStore, usePhoneStore } from "@/store/store";

export default function useAccessPhoneStore(): PhoneStore {
  let updatePhoneState = usePhoneStore().updatePhoneState;
  let getPhoneStateValues = usePhoneStore().getPhoneStateValues;
  let phoneStates = usePhoneStore().phoneStates;

  return {
    updatePhoneState,
    getPhoneStateValues,
    phoneStates,
  };
}
