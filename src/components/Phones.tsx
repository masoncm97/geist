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
      <div className="fixed md:flex md:items-center md:justify-center gap-24 p-10 md:p-24 h-full w-full">
        <button
          onClick={() => setInfoVisible((prev) => !prev)}
          className="text-gray-400 md:fixed top-10 right-16"
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
