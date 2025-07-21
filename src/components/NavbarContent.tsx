import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarContent({ className = "" }: { className?: string }) {
  // Remove setInfoVisible from context

  const buttonClass =
    "hidden md:block text-gray-500 top-16 right-24 px-4 py-2 mb-2 w-max";

  const pathname = usePathname();

  return (
    <div className={`flex flex-col items-end gap-2 ${className}`}>
      <Link
        href={pathname === "/full-conversation" ? "/" : "/full-conversation"}
        className={buttonClass}
      >
        {pathname === "/full-conversation" ? "Live Feed" : "Full Conversation"}
      </Link>
      <Link href="/information" className={buttonClass}>
        Information
      </Link>
    </div>
  );
} 