import * as React from "react";
import Hamburger from "./Hamburger";
import { NavbarContext } from "@/providers/NavbarProvider";

export default function Navbar() {
  const { isOpen, setIsOpen, toggleSelected, setInfoVisible } =
    React.useContext(NavbarContext);
  return (
    <>
      <div className="block md:hidden justify-self-end self-center">
        <Hamburger
          isOpen={isOpen}
          triggerMobileNav={() => {
            setIsOpen((prevState) => !prevState);
          }}
        />
      </div>
      <div className="block md:hidden justify-self-end col-span-2 mr-2 text-right">
        {isOpen && (
          <div>
            <p onClick={() => toggleSelected()} className="text-gray-400">
              Toggle View
            </p>
            <p
              onClick={() => setInfoVisible((prev) => !prev)}
              className="text-gray-400"
            >
              Information
            </p>
          </div>
        )}
      </div>
    </>
  );
}
