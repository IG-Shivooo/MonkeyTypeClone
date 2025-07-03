"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Keyboard, History, Settings, Info, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Test", icon: Keyboard },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/about", label: "About", icon: Info },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="hidden sm:flex justify-center items-center py-4">
      <nav className="flex items-center gap-2 bg-secondary p-2 rounded-full">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
