import { useContext, useEffect, useRef } from "react";
import useAccessPhoneStore from "./usePhoneStore";
import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { delay } from "@/util/util";
import useDeviceSize from "./useDeviceSize";
import { DeviceSize } from "@/types/devices";
import { NavbarContext } from "@/providers/NavbarProvider";

export function useAutoScroll() {
  const { phoneState } = useAccessPhoneStore();
  const { infoVisible } = useContext(NavbarContext);
  const deviceSize = useDeviceSize();
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    console.log(deviceSize);
  }, [deviceSize]);

  useEffect(() => {
    async function scrollMessages() {
      if (infoVisible || hasScrolledRef.current) {
        return;
      }

      if (phoneState?.chats && phoneState.chats.length > 0 && phoneState?.scroller) {
        phoneState.scroller.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
        hasScrolledRef.current = true;
      }
    }
    scrollMessages();
  }, [infoVisible, phoneState?.scroller, phoneState?.chats]);
}
