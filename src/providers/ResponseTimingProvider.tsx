"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import classNames from "classnames";

export interface ResponseTiming {
  chatId: number | undefined;
  resetResponseTiming: (id?: number) => void;
  clearResponseTiming: () => void;
  promptLoading: boolean;
  responseLoading: boolean;
  isInitialLoad: boolean;
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
  isInitialLoad: true,
});

export default function ResponseTimingProvider({
  children,
}: ResponseTimingProviderProps) {
  const [chatId, setChatId] = useState<number | undefined>(undefined);
  const [promptLoading, setPromptLoading] = useState(false);
  const [responseLoading, setResponseLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const resetResponseTiming = useCallback((id?: number) => {
    // Mark that we're no longer in initial load phase
    setIsInitialLoad(false);
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
    isInitialLoad: isInitialLoad,
  };

  let promptDelay = 5000;
  let responseDelay = 10000;

  useEffect(() => {
    // Only apply delays for new chats, not initial load
    if (chatId && !isInitialLoad) {
      let loadChat = async () => {
        await delay(promptDelay);
        setPromptLoading(false);
        await delay(responseDelay);
        setResponseLoading(false);
      };

      loadChat();
    }
  }, [chatId, isInitialLoad]);

  return (
    <ResponseTimingContext.Provider value={responseTiming}>
      {children}
    </ResponseTimingContext.Provider>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
