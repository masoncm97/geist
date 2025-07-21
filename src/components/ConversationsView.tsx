"use client";

import { useConversations } from "@/hooks/useConversations";
import ReactMarkdown from "react-markdown";

export default function ConversationsView() {
  const { conversations, loading, error } = useConversations();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-500">Loading conversations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="pt-32">
          <p className="text-gray-400 italic pb-8">What is conciousness?</p>
          {conversations.map((conversation, index) => (
            <div key={conversation.id}>
              <div className="pb-8">
                <div className="font-semibold text-gray-500 mb-2">Sartre:</div>
                <div className="pl-4 text-gray-400 mb-4">
                  <ReactMarkdown
                    components={{
                      strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                      em: ({node, ...props}) => <em className="italic" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-6 my-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-2" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      p: ({node, ...props}) => <p className="mb-2" {...props} />,
                      br: () => <br />,
                    }}
                  >
                    {conversation.prompt}
                  </ReactMarkdown>
                </div>
              </div>
              
              <div className="pb-8">
                <div className="font-semibold text-gray-500 mb-2">Hegel:</div>
                <div className="pl-4 text-gray-400 mb-4">
                  <ReactMarkdown
                    components={{
                      strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                      em: ({node, ...props}) => <em className="italic" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-6 my-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-2" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      p: ({node, ...props}) => <p className="mb-2" {...props} />,
                      br: () => <br />,
                    }}
                  >
                    {conversation.response}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {conversations.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            No conversations found.
          </div>
        )}
      </div>
    </div>
  );
} 