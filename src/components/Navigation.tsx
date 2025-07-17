"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const isConversationsPage = pathname === "/conversations";
  const isInformationPage = pathname === "/information";

  // Don't render navigation on the information page
  if (isInformationPage) {
    return null;
  }

  return (
    <nav className="fixed top-16 right-24 z-50 hidden md:block">
      <div className="flex flex-col">
        <Link
          href={isConversationsPage ? "/" : "/conversations"}
          className={`px-4 py-2 rounded-lg transition-colors text-right ${
            isConversationsPage
              ? "bg-white text-gray-400 hover:text-gray-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {isConversationsPage ? "Live Feed" : "Full Conversation"}
        </Link>
        <Link
          href="/information"
          className="px-4 py-2 rounded-lg transition-colors text-right text-gray-400 hover:text-gray-600"
        >
          Information
        </Link>
      </div>
    </nav>
  );
} 