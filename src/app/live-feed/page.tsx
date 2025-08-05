import Phone from "@/components/Phone";
import { Viewport } from "next";
import Navbar from "@/components/Navbar";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function LiveFeed() {
  return (
    <main>
      <Navbar className="hidden md:block fixed top-16 right-24 z-50" />
      <Phone />
    </main>
  );
}