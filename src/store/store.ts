import { ChatInstance } from "@/types/message";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

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
  updateCursor: (name: string, cursor?: number) => void;
  updatePaginating: (name: string, paginating: boolean) => void;
  updateChats: (
    name: string,
    chats: ChatInstance[],
    mergeStrategy: MergeStrategy
  ) => void;
  getIdsInView: () => number[];
  getCursors: () => number[];
};

export type PhoneStore = PhoneStates & PhoneActions;

export const usePhoneStore = create<PhoneStore>()((set, get) => ({
  phoneStates: new Map<string, PhoneState>(),
  getIdsInView: () => {
    return Array.from(get().phoneStates.values())
      .map((state) => state.idInView)
      .filter((id): id is number => id !== undefined);
  },
  getCursors: () => {
    return Array.from(get().phoneStates.values())
      .map((state) => state.cursor)
      .filter((cursor): cursor is number => cursor !== undefined);
  },
  updateIdInView: (name, idInView) =>
    set((state) => ({
      phoneStates: updatePhoneState(
        name,
        "idInView",
        idInView,
        state.phoneStates
      ),
    })),
  updateCursor: (name, cursor) =>
    set((state) => ({
      phoneStates: updatePhoneState(name, "cursor", cursor, state.phoneStates),
    })),
  updatePaginating: (name, paginating) =>
    set((state) => ({
      phoneStates: updatePhoneState(
        name,
        "paginating",
        paginating,
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
  updateChats: (name, chats, mergeStrategy) =>
    set((state) => ({
      phoneStates: updatePhoneState(
        name,
        "chats",
        chats,
        state.phoneStates,
        mergeStrategy
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
  // console.log("updating phone state");
  const existingEntry = phoneStates.get(name);

  // Default value is 'false' for pagination state
  if (key === "paginating" && !value) {
    phoneStates.set(name, { [key]: false });
    return phoneStates;
  }

  // If entry doesn't exist add it to the map
  if (!existingEntry) {
    phoneStates.set(name, { [key]: value });
    return phoneStates;
  }

  let newValue = value;

  // If merge strategy is 'append' then append value to the end of the array
  if (mergeStrategy === "append" && Array.isArray(existingEntry[key])) {
    newValue = [...(existingEntry[key] as V[]), ...(value as V[])];
  }

  // If merge strategy is 'prepend' then prepend value to the front of the array
  if (mergeStrategy === "prepend" && Array.isArray(existingEntry[key])) {
    newValue = [...(value as V[]), ...(existingEntry[key] as V[])];
  }

  // Add value to existing entry in map
  phoneStates.set(name, {
    ...existingEntry,
    [key]: newValue,
  });

  return phoneStates;
}
