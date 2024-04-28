"use client";

import Phone, { PhoneProps } from "@/components/Phone";
import { usePaginate } from "@/hooks/usePaginate";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useGetLatestChat } from "@/hooks/useGetLatestChat";
import { useContext, useState } from "react";
import classNames from "classnames";
import { ThemeContext, ThemeType } from "@/providers/ThemeProvider";

export default function Phones() {
  let phones: PhoneProps[] = [
    { name: "Sartre", color: "green", isPrompter: true },
    { name: "Hegel", color: "pink", isPrompter: false },
  ];

  let [selected, setSelected] = useState<string>("Hegel");
  let [collapsed, setCollapsed] = useState<boolean>(true);
  const theme = useContext(ThemeContext);
  const currentTheme = theme?.themeType;

  useAutoScroll();
  usePaginate();
  useGetLatestChat();

  function closeDropdown(selected: string) {
    console.log("yup");
    setSelected(selected);
    setCollapsed(true);
  }

  return (
    <div className="flex flex-col h-screen border border-green-500">
      <div className="bg-green-200 relative overflow-hidden md:flex md:items-center md:justify-center gap-24 p-10 md:p-24 h-full">
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
      <div className="bg-red-500 flex justify-around mb-5 xs:mb-10">
        <div
          className={classNames(
            currentTheme == ThemeType.Dark
              ? "border border-gray-500 bg-black"
              : "border bg-white",
            "w-60 self-center md:hidden border rounded-2xl p-2 text-gray-400"
          )}
        >
          {collapsed && (
            <p
              className="place-self-center text-center"
              onClick={() => setCollapsed(false)}
            >
              {"Conversing with.. " + selected}
            </p>
          )}
          {!collapsed &&
            phones
              .sort((_, b) => (b.name === selected ? 1 : -1))
              .map((phone) => (
                <p
                  key={phone.name}
                  className={classNames(
                    selected == phone.name ? "text-gray-500" : "text-gray-400",
                    "text-gray-400"
                  )}
                  onClick={() => closeDropdown(phone.name)}
                >
                  {phone.name}
                </p>
              ))}
        </div>
        <div
          className={classNames(
            currentTheme == ThemeType.Dark
              ? "border border-gray-500 bg-black"
              : "border bg-white",
            "md:hidden border rounded-2xl p-2 text-gray-400 mt-auto"
          )}
        >
          Info
        </div>
      </div>
    </div>
  );
}
