import { useContext, useEffect } from "react";
import useAccessPhoneStore from "./usePhoneStore";
import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { delay } from "@/util/util";

export function useAutoScroll() {
  const { responseLoading, promptLoading } = useContext(ResponseTimingContext);
  const { phoneStates } = useAccessPhoneStore();

  useEffect(() => {
    async function scrollMessages() {
      console.log("should scroll");
      for (let [_, value] of phoneStates.entries()) {
        value?.scroller?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
        await delay(2000);
      }
    }
    scrollMessages();
  }, [responseLoading, promptLoading]);
}
