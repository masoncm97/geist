"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import classNames from "classnames";

export interface ResponseTiming {
  chatId: number | undefined;
  resetResponseTiming: (id?: number) => void;
  clearResponseTiming: () => void;
  promptLoading: boolean;
  responseLoading: boolean;
}

interface ResponseTimingProviderProps {
  children: React.ReactNode;
}

export const ResponseTimingContext = createContext<ResponseTiming>({
  chatId: undefined,
  resetResponseTiming: (id?: number) => {},
  clearResponseTiming: () => {},
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

  const clearResponseTiming = useCallback(() => {
    setPromptLoading(false);
    setResponseLoading(false);
  }, []);

  const responseTiming: ResponseTiming = {
    chatId: chatId,
    promptLoading: promptLoading,
    resetResponseTiming: resetResponseTiming,
    clearResponseTiming: clearResponseTiming,
    responseLoading: responseLoading,
  };

  let promptDelay = 5000;
  let responseDelay = 10000;

  useEffect(() => {
    let loadChat = async () => {
      await delay(promptDelay);
      setPromptLoading(false);
      await delay(responseDelay);
      setResponseLoading(false);
    };

    loadChat();
  }, [chatId]);

  return (
    <ResponseTimingContext.Provider value={responseTiming}>
      {children}
    </ResponseTimingContext.Provider>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
