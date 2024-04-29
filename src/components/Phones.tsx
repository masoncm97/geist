"use client";

import Phone, { PhoneProps } from "@/components/Phone";
import { usePaginate } from "@/hooks/usePaginate";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useGetLatestChat } from "@/hooks/useGetLatestChat";
import { useContext, useState } from "react";
import classNames from "classnames";
import { ThemeContext, ThemeType } from "@/providers/ThemeProvider";
import { NavbarContext } from "@/providers/NavbarProvider";

export default function Phones() {
  let phones: PhoneProps[] = [
    { name: "Sartre", color: "green", isPrompter: true },
    { name: "Hegel", color: "pink", isPrompter: false },
  ];
  const theme = useContext(ThemeContext);
  const { selected } = useContext(NavbarContext);

  useAutoScroll();
  usePaginate();
  useGetLatestChat();

  return (
    <div className="flex flex-col h-screen border">
      <div className="relative overflow-hidden md:flex md:items-center md:justify-center gap-24 p-10 md:p-24 h-full">
        {phones.map((prop) => (
          <Phone
            key={prop.name}
            name={prop.name}
            color={prop.color}
            isPrompter={prop.isPrompter}
            className={selected == prop.name ? "max-md:flex" : "max-md:hidden"}
          />
        ))}
      </div>
    </div>
  );
}
