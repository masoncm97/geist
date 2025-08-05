import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarContent({ className = "" }: { className?: string }) {
  // Remove setInfoVisible from context

  const buttonClass =
    "text-gray-400 top-16 right-24 px-4 py-2 md:mb-2 w-max";

  const pathname = usePathname();

  return (
    <div className={`pt-4 flex flex-col items-end md:gap-2 max-md:absolute max-md:top-0 max-md:right-0 ${className}`}>
      <Link
        href={pathname === "/full-conversation" ? "/live-feed" : "/full-conversation"}
        className={buttonClass}
      >
        {pathname === "/full-conversation" ? "Live Feed" : "Full Conversation"}
      </Link>
      <Link href="/" className={buttonClass}>
        Information
      </Link>
    </div>
  );
} 