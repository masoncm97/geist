"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { ResponseTimingContext } from "./ResponseTimingProvider";

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
  selected: "Sartre",
  toggleNavbar: () => {},
  isOpen: false,
  setIsOpen: () => {},
});

export default function NavbarProvider({ children }: NavbarProviderProps) {
  let [selected, setSelected] = useState<string>("Sartre");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { clearResponseTiming } = useContext(ResponseTimingContext);

  let toggleNavbar = () => {
    if (selected == "Hegel") {
      setSelected("Sartre");
    } else {
      setSelected("Hegel");
    }
    clearResponseTiming();
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
