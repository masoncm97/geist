import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/lib/config";

interface Message {
  id: number;
  prompt: string;
  response: string;
}

interface ConversationsResponse {
  messages: Message[];
}

export function useConversations() {
  const [conversations, setConversations] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = async () => {
    try {
      const response = await axios.get<ConversationsResponse>(API_ENDPOINTS.chat);
      setConversations(response.data.messages);
      setError(null);
    } catch (err) {
      setError("Failed to fetch conversations");
      console.error("Error fetching conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    
    // Set up polling for real-time updates every 5 seconds
    const interval = setInterval(fetchConversations, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    conversations,
    loading,
    error,
    refetch: fetchConversations,
  };
} 