"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import classNames from "classnames";

export enum ThemeType {
  Light,
  Dark,
}

export interface ResponseTiming {
  chatId: number | undefined;
  resetResponseTiming: (id?: number) => void;
  promptLoading: boolean;
  responseLoading: boolean;
}

interface ResponseTimingProviderProps {
  children: React.ReactNode;
}

export const ResponseTimingContext = createContext<ResponseTiming>({
  chatId: undefined,
  resetResponseTiming: (id?: number) => {},
  promptLoading: false,
  responseLoading: false,
});

export default function ResponseTimingProvider({
  children,
}: ResponseTimingProviderProps) {
  const [chatId, setChatId] = useState<number | undefined>(undefined);
  const [promptLoading, setPromptLoading] = useState(true);
  const [responseLoading, setResponseLoading] = useState(true);

  const resetResponseTiming = useCallback((id?: number) => {
    setPromptLoading(true);
    setResponseLoading(true);
    if (id) setChatId(id);
  }, []);

  const responseTiming: ResponseTiming = {
    chatId: chatId,
    promptLoading: promptLoading,
    resetResponseTiming: resetResponseTiming,
    responseLoading: responseLoading,
  };

  let promptDelay = 5000;
  let responseDelay = 5000;

  useEffect(() => {
    let loadChat = async () => {
      await delay(promptDelay);
      setPromptLoading(false);
      await delay(responseDelay);
      setResponseLoading(false);
    };

    loadChat();
  }, [chatId]);

  useEffect(() => {
    console.log("response loading was changed");
  }, [responseLoading]);

  useEffect(() => {
    console.log("prompt loading was changed");
  }, [promptLoading]);

  return (
    <ResponseTimingContext.Provider value={responseTiming}>
      {children}
    </ResponseTimingContext.Provider>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
