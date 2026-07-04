"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

// ── Page title ────────────────────────────────────────────────────────────────

const PAGE_TITLES: { pattern: RegExp | string; title: string }[] = [
  { pattern: /^\/dashboard$/, title: "Dashboard" },
];

function usePageTitle(pathname: string) {
  for (const { pattern, title } of PAGE_TITLES) {
    if (pattern instanceof RegExp ? pattern.test(pathname) : pathname.startsWith(pattern)) {
      return title;
    }
  }
  return "Nira";
}

// ── Nav items ─────────────────────────────────────────────────────────────────

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, exact: true },
];

// ── Shell ─────────────────────────────────────────────────────────────────────

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const title = usePageTitle(pathname);
  const name = session?.user?.name ?? session?.user?.email ?? "User";

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="h-dvh flex w-full bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "shrink-0 flex flex-col border-r border-border bg-card h-full transition-all duration-200",
          collapsed ? "w-14" : "w-64"
        )}
      >
        {/* Header */}
        <div className="h-14 flex items-center border-b border-border px-3 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <div
            className={cn(
              "flex flex-col leading-tight min-w-0 ml-2.5 flex-1 overflow-hidden transition-[max-width,opacity] duration-200 ease-linear",
              collapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100"
            )}
          >
            <span className="text-[13px] font-semibold text-foreground whitespace-nowrap">
              Nira
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide whitespace-nowrap">
              Property management
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto space-y-0.5">
          {NAV.map(({ label, href, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2 overflow-hidden rounded-lg text-[13px] transition-colors duration-200",
                isActive(href, exact)
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span
                className={cn(
                  "whitespace-nowrap overflow-hidden transition-[max-width,opacity] duration-200 ease-linear",
                  collapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
                )}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-2 py-3 border-t border-border">
          <div className="flex items-center gap-2 px-1 py-1">
            <div
              className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-semibold text-primary uppercase shrink-0"
              title={name}
            >
              {name[0]}
            </div>
            <div
              className={cn(
                "flex items-center gap-2 min-w-0 overflow-hidden transition-[max-width,opacity] duration-200 ease-linear",
                collapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100 flex-1"
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-foreground truncate whitespace-nowrap">
                  {name}
                </div>
              </div>
              <button
                onClick={() => void signOut({ callbackUrl: "/" })}
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Glass top navbar */}
        <header className="sticky top-0 z-50 h-14 flex shrink-0 items-center gap-3 border-b border-border/40 px-4 bg-background/60 backdrop-blur-xl">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </header>
        <div className="flex-1 min-h-0 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
