"use client";

import Phone, { PhoneProps } from "@/components/Phone";
import { useLocalPaginate } from "@/hooks/useLocalPaginate";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useLocalPhoneConversations } from "@/hooks/useLocalPhoneConversations";
import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { ThemeContext, ThemeType } from "@/providers/ThemeProvider";
import { NavbarContext } from "@/providers/NavbarProvider";
import useAccessPhoneStore from "@/hooks/usePhoneStore";
import { Interlocutor } from "@/store/store";

export default function Phones() {
  // let phones: PhoneProps[] = [
  //   { name: "Sartre", color: "green", isPrompter: true },
  //   { name: "Hegel", color: "pink", isPrompter: false },
  // ];

  const theme = useContext(ThemeContext);
  const { selected } = useContext(NavbarContext);
  const { updatePhoneState } = useAccessPhoneStore();
  const prompter: Interlocutor = { name: "Sartre", color: "green" };
  const responder: Interlocutor = { name: "Hegel", color: "pink" };

  // useEffect(() => {
  //   updatePhoneState("Geist", "prompter", prompter);
  //   updatePhoneState("Geist", "responder", responder);
  // }, []);

  useAutoScroll();
  useLocalPaginate();
  useLocalPhoneConversations();

  return (
    <div className="min-h-screen relative no-scrollbar">
      <div className="fixed md:flex md:items-start md:justify-center gap-24 p-10 md:px-24 md:pt-28 h-screen w-screen">
        {/* {phones.map((prop) => ( */}
        <Phone key={"Geist"} name={"Geist"} color={"green"} isPrompter={true} />
        {/* ))} */}
      </div>
    </div>
  );
}
