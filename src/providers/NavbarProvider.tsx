"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { ResponseTimingContext } from "./ResponseTimingProvider";
import Information from "@/components/Information";

export interface Navbar {
  selected: string;
  toggleSelected: () => void;
  isOpen: boolean;
  infoVisible: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setInfoVisible: Dispatch<SetStateAction<boolean>>;
}

interface NavbarProviderProps {
  children: React.ReactNode;
}

export const NavbarContext = createContext<Navbar>({
  selected: "Sartre",
  toggleSelected: () => {},
  isOpen: false,
  infoVisible: false,
  setIsOpen: () => {},
  setInfoVisible: () => {},
});

export default function NavbarProvider({ children }: NavbarProviderProps) {
  let [selected, setSelected] = useState<string>("Sartre");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [infoVisible, setInfoVisible] = useState<boolean>(false);
  const { clearResponseTiming } = useContext(ResponseTimingContext);

  let toggleSelected = () => {
    if (selected == "Hegel") {
      setSelected("Sartre");
    } else {
      setSelected("Hegel");
    }
    clearResponseTiming();
  };

  let navbar: Navbar = {
    selected: selected,
    toggleSelected: toggleSelected,
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    infoVisible,
    setInfoVisible: setInfoVisible,
  };

  return (
    <NavbarContext.Provider value={navbar}>{children}</NavbarContext.Provider>
  );
}
