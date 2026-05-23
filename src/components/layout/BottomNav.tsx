"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Bots",
    href: "/bots",
  },
  {
    label: "Vault",
    href: "/vault",
  },
  {
    label: "Analytics",
    href: "/analytics",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="nav-blur fixed bottom-0 left-0 z-50 w-full">
      <div className="mx-auto grid max-w-2xl grid-cols-4 py-4">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center"
            >
              <span
                className={`text-sm font-semibold transition-all ${
                  active
                    ? "text-white"
                    : "text-zinc-500"
                }`}
              >
                {item.label}
              </span>

              <div
                className={`mt-2 h-[3px] rounded-full transition-all ${
                  active
                    ? "w-8 bg-blue-400"
                    : "w-0 bg-transparent"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}