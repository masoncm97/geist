import { useInView } from "framer-motion";
import { RefObject } from "react";

export function useInViewGroup(group: RefObject<HTMLDivElement>[]) {
  return group.map((ref) => useInView(ref));
}
