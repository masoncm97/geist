import { useEffect, useRef } from "react";

export function useInitialRender(num: number) {
  return Array.from({ length: num }, () => useRef<boolean>(false));
}
