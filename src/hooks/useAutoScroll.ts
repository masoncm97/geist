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
  const { phoneStates } = useAccessPhoneStore();
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

      if (deviceSize && deviceSize < DeviceSize.md) {
        let selectedPhone = Array.from(phoneStates.entries()).find(
          ([key, _]) => key == selected
        );
        if (selectedPhone) {
          console.log("hey");
          let [_, phoneState] = selectedPhone;
          phoneState?.scroller?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      } else {
        for (let [_, value] of phoneStates.entries()) {
          value?.scroller?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
          await delay(2000);
        }
      }
    }
    scrollMessages();
  }, [responseLoading, promptLoading]);
}
