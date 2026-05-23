"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bot, Wallet, BarChart3 } from "lucide-react";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/bots", label: "Bots", icon: Bot },
  { href: "/vault", label: "Vault", icon: Wallet },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto grid max-w-md grid-cols-4 py-3">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs ${
                active ? "text-white" : "text-zinc-500"
              }`}
            >
              <Icon size={21} />
              <span>{item.label}</span>
              <div className={`h-1 rounded-full ${active ? "w-7 bg-blue-500" : "w-0"}`} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}