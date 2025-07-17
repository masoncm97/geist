import { useState, useEffect, useRef } from "react";
import { ChatInstance } from "@/types/message";

interface Message {
  id: number;
  prompt: string;
  response: string;
}

interface ConversationsExport {
  exportDate: string;
  totalEntries: number;
  conversations: Message[];
}

export function useLocalConversations() {
  const [conversations, setConversations] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const conversationsRef = useRef<Message[]>([]);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        // Import the conversations export
        const response = await fetch('/conversations-export-2025-07-17.json');
        const data: ConversationsExport = await response.json();
        
        conversationsRef.current = data.conversations;
        setConversations(data.conversations);
        setError(null);
      } catch (err) {
        setError("Failed to load conversations");
        console.error("Error loading conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  const getNextConversation = (): Message | null => {
    if (conversationsRef.current.length === 0) return null;
    
    const conversation = conversationsRef.current[currentIndex];
    setCurrentIndex((prev) => (prev + 1) % conversationsRef.current.length);
    return conversation;
  };

  const getConversationById = (id: number): Message | null => {
    return conversationsRef.current.find(conv => conv.id === id) || null;
  };

  const getConversationsBeforeId = (id: number, limit: number = 10): Message[] => {
    const targetIndex = conversationsRef.current.findIndex(conv => conv.id === id);
    if (targetIndex === -1) return [];
    
    const startIndex = Math.max(0, targetIndex - limit);
    return conversationsRef.current.slice(startIndex, targetIndex).reverse();
  };

  return {
    conversations,
    loading,
    error,
    getNextConversation,
    getConversationById,
    getConversationsBeforeId,
    totalConversations: conversationsRef.current.length,
  };
} 