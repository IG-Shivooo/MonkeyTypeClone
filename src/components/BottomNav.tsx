"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Keyboard, History, Settings, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Test", icon: Keyboard },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/about", label: "About", icon: Info },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-secondary border-t border-border z-50 flex justify-around items-center">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
              isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
