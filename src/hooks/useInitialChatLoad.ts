import { useEffect } from "react";
import useAccessPhoneStore from "./usePhoneStore";
import { loadConversations } from "@/data/conversations";
import { ChatInstance } from "@/types/message";

// Module-level state shared with other hooks
let allConversations: ChatInstance[] = [];
let nextDripIndex = 0;
// Index of the oldest message currently loaded in the store (in allConversations)
let oldestLoadedIndex = 0;

export function getAllConversations() {
  return allConversations;
}

export function getNextDripIndex() {
  return nextDripIndex;
}

export function setNextDripIndex(index: number) {
  nextDripIndex = index;
}

export function getOldestLoadedIndex() {
  return oldestLoadedIndex;
}

export function setOldestLoadedIndex(index: number) {
  oldestLoadedIndex = index;
}

// How many messages to hold back for the drip feed
const DRIP_RESERVE = 50;
// How many messages to show initially (most recent visible ones)
const INITIAL_VISIBLE = 20;

export function useInitialChatLoad() {
  const { phoneState, updatePhoneState } = useAccessPhoneStore();

  const loadInitialChats = async (): Promise<void> => {
    try {
      const conversations = await loadConversations();
      allConversations = conversations;

      // The drip feed starts at this index
      const dripStart = Math.max(0, conversations.length - DRIP_RESERVE);
      nextDripIndex = dripStart;

      // Show the last INITIAL_VISIBLE messages before the drip boundary
      const visibleStart = Math.max(0, dripStart - INITIAL_VISIBLE);
      const visibleSlice = conversations.slice(visibleStart, dripStart);
      oldestLoadedIndex = visibleStart;

      // chats in store are newest-first
      updatePhoneState("chats", [...visibleSlice].reverse());
      updatePhoneState("head", visibleSlice[visibleSlice.length - 1].id);
      updatePhoneState("cursor", visibleStart);
      updatePhoneState("hasInitialized", true);
    } catch (error) {
      console.error("Failed to load initial chats:", error);
    }
  };

  useEffect(() => {
    const initializeChats = async () => {
      if (
        !phoneState.hasInitialized &&
        (!phoneState.chats || phoneState.chats.length === 0)
      ) {
        await loadInitialChats();
      }
    };

    initializeChats();
  }, []);

  return {
    hasInitialized: phoneState.hasInitialized || false,
  };
}
