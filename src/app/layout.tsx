import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
