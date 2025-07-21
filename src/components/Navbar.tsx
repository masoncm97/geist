"use client";

import * as React from "react";
import NavbarContent from "./NavbarContent";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/information" && (
        <div className="hidden md:block fixed top-16 right-24 z-50">
          <NavbarContent />
        </div>
      )}
    </>
  );
}
