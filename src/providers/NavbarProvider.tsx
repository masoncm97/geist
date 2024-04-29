"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface Navbar {
  selected: string;
  toggleNavbar: () => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface NavbarProviderProps {
  children: React.ReactNode;
}

export const NavbarContext = createContext<Navbar>({
  selected: "Hegel",
  toggleNavbar: () => {},
  isOpen: false,
  setIsOpen: () => {},
});

export default function NavbarProvider({ children }: NavbarProviderProps) {
  let [selected, setSelected] = useState<string>("Hegel");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  let toggleNavbar = () => {
    if (selected == "Hegel") {
      setSelected("Sartre");
    } else {
      setSelected("Hegel");
    }
  };

  let navbar: Navbar = {
    selected: selected,
    toggleNavbar: toggleNavbar,
    isOpen: isOpen,
    setIsOpen: setIsOpen,
  };

  return (
    <NavbarContext.Provider value={navbar}>{children}</NavbarContext.Provider>
  );
}
