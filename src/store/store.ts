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
};

type PhoneStates = {
  phoneStates: Map<string, PhoneState>;
};

type PhoneActions = {
  updatePhoneState: (
    name: string,
    key: keyof PhoneState,
    value: any,
    mergeStrategy?: MergeStrategy
  ) => void;
  getPhoneStateValues: <K extends keyof PhoneState>(key: K) => PhoneState[K][];
};

export type PhoneStore = PhoneStates & PhoneActions;

export const usePhoneStore = create<PhoneStore>()((set, get) => ({
  phoneStates: new Map<string, PhoneState>(),
  updatePhoneState: (name, key, value, mergeStrategy = "replace") =>
    set((state) => ({
      phoneStates: updatePhoneState(
        name,
        key,
        value,
        state.phoneStates,
        mergeStrategy
      ),
    })),
  getPhoneStateValues: (key) => {
    return Array.from(get().phoneStates.values())
      .map((state) => state[key])
      .filter(
        (value): value is NonNullable<typeof value> => value !== undefined
      );
  },
}));

function updatePhoneState<K extends keyof PhoneState, V extends PhoneState[K]>(
  name: string,
  key: K,
  value: V | V[],
  phoneStates: Map<string, PhoneState>,
  mergeStrategy: MergeStrategy = "replace"
): Map<string, PhoneState> {
  const existingEntry = phoneStates.get(name);

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
