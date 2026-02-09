import { ChatInstance } from "@/types/message";

let cached: ChatInstance[] | null = null;

export async function loadConversations(): Promise<ChatInstance[]> {
  if (cached) return cached;

  const res = await fetch("/data/conversations.json");
  if (!res.ok) throw new Error("Failed to load conversations");

  cached = (await res.json()) as ChatInstance[];
  return cached;
}
