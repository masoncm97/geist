"use client";

import { ThemeContext, ThemeType } from "@/providers/ThemeProvider";
import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import React from "react";
import Exit from "@/components/Exit";
import { useRouter } from "next/navigation";
import classNames from "classnames";

interface Message {
  id: number;
  prompt: string;
  response: string;
}

export default function FullConversationPage() {
  const theme = useContext(ThemeContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const bgColor = theme.themeType == ThemeType.Dark ? "bg-gray-400" : "bg-gray-600";
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <main className="max-w-full w-full pt-2 px-2 md:px-16 lg:px-64 lg:pt-24">
      {/* Only render Exit on mobile */}
      {isMobile && (
        <Exit className={classNames(bgColor, 'my-2')} trigger={() => router.back()} />
      )}
      <div className="my-12 mx-6 whitespace-pre-line text-gray-500">
        {messages.length === 0 && <div>No messages found.</div>}
        <div className="flex gap-2">
          <p className="font-bold text-lg">Question:</p>
          <p className="italic mb-10 text-lg">What is consciousness?</p>
        </div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <div className="font-mono mb-10">
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
            <div className="font-mono mb-10">
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