import * as React from "react";
import Hamburger from "./Hamburger";
import { NavbarContext } from "@/providers/NavbarProvider";
import { useContext } from "react";

export default function Navbar() {
  const { isOpen, setIsOpen, toggleSelected, setInfoVisible } =
    useContext(NavbarContext);
  return (
    <>
      {/* <div className="block md:hidden justify-self-end self-center">
        <Hamburger
          isOpen={isOpen}
          triggerMobileNav={() => {
            setIsOpen((prevState) => !prevState);
          }}
        />
      </div>
      <div className="block md:hidden justify-self-end col-span-2 mr-2 text-right">
        {isOpen && (
          <div className="flex flex-col">
            <button onClick={() => toggleSelected()} className="text-gray-400">
              Toggle View
            </button>
            <button
              onClick={() => setInfoVisible((prev) => !prev)}
              className="text-gray-400"
            >
              Information
            </button>
          </div>
        )}
      </div> */}
      <button
        onClick={() => setInfoVisible((prev) => !prev)}
        className="text-gray-400 block md:hidden justify-self-end self-center mr-5"
      >
        Information
      </button>
    </>
  );
}
