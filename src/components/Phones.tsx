"use client";

import Phone, { PhoneProps } from "@/components/Phone";
import { usePaginate } from "@/hooks/usePaginate";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useGetLatestChat } from "@/hooks/useGetLatestChat";
import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { ThemeContext, ThemeType } from "@/providers/ThemeProvider";
import { NavbarContext } from "@/providers/NavbarProvider";
import Information from "./Information";
import useAccessPhoneStore from "@/hooks/usePhoneStore";
import { Interlocutor } from "@/store/store";

export default function Phones() {
  // let phones: PhoneProps[] = [
  //   { name: "Sartre", color: "green", isPrompter: true },
  //   { name: "Hegel", color: "pink", isPrompter: false },
  // ];

  const theme = useContext(ThemeContext);
  const { selected } = useContext(NavbarContext);
  const { infoVisible, setInfoVisible } = useContext(NavbarContext);
  const { updatePhoneState } = useAccessPhoneStore();
  const prompter: Interlocutor = { name: "Sartre", color: "green" };
  const responder: Interlocutor = { name: "Hegel", color: "pink" };

  // useEffect(() => {
  //   updatePhoneState("Geist", "prompter", prompter);
  //   updatePhoneState("Geist", "responder", responder);
  // }, []);

  useAutoScroll();
  usePaginate();
  useGetLatestChat();

  return (
    <div className="min-h-screen relative no-scrollbar">
      {infoVisible && <Information />}
      <div className="fixed md:flex md:items-start md:justify-center gap-24 p-10 md:px-24 md:pt-28 h-screen w-screen">
        <button
          onClick={() => setInfoVisible((prev) => !prev)}
          className="hidden md:block text-gray-400 md:fixed top-16 right-24"
        >
          Information
        </button>
        {/* {phones.map((prop) => ( */}
        <Phone key={"Geist"} name={"Geist"} color={"green"} isPrompter={true} />
        {/* ))} */}
      </div>
    </div>
  );
}
