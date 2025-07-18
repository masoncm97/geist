import Phones from "@/components/Phones";
import { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Phones />
    </main>
  );
}
