import { PhoneStore, usePhoneStore } from "@/store/store";

export default function useAccessPhoneStore() {
  let updatePhoneState = usePhoneStore().updatePhoneState;
  let getPhoneStateValue = usePhoneStore().getPhoneStateValue;
  let phoneState = usePhoneStore().phoneState;

  return {
    updatePhoneState,
    getPhoneStateValue,
    phoneState,
  };
}
