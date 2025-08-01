import { ChatInstance } from "@/types/message";
import { RefObject } from "react";
import { create } from "zustand";

type MergeStrategy = "replace" | "append" | "prepend";
type Color = "green" | "yellow" | "pink";

export type Interlocutor = {
  name: string;
  color: Color;
};

export type PhoneState = {
  chats?: ChatInstance[];
  head?: number;
  cursor?: number;
  shouldPaginate?: boolean;
  prompter?: Interlocutor;
  responder?: Interlocutor;
  idInView?: number;
  scroller?: HTMLDivElement;
  hasInitialized?: boolean;
};

type PhoneStoreState = {
  phoneState: PhoneState;
};

type PhoneActions = {
  updatePhoneState: (
    key: keyof PhoneState,
    value: any,
    mergeStrategy?: MergeStrategy
  ) => void;
  getPhoneStateValue: <K extends keyof PhoneState>(key: K) => PhoneState[K] | undefined;
};

export type PhoneStore = PhoneStoreState & PhoneActions;

export const usePhoneStore = create<PhoneStore>()((set, get) => ({
  phoneState: {},
  updatePhoneState: (key, value, mergeStrategy = "replace") => {
    console.log("PhoneStore: updatePhoneState", { key, value, mergeStrategy });
    set((state) => {
      const newState = updateSinglePhoneState(key, value, state.phoneState, mergeStrategy);
      console.log("PhoneStore: new state", newState);
      return { phoneState: newState };
    });
  },
  getPhoneStateValue: (key) => {
    const value = get().phoneState[key];
    console.log("PhoneStore: getPhoneStateValue", { key, value });
    return value;
  },
}));

function updateSinglePhoneState<K extends keyof PhoneState, V extends PhoneState[K]>(
  key: K,
  value: V | V[],
  phoneState: PhoneState,
  mergeStrategy: MergeStrategy = "replace"
): PhoneState {
  let newValue = value;

  // If merge strategy is 'append' then append value to the end of the array
  if (mergeStrategy === "append" && Array.isArray(phoneState[key])) {
    newValue = [...(phoneState[key] as V[]), ...(value as V[])];
  }

  // If merge strategy is 'prepend' then prepend value to the front of the array
  if (mergeStrategy === "prepend" && Array.isArray(phoneState[key])) {
    newValue = [...(value as V[]), ...(phoneState[key] as V[])];
  }

  return {
    ...phoneState,
    [key]: newValue,
  };
}
