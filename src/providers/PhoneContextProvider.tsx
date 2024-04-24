"use client";

import { ChatInstance, ChatProps } from "@/types/message";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface PhoneState {
  name: string;
  chats?: ChatInstance[];
  cursor?: number;
  paginating?: boolean;
  idInView?: number;
  scroller?: HTMLDivElement;
}

export interface PhoneContext {
  phoneStates: Map<string, PhoneState>;
  primaryIdInView: number;
  setPhoneState: (
    name: string,
    idInView?: number,
    scroller?: HTMLDivElement,
    chats?: ChatInstance[]
  ) => void;
}

interface PhoneStateProviderProps {
  children: React.ReactNode;
}

export const PhoneContext = createContext<PhoneContext>({
  phoneStates: new Map<string, PhoneState>(),
  primaryIdInView: Number.MAX_SAFE_INTEGER,
  setPhoneState: () => {},
});

export default function PhoneStateProvider({
  children,
}: PhoneStateProviderProps) {
  const phoneStates = useRef<Map<string, PhoneState>>(new Map());
  const [primaryIdInView, setPrimaryIdInView] = useState<number>(
    Number.MAX_SAFE_INTEGER
  );

  const setPhoneState = useCallback(
    (
      name: string,
      idInView?: number,
      scroller?: HTMLDivElement,
      chats?: ChatInstance[]
    ) => {
      const existingEntry = phoneStates.current.get(name);
      if (existingEntry) {
        if (idInView != undefined) {
          phoneStates.current.set(name, {
            ...existingEntry,
            idInView: idInView,
          });
          if (idInView < primaryIdInView) {
            setPrimaryIdInView(idInView);
          }
        }
        if (scroller != undefined) {
          phoneStates.current.set(name, {
            ...existingEntry,
            scroller: scroller,
          });
        }
        if (chats != undefined) {
          const prev =
            (phoneStates.current.get(name)?.chats as ChatProps[]) ?? [];
          phoneStates.current.set(name, {
            ...existingEntry,
            chats: [...chats, ...prev],
          });
          console.log(phoneStates.current);
        }
      } else {
        phoneStates.current.set(name, { name, idInView, scroller });
      }
    },
    []
  );

  useEffect(() => {
    console.log("changed");
  }, [phoneStates.current]);

  const phoneContext: PhoneContext = {
    primaryIdInView: primaryIdInView,
    phoneStates: phoneStates.current,
    setPhoneState: setPhoneState,
  };

  return (
    <PhoneContext.Provider value={phoneContext}>
      {children}
    </PhoneContext.Provider>
  );
}