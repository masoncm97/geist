import { DeviceSize } from "@/types/devices";
import useWindowDimensions from "./useWindowDimensions";

const useDeviceSize = (): DeviceSize | undefined => {
  const { width } = useWindowDimensions();

  if (!width) {
    return undefined;
  }
  const sortedSizes = Object.keys(DeviceSize)
    .filter(
      (key: string) =>
        !isNaN(Number(DeviceSize[key as keyof typeof DeviceSize]))
    )
    .sort(
      (a, b) =>
        DeviceSize[a as keyof typeof DeviceSize] -
        DeviceSize[b as keyof typeof DeviceSize]
    );

  if (width <= castDeviceSize(sortedSizes[0]))
    return castDeviceSize(sortedSizes[0]);

  for (let i = 1; i < sortedSizes.length; i++) {
    let deviceSize = castDeviceSize(sortedSizes[i]);
    if (width <= deviceSize) {
      return castDeviceSize(sortedSizes[i - 1]);
    }
  }

  return DeviceSize["2xl"];
};

function castDeviceSize(str: string) {
  return DeviceSize[str as keyof typeof DeviceSize];
}

export default useDeviceSize;
