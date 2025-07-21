"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import React from "react";

interface Message {
  id: number;
  prompt: string;
  response: string;
}

export default function FullConversationPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_GEIST_SERVER}/chat`);
        if (!res.ok) throw new Error("Failed to fetch conversation");
        const data = await res.json();
        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          setMessages([]);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchConversation();
  }, []);

  if (loading) return <div className="text-gray-500 flex text-center justify-center items-center min-h-screen text-lg">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="my-16 mx-auto px-4 max-w-full sm:max-w-2xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl w-full">
      <div className="whitespace-pre-line font-mono text-gray-500">
        {messages.length === 0 && <div>No messages found.</div>}
        <div className="flex gap-2">
          <p className="font-bold">Question:</p>
          <p className="italic mb-10">What is consciousness?</p>
        </div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <div className="mb-10">
              <strong>Hegel:</strong>{" "}
              <ReactMarkdown
                components={{
                  strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                  em: ({ node, ...props }) => <em className="italic" {...props} />,
                  ul: ({ node, ...props }) => <ul className="flex flex-col px-6" {...props} />,
                  ol: ({ node, ...props }) => <ol className="flex flex-col px-6" {...props} />,
                  li: ({ node, ...props }) => <li className="flex flex-col mb-1" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                  br: () => <br />,
                }}
              >
                {msg.prompt}
              </ReactMarkdown>
            </div>
            <div className="mb-10">
              <strong>Sartre:</strong>{" "}
              <ReactMarkdown
                components={{
                  strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                  em: ({ node, ...props }) => <em className="italic" {...props} />,
                  ul: ({ node, ...props }) => <ul className="flex flex-col px-6" {...props} />,
                  ol: ({ node, ...props }) => <ol className="flex flex-col px-6" {...props} />,
                  li: ({ node, ...props }) => <li className="flex flex-col mb-1" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                  br: () => <br />,
                }}
              >
                {msg.response}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 