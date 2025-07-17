import ConversationsView from "@/components/ConversationsView";
import { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function ConversationsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ConversationsView />
    </main>
  );
} 