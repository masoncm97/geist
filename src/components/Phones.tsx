"use client";

import Phone, { PhoneProps } from "@/components/Phone";
import { usePaginate } from "@/hooks/usePaginate";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useGetLatestChat } from "@/hooks/useGetLatestChat";

export default function Phones() {
  let phones: PhoneProps[] = [
    { name: "Sartre", color: "green", isPrompter: false },
    { name: "Hegel", color: "pink", isPrompter: true },
  ];

  useAutoScroll();
  usePaginate();
  useGetLatestChat();

  return (
    <>
      {phones.map((prop) => (
        <Phone
          key={prop.name}
          name={prop.name}
          color={prop.color}
          isPrompter={prop.isPrompter}
        />
      ))}
    </>
  );
}
