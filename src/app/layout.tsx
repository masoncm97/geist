import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import ResponseTimingProvider from "@/providers/ResponseTimingProvider";
import NavbarProvider from "@/providers/NavbarProvider";

export const metadata: Metadata = {
  title: "Geist",
  description:
    "A GPT instance trained on Hegel's 'The Phenomenology of Spirit'",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <ResponseTimingProvider>
          <ThemeProvider>
            <NavbarProvider>{children}</NavbarProvider>
          </ThemeProvider>
        </ResponseTimingProvider>
      </body>
    </html>
  );
}
