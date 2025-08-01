import { useContext, useEffect } from "react";
import useAccessPhoneStore from "./usePhoneStore";
import { ResponseTimingContext } from "@/providers/ResponseTimingProvider";
import { delay } from "@/util/util";
import useDeviceSize from "./useDeviceSize";
import { DeviceSize } from "@/types/devices";
import { NavbarContext } from "@/providers/NavbarProvider";

export function useAutoScroll() {
  const { responseLoading, promptLoading } = useContext(ResponseTimingContext);
  const { selected } = useContext(NavbarContext);
  const { phoneState } = useAccessPhoneStore();
  const { infoVisible } = useContext(NavbarContext);
  const deviceSize = useDeviceSize();

  useEffect(() => {
    console.log(deviceSize);
  }, [deviceSize]);

  useEffect(() => {
    async function scrollMessages() {
      if (infoVisible) {
        return;
      }

      phoneState?.scroller?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
    scrollMessages();
  }, [infoVisible, phoneState?.scroller]);
}
