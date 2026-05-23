"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Dashboard", href: "/" },
  { label: "Bots", href: "/bots" },
  { label: "Vault", href: "/vault" },
  { label: "Analytics", href: "/analytics" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-[#13203f] bg-black/95 backdrop-blur-xl">
      <div className="grid grid-cols-4 py-4">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-center text-sm font-bold ${
                active ? "text-blue-400" : "text-zinc-500"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}