import { ChatInstance } from "@/types/message";
import { create } from "zustand";

type MergeStrategy = "replace" | "append" | "prepend";

type PhoneState = {
  chats?: ChatInstance[];
  cursor?: number;
  paginating?: boolean;
  idInView?: number;
  scroller?: HTMLDivElement;
};

type PhoneStates = {
  phoneStates: Map<string, PhoneState>;
};

type PhoneActions = {
  updateIdInView: (name: string, idInView?: number) => void;
  updateScroller: (name: string, scroller?: HTMLDivElement) => void;
  updateChats: (name: string, chats: ChatInstance[]) => void;
};

export type PhoneStore = PhoneStates & PhoneActions;

export const usePhoneStore = create<PhoneStore>()((set) => ({
  phoneStates: new Map<string, PhoneState>(),
  updateIdInView: (name, idInView) =>
    set((state) => ({
      phoneStates: updatePhoneState(
        name,
        "idInView",
        idInView,
        state.phoneStates
      ),
    })),
  updateScroller: (name, scroller) =>
    set((state) => ({
      phoneStates: updatePhoneState(
        name,
        "scroller",
        scroller,
        state.phoneStates
      ),
    })),
  updateChats: (name, chats) =>
    set((state) => ({
      phoneStates: updatePhoneState(
        name,
        "chats",
        chats,
        state.phoneStates,
        "prepend"
      ),
    })),
}));

function updatePhoneState<K extends keyof PhoneState, V extends PhoneState[K]>(
  name: string,
  key: K,
  value: V | V[],
  phoneStates: Map<string, PhoneState>,
  mergeStrategy: MergeStrategy = "replace"
): Map<string, PhoneState> {
  const existingEntry = phoneStates.get(name);

  if (!existingEntry) {
    phoneStates.set(name, { [key]: value });
    return phoneStates;
  }

  let newValue = value;
  if (mergeStrategy === "append" && Array.isArray(existingEntry[key])) {
    newValue = [...(existingEntry[key] as V[]), ...(value as V[])];
  }

  if (mergeStrategy === "prepend" && Array.isArray(existingEntry[key])) {
    newValue = [...(value as V[]), ...(existingEntry[key] as V[])];
  }

  phoneStates.set(name, {
    ...existingEntry,
    [key]: newValue,
  });

  return phoneStates;
}
