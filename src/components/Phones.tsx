"use client";

import Phone, { PhoneProps } from "@/components/Phone";
import { usePaginate } from "@/hooks/usePaginate";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useGetLatestChat } from "@/hooks/useGetLatestChat";
import { useContext, useState } from "react";
import classNames from "classnames";
import { ThemeContext, ThemeType } from "@/providers/ThemeProvider";
import { NavbarContext } from "@/providers/NavbarProvider";
import Information from "./Information";

export default function Phones() {
  let phones: PhoneProps[] = [
    { name: "Sartre", color: "green", isPrompter: true },
    { name: "Hegel", color: "pink", isPrompter: false },
  ];
  const theme = useContext(ThemeContext);
  const { selected } = useContext(NavbarContext);
  const { infoVisible, setInfoVisible } = useContext(NavbarContext);

  useAutoScroll();
  usePaginate();
  useGetLatestChat();

  return (
    <div className="min-h-screen relative">
      {infoVisible && <Information />}
      <div className="fixed md:flex md:items-center md:justify-center gap-24 p-10 md:px-24 md:pt-24 h-screen w-screen">
        <button
          onClick={() => setInfoVisible((prev) => !prev)}
          className="hidden md:block text-gray-400 md:fixed top-16 right-24"
        >
          Information
        </button>
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
