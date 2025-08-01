"use client";

import * as React from "react";
import NavbarContent from "./NavbarContent";
import { usePathname } from "next/navigation";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();

  return (
    <>
        <div className={`${className || ""}`}>
          <NavbarContent />
        </div>
    </>
  );
}
