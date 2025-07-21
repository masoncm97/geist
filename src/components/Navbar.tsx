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
      {pathname !== "/information" && (
        <div className={`fixed top-16 right-24 z-50 ${className || ""}`}>
          <NavbarContent />
        </div>
      )}
    </>
  );
}
