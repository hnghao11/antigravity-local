"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  FolderOpen,
  Settings,
  Sparkles,
  Home,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderOpen,
  },
];

const bottomNavItems = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  isMobile?: boolean;
}

export function Sidebar({ isMobile }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "flex h-screen flex-col border-r border-border bg-sidebar/50 backdrop-blur-xl transition-all duration-200",
      isMobile ? "w-full" : "fixed left-0 top-0 z-40 w-16 lg:w-64"
    )}>
      
      {/* Logo */}
      <div className="relative flex h-14 items-center justify-start px-4 border-b border-sidebar-border">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-all duration-200 shrink-0">
            <Sparkles className="h-4 w-4 fill-current" />
          </div>
          <span className={cn("text-lg font-semibold text-foreground tracking-tight", isMobile ? "block" : "hidden lg:block")}>
            MemMart
          </span>
        </Link>
      </div>

      {/* New Document Button */}
      <div className="relative p-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                className={cn(
                  "w-full cursor-pointer bg-foreground text-background hover:bg-foreground/90 transition-all duration-150 font-medium shadow-sm h-9 rounded-lg",
                  isMobile ? "justify-start px-4" : "justify-center lg:justify-start"
                )}
              >
                <Link href="/editor/new">
                  <Plus className="h-4 w-4" />
                  <span className={cn("inline-block ml-2 font-medium", isMobile ? "block" : "hidden lg:inline-block")}>
                    New Document
                  </span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="lg:hidden">
              <p>New Document</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Main Navigation */}
      <nav className="relative flex-1 space-y-1 p-3">
        <TooltipProvider>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 cursor-pointer group",
                      isMobile ? "justify-start" : "justify-center lg:justify-start",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary shadow-none"
                        : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground transition-colors duration-150"
                    )}
                  >
                    <item.icon className={cn(
                      "h-4 w-4 shrink-0 transition-colors duration-200",
                      isActive ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                    <span className={cn(isMobile ? "block" : "hidden lg:inline-block")}>{item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden">
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      {/* Bottom Navigation */}
      <div className="relative border-t border-gray-200 dark:border-white/10 p-3">
        <TooltipProvider>
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer group",
                      isMobile ? "justify-start" : "justify-center lg:justify-start",
                      isActive
                        ? "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 shrink-0 transition-colors duration-200",
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    )} />
                    <span className={cn(isMobile ? "block" : "hidden lg:inline-block")}>{item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden">
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </aside>
  );
}
