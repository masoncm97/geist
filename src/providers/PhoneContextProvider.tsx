"use client";

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
  idInView?: number;
  scroller?: HTMLDivElement;
}

export interface PhoneContext {
  phoneStates: Map<string, PhoneState>;
  primaryIdInView: number;
  setPhoneState: (
    name: string,
    idInView?: number,
    scroller?: HTMLDivElement
  ) => void;
}

// export interface ChatInView {
//   idInView: number | undefined;
//   setIdInView: Dispatch<SetStateAction<number | undefined>>;
// }

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
  // const [idInView, setIdInView] = useState<number | undefined>(undefined);
  const phoneStates = useRef<Map<string, PhoneState>>(new Map());
  const [primaryIdInView, setPrimaryIdInView] = useState<number>(
    Number.MAX_SAFE_INTEGER
  );

  const setPhoneState = useCallback(
    (name: string, idInView?: number, scroller?: HTMLDivElement) => {
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
